import { create } from "zustand";

import {
  getAnalytics,
  getUsers,
  toggleBan,
  deleteSwap,
  getSkillRequests,
  approveSkillRequest,
  rejectSkillRequest,
} from "../features/admin/api/api";

import type {
  DashboardStats,
  AdminUser,
  AdminSkillRequest,
} from "../features/admin/types";

interface AdminState {
  // Analytics
  analytics: DashboardStats | null;

  // Users
  users: AdminUser[];

  // Skill requests
  skillRequests: AdminSkillRequest[];

  // General loading
  loading: boolean;

  // Skill request loading
  skillRequestsLoading: boolean;

  // Actions
  fetchAnalytics: () => Promise<void>;

  fetchUsers: () => Promise<void>;

  banOrUnbanUser: (id: string) => Promise<void>;

  deleteSwap: (id: string) => Promise<void>;

  fetchSkillRequests: () => Promise<void>;

  approveSkillRequest: (id: string) => Promise<void>;

  rejectSkillRequest: (id: string, reason: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  // Initial State

  analytics: null,

  users: [],

  skillRequests: [],

  loading: false,

  skillRequestsLoading: false,

  // Analytics

  fetchAnalytics: async () => {
    set({
      loading: true,
    });

    try {
      const analytics = await getAnalytics();

      set({
        analytics,
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Users

  fetchUsers: async () => {
    set({
      loading: true,
    });

    try {
      const users = await getUsers();

      set({
        users,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Ban / Unban

  banOrUnbanUser: async (id: string) => {
    try {
      await toggleBan(id);

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id
            ? {
                ...user,
                isBanned: !user.isBanned,
              }
            : user,
        ),
      }));
    } catch (error) {
      console.error("Failed to update user ban status:", error);

      throw error;
    }
  },

  // Delete Swap

  deleteSwap: async (id: string) => {
    try {
      await deleteSwap(id);
    } catch (error) {
      console.error("Failed to delete swap:", error);

      throw error;
    }
  },

  // Skill Requests

  fetchSkillRequests: async () => {
    set({
      skillRequestsLoading: true,
    });

    try {
      const skillRequests = await getSkillRequests();

      set({
        skillRequests,
      });
    } catch (error) {
      console.error("Failed to fetch skill requests:", error);

      throw error;
    } finally {
      set({
        skillRequestsLoading: false,
      });
    }
  },

  // Approve Skill Request

  approveSkillRequest: async (id: string) => {
    try {
      await approveSkillRequest(id);

      set((state) => ({
        skillRequests: state.skillRequests.filter(
          (request) => request._id !== id,
        ),
      }));
    } catch (error) {
      console.error("Failed to approve skill request:", error);

      throw error;
    }
  },

  // Reject Skill Request

  rejectSkillRequest: async (id: string, reason: string) => {
    try {
      await rejectSkillRequest(id, reason);

      set((state) => ({
        skillRequests: state.skillRequests.filter(
          (request) => request._id !== id,
        ),
      }));
    } catch (error) {
      console.error("Failed to reject skill request:", error);

      throw error;
    }
  },
}));
