import { Request, Response, NextFunction } from 'express';

import { Get, Post, Delete } from '../../Common/Decorators/routes';
import { Controller } from '../../Common/Decorators/Controller';
import { validator } from '../../Common/Decorators/validator';
import { use } from '../../Common/Decorators/use';

import { appError, NotFoundError, BadRequestError, ValidationError } from '../../Common/error/appError';

import authService from '../Auth/service/auth-service';
import blogService from './blog-service';

import { IRequestProfile } from '../../Common/interface/IRequest';
import { IBlog, IBlogDocument } from './entitie/IBlog';

@Controller('/blogs')
class BlogController {

	@Get('/:id')
	public async getBlogs(request: Request, response: Response, next: NextFunction) {
		const blogId = request.params.id;

		if (!blogId) {
			return next(new BadRequestError('Blog id is required'));
		}

		const blog = await blogService.getBlogById(blogId, next);

		if (!blog) {
			return next(new NotFoundError('Blog not found'));
		}

		response.status(200).json({
			message: 'Blog found',
			blog
		});
	}

	@Post('/')
	@validator('title', 'content')
	@use(authService.protect)
	public async createBlog(request: IRequestProfile, response: Response, next: NextFunction) {
		const { title, content } = request.body;

		const userId = request.profile.id;
		const blog = {
			title: title as string,
			content: content as string,
			createAt: new Date(),
			like: 0,
			dislike: 0,
			usrId: userId,
			commentIds: [] as string[]
		};

		const newBlog = await blogService.createBlog(blog as IBlogDocument);

		response.status(201).json({
			message: 'Blog created',
			blog: newBlog
		});
	}

	@Delete('/:id')
	@use(authService.protect)
	public async DeleteUserBlog(request: IRequestProfile, response: Response, next: NextFunction) {
		const blogId = request.params.id;
		const userId = request.profile.id;
		if (!blogId) {
			return next(new BadRequestError('Blog id is required'));
		}

		const blog = await blogService.deleteBlog(blogId, userId, next);

		if (!blog) {
			return next(new NotFoundError('Cannot delete blog'));
		}

		response.status(200).json({
			message: 'Blog deleted',
			blog
		});
	}

	@Post('/edit/:id')
	@validator('content')
	public async editBlog(req: Request, res: Response, next: NextFunction) {

		const blogId = req.params.id;
		const content = req.body.content;

		if (!blogId) {
			return next(new BadRequestError('Blog id is required'));
		}

		const blog = await blogService.editContent(blogId, content);

		if (!blog) {
			return next(new NotFoundError('Blog not found'));
		}

		res.status(200).json({
			message: 'Blog updated',
			blog
		});

	}

	@Post('/:id/react')
	@validator('react')
	@use(authService.protect)
	public async reactBlog(request: IRequestProfile, response: Response, next: NextFunction) {
		const blogId = request.params.id;
		const react = request.body.react;
		if (['like', 'dislike', 'love'].indexOf(react) === -1) return next(new ValidationError('Invalid react'));

		if (!blogId) return next(new BadRequestError('Blog id is required'));

		const blog = await blogService.reactToBlog(blogId, react);

		if (!blog) {
			return next(new NotFoundError('Blog not found'));
		}

		response.status(200).json({
			message: 'Blog reacted',
			blog
		});
	}
}