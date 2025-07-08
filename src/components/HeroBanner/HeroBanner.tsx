import { useNavigate } from 'react-router-dom';
import './HeroBanner.scss';

export default function HeroBanner() {
	const navigate = useNavigate();

	return (
		<section className="hero-banner">
			<div className="hero-banner__content">
				<h1 className="hero-banner__title">Welcome to Youth Transfer Portal</h1>
				<p className="hero-banner__subtitle">
					Discover new teams, track your progress, and elevate your game.
				</p>
				<button
					className="hero-banner__cta"
					onClick={() => navigate('/signup')}
				>
					Get Started
				</button>
			</div>
		</section>
	);
}
