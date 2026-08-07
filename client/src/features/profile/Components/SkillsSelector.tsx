import { useEffect, useMemo, useState } from "react";
import { Search, PlusCircle } from "lucide-react";

import type { Skill, UserSkill } from "../types";

import { useSkillStore } from "../../../store/skillStore";

import SkillDropdown from "./SkillDropDown";
import SkillChip from "./SkillChip";
import LevelSelect from "./LevelSelect";
import RequestSkillModal from "./RequestSkillModal";

interface Props {
  title: string;
  value: UserSkill[];
  onChange: (skills: UserSkill[]) => void;
}

type SkillLevel = "beginner" | "intermediate" | "advanced";

export default function SkillSelector({ title, value, onChange }: Props) {
  const { skills, loading, fetchSkills } = useSkillStore();

  const [search, setSearch] = useState("");

  const [showRequestModal, setShowRequestModal] = useState(false);

  const [requestedSkill, setRequestedSkill] = useState("");

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  /**
   * Selected skill ids
   */
  const selectedSkillIds = useMemo(() => {
    return value.map((item) =>
      typeof item.skill === "string" ? item.skill : item.skill._id,
    );
  }, [value]);

  /**
   * Skills matching current search
   */
  const normalizedSearch = search.trim().toLowerCase();

  const filteredSkills = useMemo(() => {
    if (!normalizedSearch) return [];

    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(normalizedSearch),
    );
  }, [skills, normalizedSearch]);

  /**
   * Should show request skill section?
   */
  const exactSkillExists = skills.some(
    (skill) => skill.name.trim().toLowerCase() === normalizedSearch,
  );

  const showRequestButton =
    normalizedSearch.length > 1 &&
    filteredSkills.length === 0 &&
    !exactSkillExists;

  const getSkillById = (skillId: string): Skill | undefined => {
    return skills.find((s) => s._id === skillId);
  };

  const getSkillId = (userSkill: UserSkill): string => {
    return typeof userSkill.skill === "string"
      ? userSkill.skill
      : userSkill.skill._id;
  };

  const isSkillSelected = (skillId: string) => {
    return selectedSkillIds.includes(skillId);
  };

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

  const handleRemoveSkill = (skillId: string) => {
    onChange(value.filter((item) => getSkillId(item) !== skillId));
  };

  const handleLevelChange = (skillId: string, level: SkillLevel) => {
    onChange(
      value.map((item) =>
        getSkillId(item) === skillId
          ? {
              ...item,
              level,
            }
          : item,
      ),
    );
  };

  return (
    <>
      <div className="space-y-4">
        {/* Search */}
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
              value={search}
              type="text"
              placeholder="Search skills..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <SkillDropdown
            skills={skills}
            loading={loading}
            search={search}
            selectedSkills={selectedSkillIds}
            onSelect={handleAddSkill}
          />

          {showRequestButton && (
            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                Couldn't find <span className="font-semibold">"{search}"</span>?
              </p>

              <button
                type="button"
                onClick={() => {
                  setRequestedSkill(search);

                  setShowRequestModal(true);
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <PlusCircle size={16} />
                Request New Skill
              </button>
            </div>
          )}
        </div>

        {/* Selected Skills */}

        <div className="space-y-3">
          {value.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-sm text-slate-500">
              No skills selected yet.
            </div>
          )}

          {value.map((item) => {
            // const skillId =
            //   getSkillId(item);

            const skill =
              typeof item.skill === "string"
                ? getSkillById(item.skill)
                : item.skill;

            if (!skill) return null;

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

        {value.length > 0 && (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-sm text-slate-600">
              {value.length} {value.length === 1 ? "skill" : "skills"} selected
            </span>

            <span className="text-xs text-slate-500">Click × to remove.</span>
          </div>
        )}
      </div>

      <RequestSkillModal
        open={showRequestModal}
        skillName={requestedSkill}
        existingSkills={skills.map((s) => s.name)}
        onClose={() => setShowRequestModal(false)}
        onSuccess={() => {
          fetchSkills();
          setSearch("");
        }}
      />
    </>
  );
}
