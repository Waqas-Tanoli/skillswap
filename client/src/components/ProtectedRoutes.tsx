import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  role?: "user" | "admin";
};

export default function ProtectedRoute({ children, role }: Props) {
  const { user, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}