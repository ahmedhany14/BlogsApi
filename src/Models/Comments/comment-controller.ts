import { Request, Response, NextFunction } from "express";

import authService from "../Auth/service/auth-service";
import blogService from "../Blogs/blog-service";
import userService from "../User/user-service";
import commentService from "./comment-service";

import { IRequestProfile } from "../../Common/interface/IRequest";
import { IComment, ICommentDocument } from "./entitie/IComment";

import { Get, Post, Delete } from "../../Common/Decorators/routes";
import { Controller } from "../../Common/Decorators/Controller";
import { validator } from "../../Common/Decorators/validator";
import { use } from "../../Common/Decorators/use";
import { appError } from "../../Common/error/appError";


@Controller('/comments')
class CommentController {

    @Post('/add/:blogId')
    @validator('text')
    @use(authService.protect)
    public async addComment(req: IRequestProfile, res: Response, next: NextFunction) {
        const { blogId } = req.params;
        const { text } = req.body;
        const userId = req.profile.id;

        const data: IComment = {
            text,
            createdAt: new Date(),
            user: userId
        }
        const comment = await commentService.addComment(data);

        const blog = await blogService.addCommentToBlog(blogId, comment._id as string);


        res.status(201).json({
            status: 'success',
            data: {
                comment,
                blog
            }
        });
    }

    @Delete('/delete/:blogId/:commentId')
    @use(authService.protect)
    public async deleteComment(req: IRequestProfile, res: Response, next: NextFunction) {
        const { blogId, commentId } = req.params;
        const userId = req.profile.id;

        const blog = await blogService.deleteCommentFromBlog(blogId, commentId, userId);

        if (!blog) {
            return next(new appError(`Can't delete Comment`, 404));
        }
        await commentService.deleteComment(commentId);
        

        res.status(204).json({
            status: 'success',
            data: {
                blog
            }
        });
    }

}