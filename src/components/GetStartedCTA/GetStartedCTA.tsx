// src/components/GetStartedCTA/GetStartedCTA.tsx
import { Link } from 'react-router-dom';
import './GetStartedCTA.scss';

export default function GetStartedCTA() {
	return (
		<section className="get-started">
			<div className="get-started__content">
				<h2 className="get-started__heading">Ready to join the movement?</h2>
				<p className="get-started__text">Build your profile, find a team, or create your own today.</p>
				<div className="get-started__actions">
					<Link to="/signup" className="get-started__button">Get Started</Link>
					<Link to="/teams" className="get-started__button get-started__button--secondary">Browse Teams</Link>
				</div>
			</div>
		</section>
	);
}
