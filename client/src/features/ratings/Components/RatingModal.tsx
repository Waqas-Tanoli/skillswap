import { useState } from "react";
import { Star, X } from "lucide-react";
import { toast } from "react-toastify";

import { createRating } from "../api";
import { getErrorMessage } from "../../../utils/getErrorMessage";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  swapId: string;
  ratedUserId: string;
  ratedUsername: string;
  onSuccess: () => void;
};

export default function RatingModal({
  isOpen,
  onClose,
  swapId,
  ratedUserId,
  ratedUsername,
  onSuccess,
}: Props) {
  const [rating, setRating] =
    useState(0);

  const [hoverRating, setHoverRating] =
    useState(0);

  const [review, setReview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) {
    return null;
  }

 const handleSubmit = async () => {
  if (rating === 0) {
    toast.error("Please select a rating");
    return;
  }

  try {
    setLoading(true);

    await createRating({
      swapId,
      ratedUser: ratedUserId,
      rating,
      review: review.trim(),
    });

    toast.success(
      "Rating submitted successfully"
    );

    onSuccess();
    onClose();

    setRating(0);
    setHoverRating(0);
    setReview("");
  } catch (error: unknown) {
    console.error(
      "Failed to submit rating:",
      error
    );

    toast.error(
      getErrorMessage(error) ??
        "Failed to submit rating"
    );
  } finally {
    setLoading(false);
  }
};

  const handleClose = () => {
    if (loading) return;

    setRating(0);
    setHoverRating(0);
    setReview("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Rate {ratedUsername}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              How was your skill exchange?
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stars */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Your rating
          </p>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(
              (star) => {
                const active =
                  star <=
                  (hoverRating ||
                    rating);

                return (
                  <button
                    key={star}
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      setRating(star)
                    }
                    onMouseEnter={() =>
                      setHoverRating(star)
                    }
                    onMouseLeave={() =>
                      setHoverRating(0)
                    }
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-9 w-9 ${
                        active
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              }
            )}
          </div>

          {rating > 0 && (
            <p className="mt-2 text-sm text-slate-500">
              {rating === 1 &&
                "Poor"}
              {rating === 2 &&
                "Below average"}
              {rating === 3 &&
                "Good"}
              {rating === 4 &&
                "Very good"}
              {rating === 5 &&
                "Excellent"}
            </p>
          )}
        </div>

        {/* Review */}
        <div className="mb-6">
          <label
            htmlFor="review"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Review
            <span className="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <textarea
            id="review"
            value={review}
            onChange={(e) =>
              setReview(
                e.target.value
              )
            }
            maxLength={1000}
            disabled={loading}
            placeholder="Share your experience..."
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

          <div className="mt-1 text-right text-xs text-slate-400">
            {review.length}/1000
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              loading ||
              rating === 0
            }
            className="flex-1 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Submitting..."
              : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
}