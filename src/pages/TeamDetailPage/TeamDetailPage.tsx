import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TeamService } from '../../services/team.service';
import { useUserContext } from '../../context/userContext';
import './TeamDetailPage.scss';
import { Team } from '../../types/auth';

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

	if (!team) return <p>Loading...</p>;

	const canRequest =
		user?.role === 'player' && !user?.team && success === '';

	return (
		<div className="team-detail">
			<h2 className="team-detail__name">{team.name}</h2>
			<p className="team-detail__info"><strong>Sport:</strong> {team.sport}</p>
			<p className="team-detail__info"><strong>Level:</strong> {team.level}</p>

			{team.logo && (
				<img src={team.logo} alt="Team Logo" className="team-detail__logo" />
			)}

			{canRequest && (
				<button className="team-detail__button" onClick={handleJoinRequest}>
					Request to Join
				</button>
			)}

			{success && <p className="team-detail__success">{success}</p>}
			{error && <p className="team-detail__error">{error}</p>}
		</div>
	);
}
