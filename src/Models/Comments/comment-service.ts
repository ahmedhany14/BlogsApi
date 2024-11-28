import { ICommentDocument, IComment } from "./entitie/IComment";

import { NextFunction } from 'express';

import Comment from "./entitie/comment-entitie";

class CommentService {

    public async addComment(blog: IComment): Promise<ICommentDocument> {
        const comment = await Comment.create(blog);
        return comment;
    }

    public async deleteComment(commentId: string): Promise<void> {
        await Comment.findByIdAndDelete(commentId);
    }
}

const commentService = new CommentService();
export default commentService;
