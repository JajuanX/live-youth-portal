// src/components/MobileHeader/MobileHeader.tsx
import { Link } from 'react-router-dom';
import './MobileHeader.scss';

export default function MobileHeader() {
	return (
		<header className="mobile-header">
			<Link to="/" className="mobile-header__logo">🏟️ Portal</Link>
			<Link to="/edit-profile" className="mobile-header__icon">👤</Link>
		</header>
	);
}
