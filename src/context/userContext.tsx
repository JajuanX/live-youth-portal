import { createContext, useContext } from "react";
import useUserData from "../customHooks/useUserData";
import { LoginResult, User } from "../types/auth";

interface UserContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<LoginResult>;
	logout: () => void;
	loading: boolean;
	refetchUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const userData = useUserData();
	return (
		<UserContext.Provider value={userData}>{children}</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context)
		throw new Error("useUserContext must be used within a UserProvider");
	return context;
};
