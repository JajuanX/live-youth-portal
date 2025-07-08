import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { UserService } from "../../services/user.service";
import UploadPhoto from "../../components/UploadPhoto/UploadPhoto";
import positions from "../../data/footballPositions.json";
import "./EditPlayerProfilePage.scss";

export default function EditPlayerProfilePage() {
	const { user, refetchUser } = useUserContext();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		nickname: "",
		bio: "",
		position: "",
		dob: "",
		highlightFilm: "",
		socials: {
			twitter: "",
			instagram: "",
			youtube: "",
		},
		profileImage: "",
		customColors: {
			primary: "#1e3a8a",
			secondary: "#facc15",
		},
	});

	useEffect(() => {
		if (user) {
			setForm({
				name: user.name || "",
				nickname: user.nickname || "",
				bio: user.bio || "",
				position: user.position || "",
				dob: user.dob || "",
				highlightFilm: user.highlightFilm || "",
				socials: {
					twitter: user.socials?.twitter || "",
					instagram: user.socials?.instagram || "",
					youtube: user.socials?.youtube || "",
				},
				profileImage: user.profileImage || "",
				customColors: user.customColors || {
					primary: "#1e3a8a",
					secondary: "#facc15",
				},
			});
		}
	}, [user]);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		if (name in form.socials) {
			setForm((prev) => ({
				...prev,
				socials: { ...prev.socials, [name]: value },
			}));
		} else {
			setForm((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			customColors: { ...prev.customColors, [name.split(".")[1]]: value },
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await UserService.updateProfile(form);
			await refetchUser();
			navigate("/edit-profile");
		} catch {
			alert("Failed to update profile.");
		}
	};

	const handleLeaveTeam = async () => {
		try {
			await UserService.leaveTeam();
			alert("You’ve left the team.");
			await refetchUser();
		} catch {
			alert("Failed to leave team.");
		}
	};

	const formatDateForInput = (isoDate: string) => isoDate.split("T")[0];

	return (
		<form className="edit-profile" onSubmit={handleSubmit}>
			<h2 className="edit-profile__heading">Edit Player Profile</h2>

			<input
				className="edit-profile__input"
				name="name"
				value={form.name}
				onChange={handleChange}
				placeholder="Full Name"
			/>
			<input
				className="edit-profile__input"
				name="nickname"
				value={form.nickname}
				onChange={handleChange}
				placeholder="Nickname"
			/>
			<select
				name="position"
				value={form.position}
				onChange={handleChange}
				className="edit-profile__select"
			>
				<option value="">Select Position</option>
				{positions.map((pos) => (
					<option key={pos} value={pos}>
						{pos}
					</option>
				))}
			</select>
			<input
				className="edit-profile__input"
				type="date"
				name="dob"
				value={form.dob ? formatDateForInput(form.dob) : ""}
				onChange={handleChange}
			/>
			<input
				className="edit-profile__input"
				name="highlightFilm"
				placeholder="Highlight Film URL"
				value={form.highlightFilm}
				onChange={handleChange}
			/>
			<textarea
				className="edit-profile__textarea"
				name="bio"
				value={form.bio}
				onChange={handleChange}
				placeholder="Bio"
			/>

			<h4 className="edit-profile__label">Social Links</h4>
			<input
				className="edit-profile__input"
				name="twitter"
				value={form.socials.twitter}
				onChange={handleChange}
				placeholder="Twitter"
			/>
			<input
				className="edit-profile__input"
				name="instagram"
				value={form.socials.instagram}
				onChange={handleChange}
				placeholder="Instagram"
			/>
			<input
				className="edit-profile__input"
				name="youtube"
				value={form.socials.youtube}
				onChange={handleChange}
				placeholder="YouTube"
			/>

			<h4 className="edit-profile__label">Profile Colors</h4>
			<input
				className="edit-profile__input"
				type="color"
				name="customColors.primary"
				value={form.customColors.primary}
				onChange={handleColorChange}
			/>
			<input
				className="edit-profile__input"
				type="color"
				name="customColors.secondary"
				value={form.customColors.secondary}
				onChange={handleColorChange}
			/>

			<UploadPhoto
				text="Upload Profile Image"
				urlPath={form.profileImage}
				setUrlPath={(url) =>
					setForm((prev) => ({ ...prev, profileImage: url }))
				}
			/>

			<button
				className="edit-profile__button"
				type="button"
				onClick={handleLeaveTeam}
			>
				Leave Team / Enter Portal
			</button>

			<button type="submit" className="edit-profile__button">
				Save Changes
			</button>
		</form>
	);
}
