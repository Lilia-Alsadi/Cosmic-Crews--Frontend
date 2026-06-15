import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ObservationLogsPage from "../pages/ObservationLogsPage";
import CrewsPage from "../pages/CrewsPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><ObservationLogsPage /></ProtectedRoute>} />
        <Route path="/crews" element={<ProtectedRoute><CrewsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    </Routes>
);

export default AppRoutes;