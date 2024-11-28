import Document from 'mongoose';

export interface IBlog {
	title: string;
	content: string;
	createAt: Date;
	like: number;
	dislike: number;
	usrId: string;
	commentIds: string[];
}

export interface IBlogDocument extends IBlog, Document { }