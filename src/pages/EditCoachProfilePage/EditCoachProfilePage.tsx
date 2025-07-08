import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { UserService } from "../../services/user.service";
import UploadPhoto from "../../components/UploadPhoto/UploadPhoto";
import "./EditCoachProfilePage.scss";

export default function EditCoachProfilePage() {
	const { user, refetchUser } = useUserContext();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		bio: "",
		socials: {
			twitter: "",
			instagram: "",
			youtube: "",
		},
		profileImage: "",
	});

	useEffect(() => {
		if (user) {
			setForm({
				name: user.name || "",
				bio: user.bio || "",
				socials: {
					twitter: user.socials?.twitter || "",
					instagram: user.socials?.instagram || "",
					youtube: user.socials?.youtube || "",
				},
				profileImage: user.profileImage || "",
			});
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (name in form.socials) {
			setForm(prev => ({ ...prev, socials: { ...prev.socials, [name]: value } }));
		} else {
			setForm(prev => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await UserService.updateProfile(form);
			await refetchUser();
			navigate("/edit-profile");
		} catch {
			alert("Failed to update profile.");
		}
	};

	return (
		<form className="edit-profile" onSubmit={handleSubmit}>
			<h2 className="edit-profile__heading">Edit Coach Profile</h2>
			<input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
			<textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
			<input name="twitter" value={form.socials.twitter} onChange={handleChange} placeholder="Twitter" />
			<input name="instagram" value={form.socials.instagram} onChange={handleChange} placeholder="Instagram" />
			<input name="youtube" value={form.socials.youtube} onChange={handleChange} placeholder="YouTube" />
			<UploadPhoto text="Upload Profile Image" urlPath={form.profileImage} setUrlPath={(url) => setForm(prev => ({ ...prev, profileImage: url }))} />
			<button type="submit" className="edit-profile__button">Save Changes</button>
		</form>
	);
}
