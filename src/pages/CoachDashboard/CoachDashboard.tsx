import { useEffect, useState } from "react";
import { Team } from "../../types/auth";
import { useUserContext } from "../../context/userContext";
import { TeamService } from "../../services/team.service";
import "./CoachDashboard.scss";
import { Link, useNavigate } from 'react-router-dom';

export default function CoachDashboard() {
	const navigate = useNavigate();
	const { user } = useUserContext();
	const [team, setTeam] = useState<Team | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const res = await TeamService.getMyTeam();
				setTeam(res.team);				
			} catch {
				setError("No team found or failed to load");
			}
		})();
	}, [user]);

	const handleApprove = async (playerId: string) => {
		try {
			await TeamService.approveRequest(team!._id, playerId);
			const res = await TeamService.getMyTeam(); // refresh
			setTeam(res.team);
		} catch {
			alert("Approval failed.");
		}
	};

	const handleDeny = async (playerId: string) => {
		try {
			await TeamService.denyRequest(team!._id, playerId);
			const res = await TeamService.getMyTeam(); // refresh
			setTeam(res.team);
		} catch {
			alert("Denial failed.");
		}
	};

	const handleRemovePlayer = async (playerId: string) => {
		if (!team) return;

		try {
			await TeamService.removePlayer(team._id, playerId);
			const res = await TeamService.getMyTeam(); // refresh
			setTeam(res.team);
		} catch (err) {
			console.error(err);
			alert("Failed to remove player.");
		}
	};

	if (user?.role !== "coach" && user?.role !== "admin") {
		return <p>Unauthorized</p>;
	}

	if (error) return <p className="coach-dashboard__error">{error}</p>;
	if (!team) return <p>Loading...</p>;

	return (
		<div className="coach-dashboard">
			<h2 className="coach-dashboard__heading">{team.name} Roster</h2>
			<p className="coach-dashboard__subheading">
				{team.sport} - {team.level}
			</p>
			<button
				className="coach-dashboard__edit-button"
				onClick={() => navigate(`/teams/${team._id}/edit`)}
			>
				Edit Team
			</button>

			<h3 className="coach-dashboard__section-title">Pending Requests</h3>
			{team.pendingRequests.length === 0 ? (
				<p className="coach-dashboard__empty">No pending requests.</p>
			) : (
				<ul className="coach-dashboard__player-list">
					{team.pendingRequests.map((player) => (
						<li key={player._id} className="coach-dashboard__player">
							{player.profileImage && (
								<img
									src={player.profileImage}
									alt={player.name}
									className="coach-dashboard__player-img"
								/>
							)}
							<div>
								<Link to={`/players/${player._id}`}>
									<p className="coach-dashboard__player-name">{player.name}</p>
								</Link>
								<p className="coach-dashboard__player-meta">
									{player.email} {player.position && `| ${player.position}`}
								</p>
								<div className="coach-dashboard__actions">
									<button
										className="coach-dashboard__approve"
										onClick={() => handleApprove(player._id)}
									>
										Approve
									</button>
									<button
										className="coach-dashboard__deny"
										onClick={() => handleDeny(player._id)}
									>
										Deny
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}

			<h3 className="coach-dashboard__section-title">Players</h3>
			{team.players.length === 0 ? (
				<p>No players yet.</p>
			) : (
				<ul className="coach-dashboard__player-list">
					{team.players.map((player) => (
						<li key={player._id} className="coach-dashboard__player">
							{player.profileImage && (
								<img
									src={player.profileImage}
									alt={player.name}
									className="coach-dashboard__player-img"
								/>
							)}
							<div>
								<Link to={`/players/${player._id}`}>
									<p className="coach-dashboard__player-name">{player.name}</p>
								</Link>
								<p className="coach-dashboard__player-meta">{player.email}</p>

								{/* 👇 Remove button */}
								<button
									className="coach-dashboard__remove"
									onClick={() => handleRemovePlayer(player._id)}
								>
									Remove
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
