import {
  Users,
  RefreshCw,
  Star,
  GraduationCap,
} from "lucide-react";

import StatsCard from "./StatsCard";

import { useAdminStore } from "../../../store/adminStore";

export default function DashboardStats() {
  const analytics = useAdminStore(
    (state) => state.analytics
  );

  if (!analytics) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Users"
        value={analytics.users.total}
        subtitle={`${analytics.users.verified} verified`}
        icon={<Users className="text-white" />}
        color="bg-blue-600"
      />

      <StatsCard
        title="Swaps"
        value={analytics.swaps.total}
        subtitle={`${analytics.swaps.completed} completed`}
        icon={<RefreshCw className="text-white" />}
        color="bg-emerald-600"
      />

      <StatsCard
        title="Skills"
        value={analytics.skills.total}
        subtitle={`${analytics.skills.pendingRequests} pending requests`}
        icon={<GraduationCap className="text-white" />}
        color="bg-violet-600"
      />

      <StatsCard
        title="Ratings"
        value={analytics.ratings.average}
        subtitle={`${analytics.ratings.total} ratings`}
        icon={<Star className="text-white" />}
        color="bg-amber-500"
      />
    </div>
  );
}