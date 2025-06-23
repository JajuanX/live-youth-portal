export interface AuthForm {
	email: string;
	password: string;
}

export interface SignupForm extends AuthForm {
	name: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	token: string;
}

export interface AuthResponse {
	message: string;
	user: User;
}

export interface LoginResult {
	success: boolean;
	msg: string;
	error?: unknown;
}