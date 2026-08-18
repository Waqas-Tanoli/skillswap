import { useState } from "react";

import {
  acceptSwap,
  rejectSwap,
  completeSwap,
} from "../api";

import type { Swap } from "../types";

import { useAuthStore } from "../../../store/authStore";

import SwapStatusBadge from "./SwapStatusBadge";

import RatingModal from "../../ratings/Components/RatingModal";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/getErrorMessage";

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

  const [showRatingModal, setShowRatingModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const isReceiver =
    swap.receiver._id === user?.id;

  const otherUser =
    swap.sender._id === user?.id
      ? swap.receiver
      : swap.sender;

  const handleAccept = async () => {
    try {
      setLoading(true);

      await acceptSwap(swap._id);

      toast.success(
        "Swap request accepted"
      );

      refetch();
    } catch (error: unknown) {
      console.error(error);

      toast.error(
        getErrorMessage(error) ??
          "Failed to accept swap"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);

      await rejectSwap(swap._id);

      toast.success(
        "Swap request rejected"
      );

      refetch();
    } catch (error: unknown) {
      console.error(error);

      toast.error(
        getErrorMessage(error) ??
          "Failed to reject swap"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      setLoading(true);

      await completeSwap(swap._id);

      toast.success(
        "Swap marked as completed"
      );

      refetch();
    } catch (error: unknown) {
      console.error(error);

      toast.error(
        getErrorMessage(error) ??
          "Failed to complete swap"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {swap.sender.username} →{" "}
            {swap.receiver.username}
          </h2>

          <SwapStatusBadge
            status={swap.status}
          />
        </div>

        {/* Swap Information */}
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

        {/* Pending */}
        {swap.status === "pending" &&
          isReceiver && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAccept}
                disabled={loading}
                className="rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : "Accept"}
              </button>

              <button
                onClick={handleReject}
                disabled={loading}
                className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : "Reject"}
              </button>
            </div>
          )}

        {/* Accepted */}
        {swap.status === "accepted" && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/chat/${swap._id}`}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
            >
              Chat with{" "}
              {otherUser.username}
            </Link>

            <button
              onClick={handleComplete}
              disabled={loading}
              className="rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : "Mark Completed"}
            </button>
          </div>
        )}

        {/* Completed */}
        {swap.status === "completed" && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-green-600">
              ✓ Swap completed
            </span>

            <button
              type="button"
              onClick={() =>
                setShowRatingModal(true)
              }
              className="rounded-xl bg-yellow-500 px-5 py-2 font-medium text-white transition hover:bg-yellow-600"
            >
              ⭐ Rate{" "}
              {otherUser.username}
            </button>
          </div>
        )}

        {/* Rejected */}
        {swap.status === "rejected" && (
          <div className="mt-6">
            <span className="text-sm font-medium text-red-500">
              This swap request was
              rejected.
            </span>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() =>
          setShowRatingModal(false)
        }
        swapId={swap._id}
        ratedUserId={otherUser._id}
        ratedUsername={
          otherUser.username
        }
        onSuccess={refetch}
      />
    </>
  );
}