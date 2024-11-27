import { Request, Response, NextFunction, response } from 'express';

import { Controller } from '../../Common/Decorators/Controller';
import { validator } from '../../Common/Decorators/validator';
import { Get, Post } from '../../Common/Decorators/routes';

import { appError,ValidationError,BadRequestError,AuthError } from '../../Common/error/appError';

@Controller('auht')
class AuthController {

	@Get('/login')
	@validator('email', 'password')
	login(req: Request, res: Response, next: NextFunction): void {
		const { email, password } = req.body;

		if(!email || !password) {
			return next(new BadRequestError('Email and password are required'));
		}

		/*
		check for user in the database and his password here
		 */

		response.send('Login page');
	}

	@Post('/register')
	@validator('email', 'password', 'confirmPassword')
	register(req: Request, res: Response, next: NextFunction): void {
		const { email, password,confirmPassword } = req.body;

		if(!email || !password || !confirmPassword) {
			return next(new BadRequestError('Email and password are required'));
		}

		if(password !== confirmPassword) {
			return next(new ValidationError('Password and confirm password do not match'));
		}

		/*
		register user here
		 */

		res.send('Register page');
	}
}