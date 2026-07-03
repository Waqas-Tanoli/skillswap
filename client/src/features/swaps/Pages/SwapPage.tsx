import DashboardLayout from "../../../layouts/DashboardLayout";
import SwapCard from "../Components/SwapCard";

import { useSwaps } from "../hooks";

export default function SwapsPage() {
  const {
    swaps,
    loading,
    refetch,
  } = useSwaps();

  if (loading) {
    return (
      <DashboardLayout>
        Loading swaps...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          My Swaps
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your skill exchange requests.
        </p>
      </div>

      {swaps.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No swaps found
          </h2>

          <p className="mt-2 text-slate-500">
            Start connecting with other learners
            to create your first swap request.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {swaps.map((swap) => (
            <SwapCard
              key={swap._id}
              swap={swap}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}