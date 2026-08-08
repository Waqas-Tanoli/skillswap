import { Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import ProtectedRoute from "../components/ProtectedRoutes";

import AdminRoute from "./AdminRoute";

// User pages
import DashboardPage from "../features/dashboard/Pages/DashboardPage";
import ProfilePage from "../features/profile/Pages/ProfilePage";
import EditProfilePage from "../features/profile/Pages/EditProfilePage";
import MatchesPage from "../features/matches/Pages/MatchPage";
import SwapsPage from "../features/swaps/Pages/SwapPage";
import NotificationsPage from "../features/notifications/Pages/NotificationPage";
import ChatPage from "../features/chat/Pages/ChatPage";
import Inbox from "../features/chat/Pages/Inbox";

// Admin pages
import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import RoleRedirect from "./RoleRedirect";

export default function AppRoutes() {
  return (
    <Routes>

    
      {/* AUTHENTICATION */}
    
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

     
      {/* Root routes*/}

      <Route
        path="/"
        element={<RoleRedirect />}
      />

     
      {/* NORMAL USER ROUTES */}

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
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfilePage />
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
        path="/chat"
        element={
          <ProtectedRoute>
            <Inbox />
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

    
      {/* ADMIN ROUTES */}
     
      <Route element={<AdminRoute />}>

        <Route
          path="/admin/dashboard"
          element={<AdminDashboardPage />}
        />

        {/* Future admin routes */}

        {/*
        <Route
          path="/admin/users"
          element={<UsersPage />}
        />

        <Route
          path="/admin/skills"
          element={<SkillsPage />}
        />

        <Route
          path="/admin/skill-requests"
          element={<SkillRequestsPage />}
        />

        <Route
          path="/admin/swaps"
          element={<AdminSwapsPage />}
        />
        */}

      </Route>

    </Routes>
  );
}