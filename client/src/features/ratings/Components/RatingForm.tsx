import { useState } from "react";
import RatingStars from "./RatingStars";


interface Props {
  ratedUserName: string;
  loading?: boolean;
  onSubmit: (
    rating: number,
    review: string
  ) => Promise<void> | void;
  onCancel?: () => void;
}

export default function RatingForm({
  ratedUserName,
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (review.length > 1000) {
      setError(
        "Review cannot exceed 1000 characters."
      );
      return;
    }

    try {
      await onSubmit(
        rating,
        review.trim()
      );

      setRating(0);
      setReview("");
    } catch {
      // Store/API error is handled by the parent.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Rate {ratedUserName}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Share your experience with this
          skill exchange.
        </p>
      </div>

      {/* Rating */}
      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Your Rating
        </label>

        <RatingStars
          value={rating}
          onChange={setRating}
          size={30}
        />

        {rating > 0 && (
          <p className="mt-2 text-sm text-slate-500">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>
        )}
      </div>

      {/* Review */}
      <div>
        <label
          htmlFor="rating-review"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Review
        </label>

        <textarea
          id="rating-review"
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
          rows={5}
          maxLength={1000}
          placeholder="Tell others about your experience..."
          className="w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-1 text-right text-xs text-slate-400">
          {review.length}/1000
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </div>
    </form>
  );
}