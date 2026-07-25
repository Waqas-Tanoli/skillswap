import { create } from "zustand";

import {
  getMyProfile,
  updateProfile,
} from "../features/profile/api";

import type {
  UserProfile,
} from "../features/profile/types";
import { toast } from "react-toastify";

interface ProfileState {
  profile: UserProfile | null;

  loading: boolean;

  fetchProfile: () => Promise<void>;

  saveProfile: (
    data: Partial<UserProfile>
  ) => Promise<void>;
}

export const useProfileStore =
  create<ProfileState>((set) => ({
    profile: null,

    loading: false,

    fetchProfile: async () => {
      set({ loading: true });

      try {
        const profile =
          await getMyProfile();

        set({
          profile,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    saveProfile: async (data) => {

    set({
        loading:true
    });

    try{

        const profile =
            await updateProfile(data);

        set({
            profile
        });

        toast.success(
            "Profile updated successfully"
        );

    }catch(error){

        console.error(error);

        toast.error(
            "Failed to update profile"
        );

    }finally{

        set({
            loading:false
        });

    }

},
  }));