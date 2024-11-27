import Document from 'mongoose';

export interface IBlog {
	title: string;
	content: string;
	createAt: Date;
	reacts:{
		like: number;
		dislike: number;
		love: number;
	}
	usrId: string;
	commentIds: string[];
}

export interface IBlogDocument extends IBlog, Document {}