import dataBaseConfig from './Common/config/DataBaseConfig';
import router, { app } from './app';

import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import { errorHandler } from './Common/error/errorHandler';
import { appError } from './Common/error/appError';

import './Models/Blogs/blog-controller';

dotenv.config({
	path: './.Config.env'
});

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
	res.send('Welcome to the blog API');
});

app.use('/blogApi', router);

app.use('*', (req: Request, res: Response, next: NextFunction): void => {
	next(new appError('Page not found', 404));
});

app.use(errorHandler);

app.listen(process.env.PORT, (): void => {
	dataBaseConfig.connect();
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
