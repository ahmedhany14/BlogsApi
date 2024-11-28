import mongoose from "mongoose";

import { ICommentDocument } from "./IComment";
import e from "express";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model<ICommentDocument>('Comment', CommentSchema);

export default Comment;