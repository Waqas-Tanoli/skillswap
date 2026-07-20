import { create } from "zustand";

import {
  getMe,
  logoutUser,
} from "../features/auth/api";

import { useNotificationStore } from "./notificationStore";

interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;

  loading: boolean;

  setUser: (user: User | null) => void;

  initializeAuth: () => Promise<void>;

  logout: () => Promise<void>;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    loading: true,

    setUser: (user) =>
      set({ user }),

    initializeAuth: async () => {
      try {
        const res = await getMe();

        const apiUser = res.data.data;

        const user: User = {
          id: apiUser._id,
          username: apiUser.username,
          email: apiUser.email,
          role: apiUser.role,
        };

        set({
          user,
          loading: false,
        });
      } catch (error) {
        console.error(error);

        set({
          user: null,
          loading: false,
        });
      }
    },

    logout: async () => {
      try {
        await logoutUser();
      } catch (error) {
        console.error(error);
      } finally {
        useNotificationStore
          .getState()
          .clearNotifications();

        set({
          user: null,
          loading: false,
        });
      }
    },
  }));