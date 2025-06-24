import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamService } from '../../services/team.service';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';
import './CreateTeamPage.scss';

export default function CreateTeamPage() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		sport: '',
		level: '',
	});
	const [logoUrl, setLogoUrl] = useState(''); // S3 public URL
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form.name || !form.sport || !form.level) {
			setError('All fields are required.');
			return;
		}
		console.log(logoUrl);
		
		const payload = {
			name: form.name,
			sport: form.sport,
			level: form.level,
			logo: logoUrl,
		};

		try {
			await TeamService.createTeam(payload); // POST JSON, no FormData
			navigate('/teams');
		} catch {
			setError('Something went wrong while creating the team.');
		}
	};

	return (
		<form className="create-team" onSubmit={handleSubmit}>
			<h2 className="create-team__heading">Create New Team</h2>
			{error && <p className="create-team__error">{error}</p>}

			<input
				className="create-team__input"
				name="name"
				placeholder="Team Name"
				value={form.name}
				onChange={handleChange}
				required
			/>
			<input
				className="create-team__input"
				name="sport"
				placeholder="Sport (e.g. Soccer)"
				value={form.sport}
				onChange={handleChange}
				required
			/>
			<input
				className="create-team__input"
				name="level"
				placeholder="Level (e.g. U14, Varsity)"
				value={form.level}
				onChange={handleChange}
				required
			/>

			<UploadPhoto
				required={false}
				setUrlPath={setLogoUrl}
				urlPath={logoUrl}
				text="Upload Team Logo"
			/>

			<button className="create-team__button" type="submit">
				Create Team
			</button>
		</form>
	);
}
