import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home/Home";
import NotFoundPage from "./pages/NotFoundPage/NotfoundPage";

import { useUserContext } from "./context/userContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import TeamListPage from "./pages/TeamListPage/TeamListPage";
import TeamDetailPage from "./pages/TeamDetailPage/TeamDetailPage";
import CreateTeamPage from "./pages/CreateTeamPage/CreateTeamPage";
import CoachDashboard from "./pages/CoachDashboard/CoachDashboard";
import Player from "./pages/Players/Players";
import PlayerDetailPage from "./pages/PlayerDetailsPage/PlayerDetailsPage";
import EditTeamPage from "./pages/EditTeamPage/EditTeamPage";
import MobileHeader from "./components/MobileHeader/MobileHeader";
import MobileNav from "./components/MobileNav/MobileNav";
import EditCoachProfilePage from "./pages/EditCoachProfilePage/EditCoachProfilePage";
import EditPlayerProfilePage from "./pages/EditPlayerProfilePage/EditPlayerProfilePage";

function App() {
	const { user, loading } = useUserContext();

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<MobileHeader />
			<main
				style={{
					paddingTop: "60px",
					paddingBottom: "60px",
					minHeight: "100vh",
				}}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/players" element={<Player />} />
					<Route
						path="/login"
						element={user ? <Navigate to="/" /> : <LoginPage />}
					/>
					<Route
						path="/signup"
						element={user ? <Navigate to="/" /> : <SignupPage />}
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
					<Route
						path="/edit-profile"
						element={
							user?.role === "coach" ? (
								<EditCoachProfilePage />
							) : (
								<EditPlayerProfilePage />
							)
						}
					/>
					<Route path="/teams/:id/edit" element={<EditTeamPage />} />
					<Route path="/players/:id" element={<PlayerDetailPage />} />
					<Route path="/dashboard" element={<CoachDashboard />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
			<MobileNav />
		</>
	);
}

export default App;
