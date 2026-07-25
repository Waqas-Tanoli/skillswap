import { useState } from "react";
import type { UserProfile } from "../types";

interface Props {
  profile: UserProfile;
  onSubmit: (data: Partial<UserProfile>) => void;
  loading: boolean;
}

export default function ProfileForm({ profile, onSubmit, loading }: Props) {
  const [form, setForm] = useState({
    username: profile.username,

    bio: profile.bio,

    location: profile.location,

    skillsToTeach: profile.skillsToTeach,

    skillsToLearn: profile.skillsToLearn,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
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
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label>Username</label>

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label>Bio</label>

        <textarea
          name="bio"
          rows={4}
          value={form.bio}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label>Location</label>

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border p-3"
        />
      </div>

      <button
        disabled={loading}
        className="rounded-xl bg-slate-900 px-6 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
