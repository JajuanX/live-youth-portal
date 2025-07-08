import { useEffect, useState } from "react";
import { User } from "../../types/auth";
import { UserService } from "../../services/user.service";
import "./Players.scss";
import { Link } from "react-router-dom";

export default function Player() {
	const [players, setPlayers] = useState<User[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const res = await UserService.getAllPlayers();
				console.log(res);

				setPlayers(res.data.players);
			} catch {
				setError("Failed to load players");
			}
		})();
	}, []);

	if (players.length === 0) {
		return <p>Loading.. </p>;
	}

	return (
		<div className="players">
			<h2 className="players__title">Explore Players</h2>
			{error && <p className="players__error">{error}</p>}
			<div className="players__grid">
				{players.map((player) => (
					<div key={player._id} className="players__card">
						<img
							src={player.profileImage || "/default-avatar.png"}
							alt={player.name}
							className="players__card-img"
						/>
						<div className="players__card-body">
							<Link to={`/players/${player._id}`}>
								<h3 className="players__card-name">{player.name}</h3>
							</Link>
							<p className="players__card-meta">
								{player.position || "Position N/A"}
							</p>
							{player.team &&
								typeof player.team === "object" &&
								"name" in player.team && (
									<Link
										to={`/teams/${player.team._id}`}
										className="players__card-team"
									>
										{player.team.name}
									</Link>
								)}{" "}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
