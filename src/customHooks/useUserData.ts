import { useCallback, useEffect, useState } from "react";
import { AuthService } from "../services/auth.service";
import { User } from "../types/auth";

function useUserData() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Logout helper
	const logout = useCallback(() => {
		localStorage.removeItem("token");
		setUser(null);
	}, []);

	// Load current user if token exists
	const fetchUser = useCallback(async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				logout();
				return;
			}

			const profile = await AuthService.getProfile();
			const currentUser = { ...profile, token }; // attach token to user
			setUser(currentUser);
		} catch (err) {
			console.error("Failed to fetch user:", err);
			logout();
		} finally {
			setLoading(false);
		}
	}, [logout]);

	// Initial load
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	// Listen for token removal (logout in another tab)
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === "token" && !event.newValue) {
				logout();
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [logout]);

	// Login handler
	const login = async (email: string, password: string) => {
		try {
			const res = await AuthService.login({ email, password });
			const token = res.user.token;
			localStorage.setItem("token", token);
			setUser(res.user);
			return { success: true, msg: res.message };
		} catch (err) {
			console.error("Login error:", err);
			return { success: false, msg: "Login failed", error: err };
		}
	};

	return { user, login, logout, loading, refetchUser: fetchUser };
}

export default useUserData;
