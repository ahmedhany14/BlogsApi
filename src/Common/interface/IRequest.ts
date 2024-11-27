import {Request} from 'express';

export interface IRequestProfile extends Request {
		profile: {
			id: string,
			role: string
		}
}