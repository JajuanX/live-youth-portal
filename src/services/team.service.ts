// services/team.service.ts
import API from "./api";

export const TeamService = {
	async getAllTeams() {
		const response = await API.get("/teams");
		return response.data;
	},

	async getTeamById(teamId: string) {
		const response = await API.get(`/teams/${teamId}`);
		return response.data;
	},

	async createTeam(data: FormData) {
		const response = await API.post("/teams", data);
		return response.data;
	},

	async requestToJoin(teamId: string) {
		const response = await API.post(`/teams/${teamId}/join`);
		return response.data;
	},
};
