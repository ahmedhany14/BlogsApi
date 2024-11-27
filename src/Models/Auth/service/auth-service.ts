import { Request, Response, NextFunction } from 'express';

import { appError, AuthError} from '../../../Common/error/appError';

interface authRequest extends Request {
	profile: {
		role: string
	}
}

class AuthService{

	public restrictTo(...roles: string[]) {

		return async (request: authRequest, response: Response, next: NextFunction) => {
			if (!roles.includes(request.profile.role)) return next(new AuthError('You do not have permission to perform this action', 403));
			next();
		}

	}
}

const authService = new AuthService();
export default authService;