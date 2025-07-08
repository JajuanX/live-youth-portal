import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { SignupForm as SignupFormType } from "../../types/auth";
import "./SignupPage.scss";

const roles = ["player", "coach", "admin"] as const;

export default function SignupPage() {
	const navigate = useNavigate();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const [form, setForm] = useState<SignupFormType>({
		name: "",
		email: "",
		password: "",
		role: "player",
	});
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRoleSelect = (role: (typeof roles)[number]) => {
		setForm((prev) => ({ ...prev, role }));
		setDropdownOpen(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.name || !form.email || form.password.length < 6) {
			setError(
				"All fields are required. Password must be at least 6 characters."
			);
			return;
		}
		try {
			await AuthService.signup(form);
			navigate("/login");
		} catch {
			setError("Signup failed. Try a different email.");
		}
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<form className="signup-form" onSubmit={handleSubmit}>
			<h2 className="signup-form__heading">Sign Up</h2>
			{error && <p className="signup-form__error">{error}</p>}

			<input
				className="signup-form__input"
				name="name"
				placeholder="Name"
				value={form.name}
				onChange={handleChange}
				required
			/>
			<input
				className="signup-form__input"
				name="email"
				type="email"
				placeholder="Email"
				value={form.email}
				onChange={handleChange}
				required
			/>
			<input
				className="signup-form__input"
				name="password"
				type="password"
				placeholder="Password"
				value={form.password}
				onChange={handleChange}
				required
				minLength={6}
			/>

			<div className="signup-form__dropdown" ref={dropdownRef}>
				<div
					className="signup-form__dropdown-trigger"
					onClick={() => setDropdownOpen((prev) => !prev)}
				>
					{form.role}
					<span className="signup-form__dropdown-arrow">&#9662;</span>
				</div>
				{dropdownOpen && (
					<ul className="signup-form__dropdown-list">
						{roles.map((role) => (
							<li
								key={role}
								className="signup-form__dropdown-option"
								onClick={() => handleRoleSelect(role)}
							>
								{role}
							</li>
						))}
					</ul>
				)}
			</div>

			<button className="signup-form__button" type="submit">
				Create Account
			</button>
		</form>
	);
}
