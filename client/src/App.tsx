import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { CarProfile } from './pages/CarProfile';
import { UserProfile } from './pages/UserProfile';
import { Welcome } from './pages/Welcome';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import SignUp from "./pages/SignUp.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} /> 

                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/carprofile" element={<CarProfile />} />
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/car/:carNickname/maintenance" element={<CarProfile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;