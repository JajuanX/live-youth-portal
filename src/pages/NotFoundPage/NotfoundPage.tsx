import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

/**
 * NotFoundPage shows a user-friendly message when no route matches.
 */
const NotFoundPage = () => {
	return (
		<main className="not-found">
			<h1 className="not-found__title">404 - Page Not Found</h1>
			<p className="not-found__message">
				Oops! The page you’re looking for doesn’t exist.
			</p>
			<Link to="/characters" className="not-found__link">
				Go Back Home
			</Link>
		</main>
	);
};

export default NotFoundPage;
