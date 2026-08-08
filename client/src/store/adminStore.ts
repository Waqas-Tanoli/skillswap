import { create } from "zustand";

import {
  getAnalytics,
  getUsers,
  toggleBan,
  deleteSwap,
} from "../features/admin/api/api";

import type {
  DashboardStats,
  AdminUser,
} from "../features/admin/types";

interface AdminState {
  loading: boolean;

  analytics: DashboardStats | null;

  users: AdminUser[];

  fetchAnalytics: () => Promise<void>;

  fetchUsers: () => Promise<void>;

  banOrUnbanUser: (id: string) => Promise<void>;

  removeSwap: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  loading: false,

  analytics: null,

  users: [],

  fetchAnalytics: async () => {
    set({ loading: true });

    try {
      const analytics = await getAnalytics();

      set({
        analytics,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({
        loading: false,
      });
    }
  },

  fetchUsers: async () => {
    set({ loading: true });

    try {
      const users = await getUsers();

      set({
        users,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({
        loading: false,
      });
    }
  },

banOrUnbanUser: async (id: string) => {
  try {
    await toggleBan(id);

    const updatedUsers = get().users.map(
      (user) => {
        if (user._id !== id) {
          return user;
        }

        return {
          ...user,
          isBanned: !user.isBanned,
        };
      }
    );

    set({
      users: updatedUsers,
    });
  } catch (error) {
    console.error(
      "Failed to update user ban status:",
      error
    );

    throw error;
  }
},

  removeSwap: async (id: string) => {
    try {
      await deleteSwap(id);

    } catch (error) {
      console.error(error);
    }
  },
}));