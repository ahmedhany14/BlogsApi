import mongoose from 'mongoose';

export interface IUser {
	email: string;
	name: string;
	password: string;
	role: string;
}

export interface IUserDocument extends IUser, mongoose.Document {
}