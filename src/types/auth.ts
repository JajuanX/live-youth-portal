export interface AuthForm {
	email: string;
	password: string;
}

export interface SignupForm extends AuthForm {
	name: string;
	role: 'player' | 'coach' | 'admin';
}

export interface User {
	id: string;
	name: string;
	email: string;
	role: 'player' | 'coach' | 'admin';
	team?: string | null;
	bio?: string;
	socials?: {
		twitter?: string;
		instagram?: string;
	};
	profileImage?: string;
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