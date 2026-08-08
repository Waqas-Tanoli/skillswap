
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function RoleRedirect() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          Loading...
        </p>
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin
  if (user.role === "admin") {
    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  // Normal user
  return (
    <Navigate
      to="/dashboard"
      replace
    />
  );
}