// src/components/MobileNav/MobileNav.tsx
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import './MobileNav.scss';

export default function MobileNav() {
	const { user } = useUserContext();

	return (
		<nav className="mobile-nav">
			<Link to="/">🏠</Link>
			<Link to="/teams">🏆</Link>
			<Link to="/players">👟</Link>
			{user?.role === 'coach' && <Link to="/dashboard">📋</Link>}
			<Link to="/edit-profile">👤</Link>
		</nav>
	);
}
