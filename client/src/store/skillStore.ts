import { create } from "zustand";

import { getSkills } from "../features/skills/api";

import type { Skill } from "../features/skills/types";

interface SkillState {
  skills: Skill[];

  loading: boolean;

  initialized: boolean;

  fetchSkills: () => Promise<void>;

  clearSkills: () => void;
}

export const useSkillStore =
  create<SkillState>((set, get) => ({
    skills: [],

    loading: false,

    initialized: false,

    fetchSkills: async () => {
      if (get().initialized) {
        return;
      }

      set({
        loading: true,
      });

      try {
        const skills =
          await getSkills();

        set({
          skills,
          initialized: true,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },

    clearSkills: () =>
      set({
        skills: [],
        initialized: false,
      }),
  }));