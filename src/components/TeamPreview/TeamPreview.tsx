import { useEffect, useState } from 'react';
import { Team } from '../../types/auth';
import { TeamService } from '../../services/team.service';
import { useNavigate } from 'react-router-dom';
import './TeamPreview.scss';

export default function TeamPreview() {
	const [teams, setTeams] = useState<Team[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await TeamService.getAll();
				setTeams(res.teams.slice(0, 6)); // limit to 6
			} catch {
				console.error('Failed to load teams');
			}
		})();
	}, []);

	if (teams.length === 0) return null;

	return (
		<section className="team-preview">
			<h2 className="team-preview__title">Featured Teams</h2>
			<div className="team-preview__scroll-container">
				{teams.map((team) => (
					<div
						key={team._id}
						className="team-preview__card"
						onClick={() => navigate(`/teams/${team._id}`)}
					>
						{team.logo ? (
							<img
								src={team.logo}
								alt={team.name}
								className="team-preview__logo"
							/>
						) : (
							<div className="team-preview__placeholder">
								{team.name[0]}
							</div>
						)}
						<div className="team-preview__info">
							<h3>{team.name}</h3>
							<p>{team.sport}</p>
							<p>{team.level}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
