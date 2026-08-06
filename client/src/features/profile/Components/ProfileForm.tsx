import { useState } from "react";

import type { UserProfile } from "../types";
import SkillSelector from "./SkillsSelector";



interface Props {
  profile: UserProfile;
  onSubmit: (data: Partial<UserProfile>) => void;
  loading: boolean;
}

export default function ProfileForm({
  profile,
  onSubmit,
  loading,
}: Props) {
  const [form, setForm] = useState({
    username: profile.username,
    bio: profile.bio,
    location: profile.location,
    skillsToTeach: profile.skillsToTeach,
    skillsToLearn: profile.skillsToLearn,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,

      skillsToTeach: form.skillsToTeach.map((item) => ({
        skill:
          typeof item.skill === "string"
            ? item.skill
            : item.skill._id,

        level: item.level,
      })),

      skillsToLearn: form.skillsToLearn.map((item) => ({
        skill:
          typeof item.skill === "string"
            ? item.skill
            : item.skill._id,

        level: item.level,
      })),
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-8"
    >
      {/* Username */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Username
        </label>

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Bio
        </label>

        <textarea
          rows={5}
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Location */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Location
        </label>

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Skills To Teach */}
      <SkillSelector
        title="Skills I Can Teach"
        value={form.skillsToTeach}
        onChange={(skills) =>
          setForm((prev) => ({
            ...prev,
            skillsToTeach: skills,
          }))
        }
      />

      {/* Skills To Learn */}
      <SkillSelector
        title="Skills I Want To Learn"
        value={form.skillsToLearn}
        onChange={(skills) =>
          setForm((prev) => ({
            ...prev,
            skillsToLearn: skills,
          }))
        }
      />

      {/* Submit Button */}
      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-8 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}