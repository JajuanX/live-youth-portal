import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TeamService } from "../../services/team.service";
import UploadPhoto from "../../components/UploadPhoto/UploadPhoto";
import "./EditTeamPage.scss";

export default function EditTeamPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		sport: "",
		level: "",
		logo: "",
	});
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const data = await TeamService.getById(id!);
				setForm({
					name: data.name || "",
					sport: data.sport || "",
					level: data.level || "",
					logo: data.logo || "",
				});
			} catch {
				setError("Failed to load team");
			}
		})();
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await TeamService.updateTeam(id!, form);
			navigate(`/dashboard`);
		} catch {
			setError("Failed to update team");
		}
	};

	return (
		<form className="edit-team" onSubmit={handleSubmit}>
			<h2 className="edit-team__heading">Edit Team</h2>
			{error && <p className="edit-team__error">{error}</p>}

			<input
				name="name"
				value={form.name}
				onChange={handleChange}
				placeholder="Team Name"
				className="edit-team__input"
				required
			/>
			<input
				name="sport"
				value={form.sport}
				onChange={handleChange}
				placeholder="Sport"
				className="edit-team__input"
				required
			/>
			<input
				name="level"
				value={form.level}
				onChange={handleChange}
				placeholder="Level"
				className="edit-team__input"
				required
			/>

			<UploadPhoto
				text="Upload Logo"
				urlPath={form.logo}
				setUrlPath={(url) => setForm((prev) => ({ ...prev, logo: url }))}
			/>

			<button className="edit-team__button" type="submit">
				Update Team
			</button>
		</form>
	);
}
