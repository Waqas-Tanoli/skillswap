import type { UserSkill } from "../types";

interface Props {
  title: string;
  skills: UserSkill[];
}

export default function SkillsCard({
  title,
  skills,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold">

        {title}

      </h2>

      <div className="space-y-3">

        {skills.length === 0 && (

          <p className="text-slate-400">

            No skills added.

          </p>

        )}

        {skills.map((item) => (

          <div
            key={item.skill._id}
            className="flex items-center justify-between rounded-lg border p-3"
          >

            <div>

              <p className="font-medium">

                {item.skill.name}

              </p>

              <p className="text-sm text-slate-500">

                {item.skill.category}

              </p>

            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

              {item.level}

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}