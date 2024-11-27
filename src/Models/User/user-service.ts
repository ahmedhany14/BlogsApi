import { Request, Response, NextFunction } from 'express';

import { appError, AuthError } from '../../Common/error/appError';
import { IRequestProfile } from '../../Common/interface/IRequest';
import { IUser, IUserDocument } from './entitie/IUser';

import User from './entitie/user-entitie';

class UserService {

	public async createUser(user: IUser, next: NextFunction): Promise<IUserDocument | void> {
		try {
			const newUser = new User(user);
			await newUser.save();
			return newUser;
		} catch (error) {
			next(new appError('cannot create user', 500));
		}
	}

	public async getUserById(id: string, next: NextFunction): Promise<IUserDocument | void> {
		try {
			const user = await User.findOne({ _id: id });
			if (!user) next(new appError('User not found', 404));
			return user as IUserDocument;
		} catch (error) {
			return next(new appError('cannot get user', 500));
		}
	}

	public async getUserByEmail(email: string, next: NextFunction): Promise<IUserDocument | void> {
		try {
			const user = await User.findOne({ email: email });
			if (!user) next(new appError('User not found', 404));
			return user as IUserDocument;
		} catch (error) {
			return next(new appError('cannot get user', 500));
		}
	}

}

const userService = new UserService();
export default userService;