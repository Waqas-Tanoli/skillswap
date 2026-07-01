import DashboardLayout from "../../../layouts/DashboardLayout";
import MatchCard from "../Components/MatchCard";

import { useMatches } from "../hooks";

export default function MatchesPage() {
  const { matches, loading } =
    useMatches();

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading matches...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Your Matches
        </h1>

        <p className="mt-2 text-gray-500">
          People you can exchange skills with.
        </p>
      </div>

      <div className="grid gap-6">
        {matches.map((match) => (
          <MatchCard
            key={match.user._id}
            match={match}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}