import { useEffect, useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";

import { useAdminStore } from "../../../store/adminStore";

import type { AdminSwap, SwapStatus } from "../types";

import SwapStatusBadge from "../components/SwapStatusBadge";
import SwapDetailsModal from "../components/SwapDetailsModal";
import DeleteSwapModal from "../components/DeleteSwapModal";
import AdminLayout from "../../../layouts/AdminLayout";

const statuses: Array<{ label: string; value: SwapStatus | "" }> = [
  {
    label: "All Status",
    value: "",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Accepted",
    value: "accepted",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

export default function AdminSwapsPage() {
  const { swaps, swapsLoading, swapsError, fetchSwaps, removeSwap } =
    useAdminStore();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<SwapStatus | "">("");

  const [selectedSwap, setSelectedSwap] = useState<AdminSwap | null>(null);

  const [deleteSwap, setDeleteSwap] = useState<AdminSwap | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSwaps(status || undefined, search || undefined);
    }, 300);

    return () => clearTimeout(timer);
  }, [status, search, fetchSwaps]);

  const handleDelete = async () => {
    if (!deleteSwap) {
      return;
    }

    try {
      setDeleteLoading(true);

      await removeSwap(deleteSwap._id);

      setDeleteSwap(null);
    } catch (error) {
      console.error("Failed to delete swap:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Swap Management</h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor and manage skill exchange requests across the platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total Swaps</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {swaps.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Pending</p>

            <p className="mt-2 text-2xl font-bold text-amber-600">
              {swaps.filter((swap) => swap.status === "pending").length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Accepted</p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {swaps.filter((swap) => swap.status === "accepted").length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Completed</p>

            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {swaps.filter((swap) => swap.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users or skills..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as SwapStatus | "")}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {statuses.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {swapsError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {swapsError}
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Sender
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Receiver
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Exchange
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {swapsLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      Loading swaps...
                    </td>
                  </tr>
                ) : swaps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="font-medium text-slate-700">
                        No swaps found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or status filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  swaps.map((swap) => (
                    <tr key={swap._id} className="transition hover:bg-slate-50">
                      {/* Sender */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {swap.sender.username}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {swap.sender.email}
                        </p>
                      </td>

                      {/* Receiver */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {swap.receiver.username}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {swap.receiver.email}
                        </p>
                      </td>

                      {/* Exchange */}
                      <td className="px-6 py-4">
                        <div>
                          <span className="font-medium text-slate-800">
                            {swap.skillOffered.name}
                          </span>

                          <span className="mx-2 text-slate-400">→</span>

                          <span className="font-medium text-slate-800">
                            {swap.skillRequested.name}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {swap.skillOffered.category} →{" "}
                          {swap.skillRequested.category}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <SwapStatusBadge status={swap.status} />
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {new Date(swap.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedSwap(swap)}
                            title="View swap"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() => setDeleteSwap(swap)}
                            title="Delete swap"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details */}
      <SwapDetailsModal
        swap={selectedSwap}
        onClose={() => setSelectedSwap(null)}
      />

      {/* Delete */}
      <DeleteSwapModal
        swap={deleteSwap}
        loading={deleteLoading}
        onClose={() => setDeleteSwap(null)}
        onConfirm={handleDelete}
      />
    </AdminLayout>
  );
}
