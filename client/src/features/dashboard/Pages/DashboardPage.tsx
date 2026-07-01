import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import ReputationCard from "../components/ReputationCard";
import NotificationList from "../components/NotificationList";

import { useDashboard } from "../hooks";

export default function DashboardPage() {
  const {
    data,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <div className="p-10">
        Loading dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <DashboardHeader user={data.user} />

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Total Swaps"
          value={data.statistics.totalSwaps}
        />

        <StatCard
          title="Pending"
          value={data.statistics.pendingSwaps}
        />

        <StatCard
          title="Accepted"
          value={data.statistics.acceptedSwaps}
        />

        <StatCard
          title="Completed"
          value={data.statistics.completedSwaps}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ReputationCard
          reputation={data.reputation}
        />

        <NotificationList
          notifications={
            data.recentNotifications
          }
        />
      </div>
    </div>
  );
}