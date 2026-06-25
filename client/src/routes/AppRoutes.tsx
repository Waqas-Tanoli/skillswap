import { Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

// import DashboardPage from "../features/dashboard/pages/DashboardPage";
// import ProfilePage from "../features/user/pages/ProfilePage";
// import SwapRequestsPage from "../features/swaps/pages/SwapRequestsPage";
// import ChatPage from "../features/chat/pages/ChatPage";

// import AdminDashboard from "../features/admin/pages/AdminDashboard";

//import ProtectedRoute from "../components/ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      

      {/* USER APP
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/swaps"
        element={
          <ProtectedRoute>
            <SwapRequestsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat/:swapId"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      /> */}

      {/* ADMIN
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}