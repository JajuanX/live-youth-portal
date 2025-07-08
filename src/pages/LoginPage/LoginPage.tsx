import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { AuthForm } from '../../types/auth';
import './LoginPage.scss';

export default function LoginPage() {
	const { login } = useUserContext();
	const navigate = useNavigate();

	const [form, setForm] = useState<AuthForm>({ email: '', password: '' });
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.email || !form.password) {
			setError('Please enter email and password.');
			return;
		}
		const result = await login(form.email, form.password);
		if (result.success) {
			navigate('/');
		} else {
			setError(result.msg);
		}
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<h2 className="login-form__heading">Login</h2>
			{error && <p className="login-form__error">{error}</p>}

			<input
				className="login-form__input"
				name="email"
				type="email"
				placeholder="Email"
				value={form.email}
				onChange={handleChange}
				required
			/>
			<input
				className="login-form__input"
				name="password"
				type="password"
				placeholder="Password"
				value={form.password}
				onChange={handleChange}
				required
			/>
			<button className="login-form__button" type="submit">
				Login
			</button>
		</form>
	);
}
