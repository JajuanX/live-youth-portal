import { useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import "./ProfilePage.scss";
import { Link } from "react-router-dom";

export default function ProfilePage() {
	const { user, refetchUser } = useUserContext();

	useEffect(() => {
		refetchUser();
	}, []);

	console.log(user);

	if (!user) return <p>Loading...</p>;

	return (
		<div className="profile-page">
			<h2 className="profile-page__title">{user.name}</h2>
			<p className="profile-page__item">
				<strong>Email:</strong> {user.email}
			</p>
			<p className="profile-page__item">
				<strong>Role:</strong> {user.role}
			</p>
			{user.bio && (
				<p className="profile-page__item">
					<strong>Bio:</strong> {user.bio}
				</p>
			)}
			<p className="profile-page__item">
				<strong>Team:</strong>{" "}
				{typeof user.team === "object" ? <Link to={`/teams/${user.team._id}`}>{user.team.name}</Link> : "Free Agent"}
			</p>
			{user.socials?.twitter && (
				<p className="profile-page__item">
					<strong>Twitter:</strong> {user.socials.twitter}
				</p>
			)}
			{user.socials?.instagram && (
				<p className="profile-page__item">
					<strong>Instagram:</strong> {user.socials.instagram}
				</p>
			)}
		</div>
	);
}
