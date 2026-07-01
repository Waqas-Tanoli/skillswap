import  type { Match } from "../types";
import MatchSkills from "./MatchSkills";

type Props = {
  match: Match;
};

export default function MatchCard({
  match,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {match.user.name}
          </h2>

          <p className="text-gray-500">
            {match.user.email}
          </p>
        </div>

        <div className="rounded-full bg-green-100 px-4 py-2 text-green-700">
          Match Score: {match.score}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <MatchSkills
          title="Can Teach You"
          skills={match.teachMatch}
        />

        <MatchSkills
          title="Wants To Learn"
          skills={match.learnMatch}
        />
      </div>

      <button className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">
        Send Swap Request
      </button>
    </div>
  );
}