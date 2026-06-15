import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ObservationLogsPage from "../pages/ObservationLogsPage";
import CrewsPage from "../pages/CrewsPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import PublicLayout from "../components/layout/PublicLayout";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><ObservationLogsPage /></ProtectedRoute>} />
        <Route path="/crews" element={<ProtectedRoute><CrewsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    </Routes>
);

export default AppRoutes;