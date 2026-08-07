import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { requestSkill } from "../api";

interface Props {
  open: boolean;
  skillName: string;
  existingSkills: string[];
  onClose: () => void;
  onSuccess?: () => void;
}
const categories = [
  "IT",
  "Design",
  "Business",
  "Marketing",
  "Music",
  "Language",
  "Lifestyle",
  "Education",
  "Photography",
  "Other",
];

export default function RequestSkillModal({
  open,
  skillName,
  existingSkills,
  onClose,
  onSuccess,
}: Props) {
  const [category, setCategory] =
    useState("IT");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

 const handleSubmit = async () => {
  if (isInvalid) return;

  try {
    setLoading(true);

    await requestSkill({
      name: normalizedSkill,
      category,
    });

    toast.success(
      "Skill request submitted successfully."
    );

    onSuccess?.();

    onClose();
  } catch (error: unknown) {
    toast.error(
      (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Failed to submit request."
    );
  } finally {
    setLoading(false);
  }
};
const normalizedSkill = skillName.trim();

const alreadyExists = existingSkills.some(
  (skill) =>
    skill.trim().toLowerCase() ===
    normalizedSkill.toLowerCase()
);

const isInvalid =
  normalizedSkill.length < 2 || alreadyExists;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Request New Skill
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              This skill will be reviewed by an
              administrator before it becomes
              available.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Skill Name
            </label>

            <input
              value={skillName}
              disabled
              className="w-full rounded-xl border bg-slate-100 px-4 py-3 text-slate-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-5 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading || isInvalid}
            onClick={handleSubmit}
            className="rounded-xl bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {loading
              ? "Submitting..."
              : "Request Skill"}
              {alreadyExists && (
  <p className="mt-2 text-sm text-red-600">
    This skill already exists.
  </p>
)}
          </button>

        </div>
      </div>
    </div>
  );
}