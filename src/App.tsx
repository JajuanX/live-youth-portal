import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home/Home";
import NotFoundPage from "./pages/NotFoundPage/NotfoundPage";

import { useUserContext } from "./context/userContext";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileForm from "./pages/ProfileForm/ProfileForm";
import TeamListPage from "./pages/TeamListPage/TeamListPage";
import TeamDetailPage from "./pages/TeamDetailPage/TeamDetailPage";
import CreateTeamPage from "./pages/CreateTeamPage/CreateTeamPage";
import CoachDashboard from "./pages/CoachDashboard/CoachDashboard";

function App() {
	const { user, loading } = useUserContext();

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/login"
				element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
			/>
			<Route
				path="/signup"
				element={user ? <Navigate to="/dashboard" /> : <SignupPage />}
			/>
			<Route
				path="/profile"
				element={user ? <ProfilePage /> : <Navigate to="/login" />}
			/>
			<Route
				path="/profile/edit"
				element={user ? <ProfileForm /> : <Navigate to="/login" />}
			/>
			<Route path="/teams" element={<TeamListPage />} />
			<Route path="/teams/:id" element={<TeamDetailPage />} />
			<Route
				path="/teams/create"
				element={
					user?.role === "coach" || user?.role === "admin" ? (
						<CreateTeamPage />
					) : (
						<Navigate to="/teams" />
					)
				}
			/>
			<Route path="/dashboard" element={<CoachDashboard />} />

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
