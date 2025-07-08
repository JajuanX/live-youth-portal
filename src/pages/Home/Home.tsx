// src/pages/Home/Home.tsx
// import HeroBanner from '../../components/HeroBanner/HeroBanner';
import PlayerSection from '../../components/PlayerSection/PlayerSection';
import TeamPreview from '../../components/TeamPreview/TeamPreview';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import GetStartedCTA from '../../components/GetStartedCTA/GetStartedCTA';

export default function Home() {
	return (
		<div className="home">
			{/* <HeroBanner /> */}
			<TeamPreview />
			<PlayerSection />
			<HowItWorks />
			<GetStartedCTA />
		</div>
	);
}
