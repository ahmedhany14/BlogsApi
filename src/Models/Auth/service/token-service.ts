import jwt from "jsonwebtoken";

export class TokenService {
	constructor(
	) { }

	private signToken(payload: string): string {
		return jwt.sign(
			{ payload },
			process.env.JWT_SECRET as string,
			{ expiresIn: process.env.JWT_EXPIRES_IN as string }
		);
	}

	public async decodeToken(token: string): Promise<string> {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { payload: string };
		return decoded.payload;
	}

	public createToken(payload: string): string {
		const token = this.signToken(payload);
		return token;
	}
}

const tokenService = new TokenService();
export default tokenService;