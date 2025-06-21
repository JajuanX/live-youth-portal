// services/transfer.service.ts
import API from "./api";

export const TransferService = {
	async getMyRequests() {
		const response = await API.get("/transfers");
		return response.data;
	},

	async approveRequest(requestId: string) {
		const response = await API.post(`/transfers/${requestId}/approve`);
		return response.data;
	},

	async denyRequest(requestId: string) {
		const response = await API.post(`/transfers/${requestId}/deny`);
		return response.data;
	},
};
