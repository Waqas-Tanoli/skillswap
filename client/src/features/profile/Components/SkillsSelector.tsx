import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Skill, UserSkill } from "../types";
import { useSkillStore } from "../../../store/skillStore";
import SkillDropdown from "./SkillDropDown";
import SkillChip from "./SkillChip";
import LevelSelect from "./LevelSelect";



interface Props {
  title: string;
  value: UserSkill[];
  onChange: (skills: UserSkill[]) => void;
}

type SkillLevel = "beginner" | "intermediate" | "advanced";

export default function SkillSelector({ title, value, onChange }: Props) {
  const { skills, loading, fetchSkills } = useSkillStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  /**
   * Returns only the selected skill ids.
   * Works whether skill is populated or only an ObjectId string.
   */
  const selectedSkillIds = useMemo(() => {
    return value.map((item) =>
      typeof item.skill === "string" ? item.skill : item.skill._id
    );
  }, [value]);

  /**
   * Get skill object from id or return undefined
   */
  const getSkillById = (skillId: string): Skill | undefined => {
    return skills.find((s) => s._id === skillId);
  };

  /**
   * Get skill id from UserSkill
   */
  const getSkillId = (userSkill: UserSkill): string => {
    return typeof userSkill.skill === "string" ? userSkill.skill : userSkill.skill._id;
  };

  /**
   * Check if skill is already selected
   */
  const isSkillSelected = (skillId: string): boolean => {
    return selectedSkillIds.includes(skillId);
  };

  /**
   * Add skill
   */
  const handleAddSkill = (skill: Skill) => {
    if (isSkillSelected(skill._id)) {
      return;
    }

    onChange([
      ...value,
      {
        skill,
        level: "beginner",
      },
    ]);

    setSearch("");
  };

  /**
   * Remove skill
   */
  const handleRemoveSkill = (skillId: string) => {
    onChange(value.filter((item) => getSkillId(item) !== skillId));
  };

  /**
   * Update level
   */
  const handleLevelChange = (skillId: string, level: SkillLevel) => {
    onChange(
      value.map((item) => {
        if (getSkillId(item) !== skillId) {
          return item;
        }

        return {
          ...item,
          level,
        };
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* Title and Search Section */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {title}
        </label>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            placeholder="Search skills..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <SkillDropdown
          skills={skills}
          loading={loading}
          search={search}
          selectedSkills={selectedSkillIds}
          onSelect={handleAddSkill}
        />
      </div>

      {/* Selected Skills */}
      <div className="space-y-3">
        {value.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-sm text-slate-500">
            No skills selected yet.
          </div>
        )}

        {value.map((item) => {
          const skillId = getSkillId(item);
          const skill = typeof item.skill === "string" ? getSkillById(item.skill) : item.skill;

          if (!skill) {
            return null;
          }
console.log("Rendering skill:", skillId, skill.name, "with level:", item.level);
          return (
            <div
              key={skill._id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between"
            >
              <SkillChip
                label={skill.name}
                level={item.level}
                onRemove={() => handleRemoveSkill(skill._id)}
              />

              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Level</span>

                <LevelSelect
                  value={item.level}
                  onChange={(level) => handleLevelChange(skill._id, level)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {value.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-sm text-slate-600">
            {value.length} {value.length === 1 ? "skill" : "skills"} selected
          </span>

          <span className="text-xs text-slate-500">
            Click the × icon to remove a skill.
          </span>
        </div>
      )}
    </div>
  );
}