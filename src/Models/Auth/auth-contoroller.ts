import { Request, Response, NextFunction, response } from 'express';

import { Controller } from '../../Common/Decorators/Controller';
import { validator } from '../../Common/Decorators/validator';
import { Get, Post } from '../../Common/Decorators/routes';

import { appError, ValidationError, BadRequestError, AuthError } from '../../Common/error/appError';

import { IRequestProfile } from '../../Common/interface/IRequest';

@Controller('auth')
class AuthController {

	@Get('/login')
	@validator('email', 'password')
	login(request: IRequestProfile, response: Response, next: NextFunction): void {
		const { email, password } = request.body;

		if (!email || !password) {
			return next(new BadRequestError('Email and password are required'));
		}

		/*
		user here;
		 */
		request.profile = {
			id: '12345', // temporary profile id
			role: 'admin' // temporary profile role
		};
		response.status(200).json({
			status: 'success',
			data: {
				profile: request.profile
			}
		});
	}

	@Post('/register')
	@validator('email', 'password', 'confirmPassword')
	register(request: IRequestProfile, response: Response, next: NextFunction): void {
		const { email, password, confirmPassword } = request.body;

		if (!email || !password || !confirmPassword) {
			return next(new BadRequestError('Email and password are required'));
		}

		if (password !== confirmPassword) {
			return next(new ValidationError('Password and confirm password do not match'));
		}

		/*
		user here;
		 */

		request.profile = {
			id: '12345', // temporary profile id
			role: 'admin' // temporary profile role
		};

		response.status(201).json({
			status: 'success',
			data: {
				profile: request.profile
			}
		});
	}
}