import API from "./api";
import { AuthForm, SignupForm, AuthResponse, User } from "../types/auth";

export const AuthService = {
	async signup(data: SignupForm): Promise<AuthResponse> {
		const res = await API.post<AuthResponse>("/auth/register", data);
		return res.data;
	},

	async login(data: AuthForm): Promise<AuthResponse> {
		const res = await API.post<AuthResponse>('/auth/login', data);
		localStorage.setItem('token', res.data.user.token);
		return res.data;
	},

	async getProfile(): Promise<User> {
		const res = await API.get<User>("/users/me");
		return res.data;
	},
};
