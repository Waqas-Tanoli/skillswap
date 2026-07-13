import { Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../features/home/pages/HomePage";


// import ProfilePage from "../features/user/pages/ProfilePage";
// import SwapRequestsPage from "../features/swaps/pages/SwapRequestsPage";
// import ChatPage from "../features/chat/pages/ChatPage";

// import AdminDashboard from "../features/admin/pages/AdminDashboard";

import ProtectedRoute from "../components/ProtectedRoutes";
import DashboardPage from "../features/dashboard/Pages/DashboardPage";
import ProfilePage from "../features/user/Pages/ProfilePage";
import MatchesPage from "../features/matches/Pages/MatchPage";
import SwapsPage from "../features/swaps/Pages/SwapPage";
import NotificationsPage from "../features/notifications/Pages/NotificationPage";
import ChatPage from "../features/chat/Pages/ChatPage";
import Inbox from "../features/chat/Pages/Inbox";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
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
  path="/matches"
  element={
    <ProtectedRoute>
      <MatchesPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/swaps"
  element={
    <ProtectedRoute>
      <SwapsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <NotificationsPage />
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
/>

<Route
path="/chat"
element={
  <ProtectedRoute>
    <Inbox />
  </ProtectedRoute>
}
/>
    </Routes>
  );
}