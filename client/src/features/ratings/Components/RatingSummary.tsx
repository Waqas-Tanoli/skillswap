import RatingStars from "./RatingStars";
import type { RatingSummary as RatingSummaryType } from "../types";

interface Props {
  summary: RatingSummaryType;
}

export default function RatingSummary({
  summary,
}: Props) {
  const {
    averageRating,
    totalRatings,
    distribution,
  } = summary;

  const getPercentage = (
    count: number
  ) => {
    if (totalRatings === 0) {
      return 0;
    }

    return Math.round(
      (count / totalRatings) * 100
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        {/* Average */}
        <div className="flex flex-col items-center justify-center border-b border-slate-200 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
          <div className="text-4xl font-bold text-slate-900">
            {averageRating.toFixed(1)}
          </div>

          <div className="mt-2">
            <RatingStars
              value={Math.round(
                averageRating
              )}
              readonly
              size={22}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {totalRatings}{" "}
            {totalRatings === 1
              ? "review"
              : "reviews"}
          </p>
        </div>

        {/* Distribution */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(
            (star) => {
              const count =
                distribution[
                  star as 1 | 2 | 3 | 4 | 5
                ];

              const percentage =
                getPercentage(count);

              return (
                <div
                  key={star}
                  className="flex items-center gap-3"
                >
                  <span className="w-12 text-sm text-slate-600">
                    {star} star
                  </span>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right text-xs text-slate-500">
                    {count}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}