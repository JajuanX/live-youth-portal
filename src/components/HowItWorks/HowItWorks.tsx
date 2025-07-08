// src/components/HowItWorks/HowItWorks.tsx
import './HowItWorks.scss';

export default function HowItWorks() {
	return (
		<section className="how-it-works">
			<h2 className="how-it-works__title">How It Works</h2>
			<div className="how-it-works__steps">
				<div className="how-it-works__step">
					<div className="how-it-works__icon">👤</div>
					<h3 className="how-it-works__step-title">Create Your Profile</h3>
					<p className="how-it-works__text">Sign up as a player, coach, or admin and fill out your info.</p>
				</div>
				<div className="how-it-works__step">
					<div className="how-it-works__icon">🏈</div>
					<h3 className="how-it-works__step-title">Join or Build Teams</h3>
					<p className="how-it-works__text">Coaches can create teams, players can request to join them.</p>
				</div>
				<div className="how-it-works__step">
					<div className="how-it-works__icon">📈</div>
					<h3 className="how-it-works__step-title">Track Growth</h3>
					<p className="how-it-works__text">Showcase performance, share highlight videos, and get noticed.</p>
				</div>
			</div>
		</section>
	);
}
