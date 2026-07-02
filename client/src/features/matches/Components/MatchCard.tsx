import { useState } from "react";

import SendSwapModal from "../../swaps/Components/SendSwapModal";

import type { Match } from "../types";

import MatchSkills from "./MatchSkills";

type Props = {
  match: Match;
};

export default function MatchCard({
  match,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {match.user.username}
          </h2>

          <p className="text-slate-500">
            {match.user.email}
          </p>

          {match.user.location && (
            <p className="mt-1 text-sm text-slate-400">
              📍 {match.user.location}
            </p>
          )}
        </div>

        <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          Match Score: {match.score}%
        </div>
      </div>

      {match.user.bio && (
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {match.user.bio}
        </p>
      )}

      <div className="mt-6 space-y-6">
        <MatchSkills
          title="Can Teach You"
          skills={match.user.skillsToTeach}
        />

        <MatchSkills
          title="Wants To Learn"
          skills={match.user.skillsToLearn}
        />
      </div>

      <button
        onClick={() => setOpen(true)}
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Send Swap Request
      </button>

      <SendSwapModal
        match={match}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}