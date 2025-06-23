import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { UserService } from '../../services/user.service';
import './ProfileForm.scss';

export default function ProfileForm() {
	const { user, logout } = useUserContext();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: user?.name || '',
		bio: user?.bio || '',
		twitter: user?.socials?.twitter || '',
		instagram: user?.socials?.instagram || '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await UserService.updateProfile({
				name: form.name,
				bio: form.bio,
				socials: {
					twitter: form.twitter,
					instagram: form.instagram,
				},
			});
			navigate('/profile');
		} catch (err) {
			console.error('Profile update failed', err);
			logout(); // optional: force re-auth
		}
	};

	return (
		<form className="profile-form" onSubmit={handleSubmit}>
			<h2 className="profile-form__heading">Edit Profile</h2>

			<input
				className="profile-form__input"
				name="name"
				value={form.name}
				onChange={handleChange}
				placeholder="Name"
				required
			/>

			<textarea
				className="profile-form__textarea"
				name="bio"
				value={form.bio}
				onChange={handleChange}
				placeholder="Short bio"
			/>

			<input
				className="profile-form__input"
				name="twitter"
				value={form.twitter}
				onChange={handleChange}
				placeholder="Twitter handle"
			/>

			<input
				className="profile-form__input"
				name="instagram"
				value={form.instagram}
				onChange={handleChange}
				placeholder="Instagram handle"
			/>

			<button className="profile-form__button" type="submit">
				Save Profile
			</button>
		</form>
	);
}
