
import { Plus } from "lucide-react";
import type { Skill } from "../types";

interface SkillDropdownProps {
  skills: Skill[];
  search: string;
  loading?: boolean;
  selectedSkills: string[];
  onSelect: (skill: Skill) => void;
}

export default function SkillDropdown({
  skills,
  search,
  loading = false,
  selectedSkills,
  onSelect,
}: SkillDropdownProps) {
  const filteredSkills = skills.filter((skill) => {
    const keyword = search.toLowerCase();

    return (
      skill.name.toLowerCase().includes(keyword) ||
      skill.category.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <div className="mt-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">
          Loading skills...
        </p>
      </div>
    );
  }

  if (!search.trim()) {
    return null;
  }

  if (filteredSkills.length === 0) {
    return (
      <div className="mt-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">
          No skills found.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
      {filteredSkills.map((skill) => {
        const alreadySelected =
          selectedSkills.includes(skill._id);

        return (
          <div
            key={skill._id}
            className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-none hover:bg-slate-50"
          >
            <div className="flex flex-col">
              <span className="font-medium text-slate-800">
                {skill.name}
              </span>

              <span className="mt-1 inline-block w-fit rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                {skill.category}
              </span>
            </div>

            <button
              type="button"
              disabled={alreadySelected}
              onClick={() => onSelect(skill)}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                alreadySelected
                  ? "cursor-not-allowed bg-slate-200 text-slate-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Plus size={16} />

              {alreadySelected
                ? "Added"
                : "Add"}
            </button>
          </div>
        );
      })}
    </div>
  );
}