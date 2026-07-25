import type { UserProfile } from "../types";


interface Props {
  profile: UserProfile;
}

export default function ProfileStats({
  profile,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">

      <Stat
        title="Trust Score"
        value={profile.trustScore.toFixed(1)}
      />

      <Stat
        title="Teach Skills"
        value={profile.skillsToTeach.length}
      />

      <Stat
        title="Learn Skills"
        value={profile.skillsToLearn.length}
      />

    </div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm text-center">

      <p className="text-3xl font-bold">

        {value}

      </p>

      <p className="mt-2 text-sm text-slate-500">

        {title}

      </p>

    </div>
  );
}