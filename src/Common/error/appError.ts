export class appError extends Error {
	constructor(public message: string, public statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, appError.prototype);
		Error.captureStackTrace(this, this.constructor);
	}
}

export class AuthError extends appError {
	constructor(message: string, statusCode: number = 401) {
		super(message, statusCode);
	}
}

export class ValidationError extends appError {
	constructor(message: string, statusCode: number = 400) {
		super(message, statusCode);
	}
}

export class NotFoundError extends appError {
	constructor(message: string, statusCode: number = 404) {
		super(message, statusCode);
	}
}

export class BadRequestError extends appError {
	constructor(message: string, statusCode: number = 400) {
		super(message, statusCode);
	}
}