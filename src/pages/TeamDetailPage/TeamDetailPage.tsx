import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TeamService } from '../../services/team.service';
import { useUserContext } from '../../context/userContext';
import { Team } from '../../types/auth';
import './TeamDetailPage.scss';

export default function TeamDetailPage() {
	const { id } = useParams();
	const [team, setTeam] = useState<Team | null>(null);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const { user } = useUserContext();

	useEffect(() => {
		(async () => {
			try {
				const data = await TeamService.getById(id!);
				setTeam(data);
								console.log(data);

			} catch {
				setError('Failed to load team.');
			}
		})();
	}, [id]);

	const handleJoinRequest = async () => {
		try {
			await TeamService.requestToJoin(id!);
			setSuccess('Request sent!');
		} catch {
			setError('Could not send request.');
		}
	};

	if (!team) return <p>Loading team...</p>;

	const canRequest =
		user?.role === 'player' && !user?.team && success === '';

	return (
		<div className="team-detail">
			<div className="team-detail__header">
				{team.logo && (
					<img
						src={team.logo}
						alt="Team Logo"
						className="team-detail__logo"
					/>
				)}
			</div>

			<div className="team-detail__card">
				<h2 className="team-detail__name">{team.name}</h2>
				<p className="team-detail__meta">
					{team.sport} | {team.level}
				</p>
				<p className="team-detail__meta">
					Coach: {team.createdBy?.name || 'N/A'}
				</p>

				{canRequest && (
					<button className="team-detail__button" onClick={handleJoinRequest}>
						Request to Join
					</button>
				)}

				{success && <p className="team-detail__success">{success}</p>}
				{error && <p className="team-detail__error">{error}</p>}
			</div>

			<div className="team-detail__section">
				<h3>Players</h3>
				{team.players?.length ? (
					<div className="team-detail__grid">
						{team.players.map((player) => (
							<div key={player._id} className="team-detail__player-card">
								<img
									src={player.profileImage || '/default-avatar.png'}
									alt={player.name}
									className="team-detail__player-img"
								/>
								<h4 className="team-detail__player-name">{player.name}</h4>
								<p className="team-detail__player-position">
									{player.position || 'Position N/A'}
								</p>
							</div>
						))}
					</div>
				) : (
					<p>No players on this team yet.</p>
				)}
			</div>
		</div>
	);
}
