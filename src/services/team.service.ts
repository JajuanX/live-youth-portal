import { Team, TeamUpdatePayload } from "../types/auth";
import API from "./api";

export const TeamService = {
	async getAll(): Promise<{ teams: Team[] }> {
		const res = await API.get("/teams");
		return res.data;
	},

	async getById(id: string): Promise<Team> {
		const res = await API.get<Team>(`/teams/${id}`);
		return res.data;
	},

	// team.service.ts
	async createTeam(data: {
		name: string;
		sport: string;
		level: string;
		logo?: string;
	}) {
		const response = await API.post("/teams", data);
		return response.data;
	},

	async getMyTeam(): Promise<{ team: Team }> {
		const res = await API.get("/teams/my-team");
		return res.data;
	},

	async requestToJoin(teamId: string): Promise<{ message: string }> {
		const res = await API.post(`/teams/${teamId}/join`);
		return res.data;
	},

	async updateTeam(teamId: string, data: TeamUpdatePayload) {
		const res = await API.put(`/teams/${teamId}`, data);
		return res.data;
	},

	async approveRequest(teamId: string, playerId: string) {
		return API.post(`/teams/${teamId}/requests/${playerId}/approve`);
	},

	async denyRequest(teamId: string, playerId: string) {
		return API.post(`/teams/${teamId}/requests/${playerId}/deny`);
	},

	async removePlayer(teamId: string, playerId: string) {
		return API.post(`/teams/${teamId}/remove-player`, { playerId });
	},
};
