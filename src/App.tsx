import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';

import Home from './pages/Home/Home';
import NotFoundPage from './pages/NotFoundPage/NotfoundPage';

import { useUserContext } from './context/userContext';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';

function App() {
	const { user, loading } = useUserContext();

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
			<Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
			{/* <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} /> */}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
