import type { UserSkill } from "../types";

type Props = {
  title: string;
  skills: UserSkill[];
};

export default function MatchSkills({
  title,
  skills,
}: Props) {
  if (!skills.length) {
    return (
      <div>
        <h3 className="mb-2 font-semibold text-slate-800">
          {title}
        </h3>

        <p className="text-sm text-slate-500">
          No overlapping skills
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-3 font-semibold text-slate-800">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((item) => (
          <span
            key={item._id}
            className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
          >
            {item.skill.name}
            <span className="ml-1 text-blue-500">
              • {item.level}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}