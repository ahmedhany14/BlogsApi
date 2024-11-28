import { Request, Response, NextFunction } from 'express';

import { appError, AuthError } from '../../../Common/error/appError';

import { IRequestProfile } from '../../../Common/interface/IRequest';
import { IUserDocument } from '../../User/entitie/IUser';

import tokenService from './token-service';
import userService from '../../User/user-service';

class AuthService {

	private readonly cookieExpiresIn: number = 1; // 1 hour
	private readonly cookieOptions = {
		expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
		httpOnly: true
	}

	public createToken(payload: string, response: Response): string {
		const token = tokenService.createToken(payload);
		console.log(this.cookieOptions);
		response.cookie('jwt', token, this.cookieOptions);
		return token;
	}

	public async decodeToken(token: string): Promise<string> {
		return tokenService.decodeToken(token);
	}

	public async protect(request: IRequestProfile, response: Response, next: NextFunction) {
		if (!request.headers.cookie)
			return next(new AuthError('You are not logged in', 401));

		const token = request.headers.cookie.split('=')[1];

		const decodedId = await tokenService.decodeToken(token);

		const user = await userService.getUserById(decodedId, next) as IUserDocument;

		request.profile = {
			id: user._id as string,
			role: user.role
		};

		if (!request.profile || !request.profile.id) return next(new AuthError('You are not logged in', 401));
		next();
	}

	public restrictTo(...roles: string[]) {

		return async (request: IRequestProfile, response: Response, next: NextFunction) => {
			if (!roles.includes(request.profile.role)) return next(new AuthError('You do not have permission to perform this action', 403));
			next();
		};

	}
}

const authService = new AuthService();
export default authService;