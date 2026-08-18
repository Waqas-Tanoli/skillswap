import RatingStars from "./RatingStars";
import type { Rating } from "../types";

interface Props {
  rating: Rating;
}

export default function RatingCard({
  rating,
}: Props) {
  const rater =
    typeof rating.rater === "string"
      ? null
      : rating.rater;

  const reviewerName =
    rater?.username ?? "Anonymous User";

  const avatar = rater?.avatar;

  const formattedDate =
    rating.createdAt
      ? new Date(
          rating.createdAt
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        {/* Reviewer */}
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={reviewerName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
              {reviewerName
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <div>
            <h4 className="font-semibold text-slate-900">
              {reviewerName}
            </h4>

            <p className="text-xs text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Rating */}
        <RatingStars
          value={rating.rating}
          readonly
          size={18}
        />
      </div>

      {/* Review */}
      {rating.review && (
        <p className="mt-4 text-sm leading-6 text-slate-600">
          "{rating.review}"
        </p>
      )}
    </div>
  );
}