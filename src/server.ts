import dataBaseConfig  from "./Common/config/DataBaseConfig";
import router, {app} from "./app";

import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';

dotenv.config({
    path: './.config.env'
});

app.use('/', (req: Request, res:Response, next: NextFunction): void => {
    res.send('welcome to the server');
});

app.use('/blogApi', router);

app.use('*', (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).send('Page not found');
});

app.listen(process.env.PORT, (): void => {
    dataBaseConfig.connect();
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
