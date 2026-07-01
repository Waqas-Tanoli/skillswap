import type { Reputation } from "../types";

type Props = {
  reputation: Reputation;
};

export default function ReputationCard({
  reputation,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Reputation
      </h2>

      <div className="space-y-3">
        <p>
          Trust Score:
          <span className="ml-2 font-semibold">
            {reputation.trustScore}
          </span>
        </p>

        <p>
          Reviews:
          <span className="ml-2 font-semibold">
            {reputation.totalReviews}
          </span>
        </p>

        <p>
          Average Rating:
          <span className="ml-2 font-semibold">
            ⭐ {reputation.averageRating}
          </span>
        </p>
      </div>
    </div>
  );
}