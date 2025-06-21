// services/user.service.ts
import API from "./api";

export const UserService = {
	async getCurrentUser() {
		const response = await API.get("/users/me");
		return response.data;
	},

	async updateProfile(data: FormData) {
		const response = await API.put("/users/me", data);
		return response.data;
	},
};
