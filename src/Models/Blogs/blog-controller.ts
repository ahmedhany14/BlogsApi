import { Request, Response, NextFunction } from 'express';

import { Get, Post, Delete } from '../../Common/Decorators/routes';
import { Controller } from '../../Common/Decorators/Controller';
import { use } from '../../Common/Decorators/use';

@Controller('/blogs')
class BlogController {
	@Get('/:id')
	public async getBlogs(req: Request, res: Response, next: NextFunction) {
		res.send('Get all blogs');
	}

	@Post('/')
	public async createBlog(req: Request, res: Response, next: NextFunction) {
		res.send('Create a blog');
	}

	@Delete('/:id')
	public async deleteBlog(req: Request, res: Response, next: NextFunction) {
		res.send('Delete a blog');
	}

	@Post('/edit/:id')
	public async editBlog(req: Request, res: Response, next: NextFunction) {
		res.send('Edit a blog');
	}
}