import { useEffect } from "react";

import AdminLayout from "../../../layouts/AdminLayout";

import DashboardStats from "../components/DashboardStats";
import QuickActions from "../components/QuickActions";

import { useAdminStore } from "../../../store/adminStore";

export default function AdminDashboardPage() {
  const {
    analytics,
    loading,
    fetchAnalytics,
  } = useAdminStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return (
    <AdminLayout>
      <div className="space-y-8">
         {loading && (
          <div className="rounded-xl bg-white p-8 shadow">
            Loading analytics...
          </div>
        )}

        {!loading && analytics && (
          <>
            <DashboardStats />

            <QuickActions />
          </>
        )}
      </div>
    </AdminLayout>
  );
}