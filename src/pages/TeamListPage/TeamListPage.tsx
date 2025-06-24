import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TeamService } from '../../services/team.service';
import './TeamListPage.scss';
import { Team } from '../../types/auth';

export default function TeamListPage() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		(async () => {
			const allTeams = await TeamService.getAll();
			console.log(allTeams);
			
			setTeams(allTeams.teams);
		})();
	}, []);

	const filtered = teams.filter(team =>
		team.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div className="team-list">
			<h2 className="team-list__heading">Teams</h2>
			<input
				type="text"
				placeholder="Filter by name..."
				className="team-list__filter"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>
			<ul className="team-list__grid">
				{filtered.map((team) => (
					<li key={team._id} className="team-list__item">
						<Link to={`/teams/${team._id}`}>
							<h3>{team.name}</h3>
							<p>{team.sport} • {team.level}</p>
							<div className='team-list__container'>
								<img className='team-list__photo' src={team.logo} />
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
