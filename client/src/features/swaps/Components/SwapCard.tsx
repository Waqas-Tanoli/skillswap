import {
  acceptSwap,
  rejectSwap,
  completeSwap,
} from "../api";

import type { Swap } from "../types";

import { useAuthStore } from "../../../store/authStore";

import SwapStatusBadge from "./SwapStatusBadge";
import { Link } from "react-router-dom";

type Props = {
  swap: Swap;
  refetch: () => void;
};

export default function SwapCard({
  swap,
  refetch,
}: Props) {
  const user = useAuthStore(
    (state) => state.user
  );

  const isReceiver =
    swap.receiver._id === user?.id;

  const handleAccept = async () => {
    await acceptSwap(swap._id);
    refetch();
  };

  const handleReject = async () => {
    await rejectSwap(swap._id);
    refetch();
  };

  const handleComplete = async () => {
    await completeSwap(swap._id);
    refetch();
  };
  const otherUser =
  swap.sender._id === user?.id
    ? swap.receiver
    : swap.sender;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {swap.sender.username} →{""}
          {swap.receiver.username}
        </h2>

        <SwapStatusBadge
          status={swap.status}
        />
      </div>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Offering:</strong>{" "}
          {swap.skillOffered.name}
        </p>

        <p>
          <strong>Requesting:</strong>{" "}
          {swap.skillRequested.name}
        </p>

        {swap.message && (
          <p>
            <strong>Message:</strong>{" "}
            {swap.message}
          </p>
        )}
      </div>

      {swap.status === "pending" &&
        isReceiver && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAccept}
              className="rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
            >
              Accept
            </button>

            <button
              onClick={handleReject}
              className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        )}

      {swap.status === "accepted" && (
  <div className="mt-6 flex gap-3">
    <Link
      to={`/chat/${swap._id}`}
      className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
    >
      Chat with {otherUser.username}
    </Link>

    <button
      onClick={handleComplete}
      className="rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
    >
      Mark Completed
    </button>
  </div>
)}
    </div>
  );
}