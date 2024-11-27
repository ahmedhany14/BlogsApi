import { Request, Response, NextFunction } from 'express';

import { appError, AuthError} from '../../../Common/error/appError';
import { IRequestProfile} from '../../../Common/interface/IRequest';

class AuthService{

	public async protect(request: IRequestProfile, response: Response, next: NextFunction) {
		if(!request.profile || !request.profile.id) return next(new AuthError('You are not logged in', 401));
		next();
	}

	public restrictTo(...roles: string[]) {

		return async (request: IRequestProfile, response: Response, next: NextFunction) => {
			if (!roles.includes(request.profile.role)) return next(new AuthError('You do not have permission to perform this action', 403));
			next();
		}

	}
}

const authService = new AuthService();
export default authService;