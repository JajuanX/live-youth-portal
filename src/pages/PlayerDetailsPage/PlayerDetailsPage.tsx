import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserService } from "../../services/user.service";
import { User } from "../../types/auth";
import "./PlayerDetailsPage.scss";

export default function PlayerDetailPage() {
	const { id } = useParams();
	const [player, setPlayer] = useState<User | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const res = await UserService.getPlayerById(id!);
				setPlayer(res);
			} catch {
				setError("Failed to load player data.");
			}
		})();
	}, [id]);

	const extractYouTubeId = (url: string): string | null => {
		const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	if (error) return <p>{error}</p>;
	if (!player) return <p>Loading player...</p>;

	const age = player.dob
		? Math.floor((Date.now() - new Date(player.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
		: "N/A";

	const latestCombine = player.combineResults?.[0];

	// const primaryColor = player.customColors?.primary || "#1e3a8a";
	// const secondaryColor = player.customColors?.secondary || "#facc15";

	return (
		<div className="player-card">
			<div className="player-card__header" >
				<img
					className="player-card__photo"
					src={player.profileImage || "/default-avatar.png"}
					alt={player.name}
				/>
				<div className="player-card__info">
					<h1 className="player-card__name">
						{player.nickname ? `"${player.nickname}" ` : ""}{player.name}
					</h1>
					<p className="player-card__team">
						{typeof player.team === "object" && player.team !== null ? (
							<Link to={`/teams/${player.team._id}`}>{player.team.name}</Link>
						) : (
							"Free Agent"
						)}
					</p>
					<div className="player-card__meta">
						<p>POSITION</p>
						<p className="player-card__meta-info">{player.position || "N/A"}</p>
					</div>
					<div className="player-card__meta">
						<p>AGE</p>
						<p className="player-card__meta-info">{age}U</p>
					</div>
				</div>
			</div>

			{latestCombine && (
				<section>
					<h2 className="player-card__combine-title">COMBINE RESULTS</h2>
					<div className="player-card__stats">
						<article className="player-card__stat">
							<h3 className="player-card__stat-title">40</h3>
							<p>{latestCombine.dash40Time || "N/A"}</p>
						</article>
						<article className="player-card__stat">
							<h3 className="player-card__stat-title">VERT</h3>
							<p>{latestCombine.verticalJump || "N/A"}</p>
						</article>
						<article className="player-card__stat">
							<h3 className="player-card__stat-title">BROAD</h3>
							<p>{latestCombine.broadJump || "N/A"}</p>
						</article>
						<article className="player-card__stat">
							<h3 className="player-card__stat-title">SHUTTLE</h3>
							<p>{latestCombine.shuttle || "N/A"}</p>
						</article>
						<article className="player-card__stat">
							<h3 className="player-card__stat-title">3 CONE</h3>
							<p>{latestCombine.threeCone || "N/A"}</p>
						</article>
						{latestCombine.notes && (
							<article className="player-card__stat">
								<h3 className="player-card__stat-title">Notes</h3>
								<p>{latestCombine.notes}</p>
							</article>
						)}
					</div>
				</section>
			)}

			<section className="player-card__details-container">
				<div className="player-card__bio section">
					<h2>Bio</h2>
					<p>{player.bio || "This player has not written a bio yet."}</p>
				</div>

				<div className="player-card__socials section">
					<h2>Socials</h2>
					<ul>
						{player.socials?.twitter && <li><strong>Twitter:</strong> @{player.socials.twitter}</li>}
						{player.socials?.instagram && <li><strong>Instagram:</strong> @{player.socials.instagram}</li>}
						{player.socials?.youtube && <li><strong>YouTube:</strong> {player.socials.youtube}</li>}
					</ul>
				</div>

				<div className="player-card__highlights section">
					<h2>Highlight Film</h2>
					{player.highlightFilm && extractYouTubeId(player.highlightFilm) ? (
						<div className="player-card__video">
							<iframe
								width="100%"
								height="215"
								src={`https://www.youtube.com/embed/${extractYouTubeId(player.highlightFilm)}`}
								title="Highlight Video"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					) : (
						<p>No video available.</p>
					)}
				</div>
			</section>
		</div>
	);
}
