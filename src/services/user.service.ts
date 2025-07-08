import { User } from "../types/auth";
import API from "./api";

export const UserService = {
	async getProfile(): Promise<User> {
		const res = await API.get<User>("/users/me");
		return res.data;
	},

	async updateProfile(data: Partial<User>): Promise<User> {
		const res = await API.put<User>("/users/me", data);
		return res.data;
	},

	async getAllPlayers() {
		return API.get<{ players: User[] }>("/users/players");
	},

	async getPlayerById(id: string) {
		const res = await API.get<{ user: User }>(`/users/players/${id}`);
		return res.data.user;
	},

	async leaveTeam() {
		return API.patch("/users/me/leave-team");
	},
};
