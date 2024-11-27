import { Request, Response, NextFunction } from 'express';
import { appError } from './appError';

export function errorHandler
(err: appError, req: Request, res: Response, next: NextFunction): void {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || 'Internal server error';
	res.status(err.statusCode).json({
		status: 'error',
		error: err.message
	});
}