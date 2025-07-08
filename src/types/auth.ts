export interface AuthForm {
	email: string;
	password: string;
}

export interface SignupForm extends AuthForm {
	name: string;
	role: "player" | "coach" | "admin";
}

export interface CombineResult {
	date: string; // ISO string (e.g., "2025-06-24")
	dash40Time?: string;
	verticalJump?: string;
	broadJump?: string;
	benchPress?: string;
	shuttle?: string;
	threeCone?: string;
	notes?: string;
}

type TeamReference = string | { _id: string; name: string; level?: string };

export interface User {
	_id: string;
	name: string;
	nickname?: string;
	email: string;
	role: "player" | "coach" | "admin";
	bio?: string;
	position?: string;
	height?: string;
	weight?: string;
	school?: string;
	gradYear?: number;
	gpa?: string;
	location?: {
		city?: string;
		state?: string;
	};
	dob?: string;
	highlightFilm?: string;
	socials?: {
		twitter?: string;
		instagram?: string;
		youtube?: string;
	};
	profileImage?: string;
	token: string;
	team?: TeamReference;
	wishlist?: string[];
	customColors?: { primary: string; secondary: string };
	combineResults?: CombineResult[];
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

export interface Player {
	_id: string;
	name: string;
	email: string;
	position?: string;
	profileImage?: string;
	team?: TeamReference;
}

export interface Team {
	_id: string;
	name: string;
	sport?: string;
	logo?: string;
	level?: string;
	createdBy: {
		_id: string;
		name: string;
	};
	players: Player[];
	pendingRequests: Player[];
}

export interface TeamUpdatePayload {
	name: string;
	sport: string;
	level: string;
	logo?: string;
}
