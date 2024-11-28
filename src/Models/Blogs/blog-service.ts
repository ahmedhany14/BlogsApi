import { NextFunction } from 'express';

import { IBlogDocument } from './entitie/IBlog';
import blogModel from './entitie/blog-entitie';

import { NotFoundError } from '../../Common/error/appError';

export class BlogService {
	constructor() {
	}

	public async getBlogs(): Promise<IBlogDocument[]> {
		const blogs = await blogModel.find().populate('usrId').populate('commentIds');
		return blogs;
	}

	public async getBlogById(id: string, next: NextFunction): Promise<IBlogDocument | void> {
		try {
			const blog = await blogModel.findById(id).populate('usrId').populate('commentIds').populate({
				path: 'commentIds',
				populate: {
					path: 'user',
					model: 'User'
				}
			}).select('-usrId.password');
			return blog as IBlogDocument;
		} catch (error) {
			return next(new NotFoundError('Blog not found'));
		}
	}

	public async createBlog(blog: IBlogDocument): Promise<IBlogDocument> {
		return await blogModel.create(blog);
	}

	public async editContent(id: string, content: string): Promise<IBlogDocument | null> {
		const blog = await blogModel.findByIdAndUpdate(id, { content: content }, { new: true });
		return blog;
	}

	public async deleteBlog(id: string, userId: string, next: NextFunction): Promise<IBlogDocument | void> {
		try {
			const blog = await blogModel.findOneAndDelete({ _id: id, usrId: userId });
			return blog as IBlogDocument;
		} catch (error) {
			return next(new NotFoundError('Cannot delete blog'));
		}
	}

	public async addCommentToBlog(id: string, commentId: string): Promise<IBlogDocument | null> {
		try {
			const blog = await blogModel.findByIdAndUpdate(id, { $push: { commentIds: commentId } }, { new: true });
			return blog;
		}
		catch (error) {
			return null;
		}
	}

	public async deleteCommentFromBlog(id: string, commentId: string, userId: string): Promise<IBlogDocument | null> {
		try {
			const blog = await blogModel.findById(id);
			if (!blog) return null;
			const isUser = blog.usrId.toString() === userId.toString();
			if (!isUser) return null;
			const length = blog.commentIds.length;
			blog.commentIds = blog.commentIds.filter((comment) => comment.toString() !== commentId);
			if (length === blog.commentIds.length) return null;
			await blog.save();
			return blog;
		}
		catch (error) {
			return null;
		}
	}

	public async reactToBlog(id: string, react: string): Promise<IBlogDocument | void> {
		try {
			const blog = await blogModel.findByIdAndUpdate(id, { $inc: { [react]: 1 } }, { new: true });
			console.log(blog);
			return blog as IBlogDocument;
		} catch (error) {
			console.log(error);
		}

	}
}

const blogService = new BlogService();
export default blogService;