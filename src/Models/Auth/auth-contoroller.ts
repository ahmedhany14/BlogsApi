import {Response, NextFunction } from 'express';

import { Controller } from '../../Common/Decorators/Controller';
import { validator } from '../../Common/Decorators/validator';
import { Get, Post } from '../../Common/Decorators/routes';
import { use } from '../../Common/Decorators/use';

import { appError, ValidationError, BadRequestError, AuthError } from '../../Common/error/appError';

import { IRequestProfile } from '../../Common/interface/IRequest';
import { IUser, IUserDocument } from '../User/entitie/IUser';

import tokenService from './service/token-service';
import authService from './service/auth-service';
import userService from '../User/user-service';

@Controller('/auth')
class AuthController {

	@Post('/login')
	@validator('email', 'password')
	public async login(request: IRequestProfile, response: Response, next: NextFunction): Promise<void> {
		const { email, password } = request.body;

		if (!email || !password) {
			return next(new BadRequestError('Email and password are required'));
		}

		const user = await userService.getUserByEmail(email, next) as IUserDocument;
		if(user.password !== password) {
			return next(new AuthError('Invalid email or password'));
		}

		const token = authService.createToken(user._id as string, response);
		response.status(200).json({
			status: 'success',
			token
		});
	}

	@Post('/register')
	@validator('email', 'password', 'confirmPassword', 'name')
	public async register(request: IRequestProfile, response: Response, next: NextFunction): Promise<void> {
		console.log(request.body);
		const { email, password, confirmPassword, name } = request.body;
		if (!email || !password || !confirmPassword) {
			return next(new BadRequestError('Email and password are required'));
		}

		if (password !== confirmPassword) {
			return next(new ValidationError('Password and confirm password do not match'));
		}

		const user: IUser = {
			email,
			name: name,
			password,
			role: 'user'
		}

		const newUser = await userService.createUser(user, next) as IUserDocument;
		if(!newUser) {
			return next(new appError('cannot create user', 500));
		}
		request.profile = {
			id: newUser._id as string,
			role: newUser.role
		};

		response.status(201).json({
			status: 'success',
			data: {
				profile: request.profile
			}
		});
	}
}