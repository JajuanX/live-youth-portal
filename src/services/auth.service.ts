// services/auth.service.ts
import API from "./api";

export const AuthService = {
	async login(email: string, password: string) {
		const response = await API.post("/auth/login", { email, password });
		return response.data;
	},

	async register(data: {
		name: string;
		email: string;
		password: string;
		role: "player" | "admin";
	}) {
		const response = await API.post("/auth/register", data);
		return response.data;
	},

	async logout() {
		const response = await API.post("/auth/logout");
		return response.data;
	},
};
