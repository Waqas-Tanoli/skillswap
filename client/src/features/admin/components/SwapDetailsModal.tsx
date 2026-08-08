import type { AdminSwap } from "../types";
import SwapStatusBadge from "./SwapStatusBadge";

interface Props {
  swap: AdminSwap | null;
  onClose: () => void;
}

export default function SwapDetailsModal({
  swap,
  onClose,
}: Props) {
  if (!swap) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Swap Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              ID: {swap._id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Status
            </span>

            <SwapStatusBadge status={swap.status} />
          </div>

          {/* Users */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-slate-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                Sender
              </p>

              <p className="font-semibold text-slate-900">
                {swap.sender.username}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {swap.sender.email}
              </p>

              {typeof swap.sender.trustScore ===
                "number" && (
                <p className="mt-2 text-xs text-slate-500">
                  Trust Score:{" "}
                  {swap.sender.trustScore}
                </p>
              )}
            </div>

            <div className="rounded-xl border bg-slate-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                Receiver
              </p>

              <p className="font-semibold text-slate-900">
                {swap.receiver.username}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {swap.receiver.email}
              </p>

              {typeof swap.receiver.trustScore ===
                "number" && (
                <p className="mt-2 text-xs text-slate-500">
                  Trust Score:{" "}
                  {swap.receiver.trustScore}
                </p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-4">
              <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                Skill Offered
              </p>

              <p className="font-semibold text-slate-900">
                {swap.skillOffered.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {swap.skillOffered.category}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                Skill Requested
              </p>

              <p className="font-semibold text-slate-900">
                {swap.skillRequested.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {swap.skillRequested.category}
              </p>
            </div>
          </div>

          {/* Message */}
          {swap.message && (
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Message
              </p>

              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                {swap.message}
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="grid gap-4 border-t pt-4 text-sm md:grid-cols-2">
            <div>
              <span className="text-slate-500">
                Created
              </span>

              <p className="mt-1 font-medium text-slate-800">
                {new Date(
                  swap.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <span className="text-slate-500">
                Updated
              </span>

              <p className="mt-1 font-medium text-slate-800">
                {new Date(
                  swap.updatedAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}