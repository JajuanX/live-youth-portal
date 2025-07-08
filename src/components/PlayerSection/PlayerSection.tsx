import { useEffect, useState } from "react";
import { User } from "../../types/auth";
import { UserService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import "./PlayerSection.scss";

export default function PlayerSection() {
	const [players, setPlayers] = useState<User[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await UserService.getAllPlayers();
				setPlayers(res.data.players.slice(0, 6));
			} catch {
				console.error("Failed to load players");
			}
		})();
	}, []);

	if (players.length === 0) return null;

	return (
		<section className="player-section">
			<h2 className="player-section__title">Featured Players</h2>
			<div className="player-section__scroll-container">
				{players.map((player) => (
					<div
						key={player._id}
						className="player-section__card"
						onClick={() => navigate(`/players/${player._id}`)}
					>
						<img
							src={player.profileImage || "/default-avatar.png"}
							alt={player.name}
							className="player-section__img"
						/>
						<div className="player-section__info">
							<h3>{player.name}</h3>
							<p>{player.position || "Position N/A"}</p>
							<p>
								{player.team && typeof player.team === "object"
									? player.team.name
									: "Free Agent"}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
