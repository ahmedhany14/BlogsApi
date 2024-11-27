import mongoose from 'mongoose';
import { IBlogDocument } from './IBlog';

const blogSchema: mongoose.Schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createAt: {
		type: Date
	},
	reacts: {
		like: {
			type: Number,
			default: 0
		},
		dislike: {
			type: Number,
			default: 0
		},
		love: {
			type: Number,
			default: 0
		}
	},
	usrId: {
		type: String,
		required: true
	},
	commentIds: {
		type: [String]
	}
});

const blogModel = mongoose.model<IBlogDocument>('Blog', blogSchema);

export default blogModel;
