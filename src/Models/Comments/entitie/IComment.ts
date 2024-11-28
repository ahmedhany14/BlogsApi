import mongoose from "mongoose";

export interface IComment {
    text: string,
    createdAt: Date,
    user: string,
}

export interface ICommentDocument extends IComment, mongoose.Document { }