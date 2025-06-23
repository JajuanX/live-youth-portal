import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { SignupForm as SignupFormType } from "../../types/auth";
import "./SignupPage.scss";

export default function SignupPage() {
	const navigate = useNavigate();
	const [form, setForm] = useState<SignupFormType>({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!form.name || !form.email || form.password.length < 6) {
			setError("All fields are required. Password must be at least 6 characters.");
			return;
		}

		try {
			await AuthService.signup(form);
			navigate("/login");
		} catch {
			setError("Signup failed. Try a different email.");
		}
	};

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
			<button className="signup-form__button" type="submit">
				Create Account
			</button>
		</form>
	);
}
