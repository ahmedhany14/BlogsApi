import { Request, Response, NextFunction } from 'express';

export default function BodyCheck(...keys: string[]) {
	return function(req: Request, res: Response, next: NextFunction) {
		for (let key of keys) {
			if (!req.body[key] || req.body[key] === '' || req.body[key] === null || req.body[key] === undefined) {
				return next(new Error(`${key} is required`));
			}
		}
		next();
	};
}