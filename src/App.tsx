import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import NotFoundPage from "./pages/NotFoundPage/NotfoundPage";
import Home from "./pages/Home/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
