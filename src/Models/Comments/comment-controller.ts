import { Request, Response, NextFunction } from "express";

import authService from "../Auth/service/auth-service";
import blogService from "../Blogs/blog-service";
import userService from "../User/user-service";

import { ICommentDocument } from "./entitie/IComment";
import { IRequestProfile } from "../../Common/interface/IRequest";

import { Get, Post, Delete } from "../../Common/Decorators/routes";
import { Controller } from "../../Common/Decorators/Controller";
import { validator } from "../../Common/Decorators/validator";
import { use } from "../../Common/Decorators/use";


@Controller('/comments')
class CommentController {

    @Post('add/:blogId')
    @validator('text')
    @use(authService.protect)
    public async addComment(req: IRequestProfile, res: Response, next: NextFunction) {
        const { blogId } = req.params;
        const { text } = req.body;
        const userId = req.profile.id;

        /*
        const blog = await blogService.addCommentToBlog(blogId, userId, text);
        const comment = await commentService.addComment(userId, blogId, text);
        */


        res.status(201).json({
            status: 'success',
            data: {}
        });
    }
}