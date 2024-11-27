import blogModel from './entitie/blog-entitie';
import { IBlogDocument } from './entitie/IBlog';

export class BlogService {
	constructor() {
	}

	public async getBlogs(): Promise<IBlogDocument[]> {
		const blogs = await blogModel.find();
		return blogs;
	}

	public async getBlogById(id: string): Promise<IBlogDocument | null> {
		const blog = await blogModel.findById(id);
		return blog;
	}

	public async createBlog(blog: IBlogDocument): Promise<IBlogDocument> {
		return await blogModel.create(blog);
	}

	public async editContent(id: string, content: string): Promise<IBlogDocument | null> {
		const blog = await blogModel.findByIdAndUpdate(id, { content: content }, { new: true });
		return blog;
	}

	public async deleteBlog(id: string): Promise<IBlogDocument | null> {
		const blog = await blogModel.findByIdAndDelete(id);
		return blog;
	}
}

const blogService = new BlogService();
export default blogService;