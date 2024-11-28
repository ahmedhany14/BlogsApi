import mongoose from "mongoose";

export interface IComment {
    text: string,
    createdAt: Date,
    user: mongoose.Schema.Types.ObjectId,
}

export interface ICommentDocument extends IComment, mongoose.Document { }