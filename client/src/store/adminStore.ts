import { create } from "zustand";

import {
  getAnalytics,
  getUsers,
  toggleBan,
  deleteSwap,
  getSkillRequests,
  approveSkillRequest,
  rejectSkillRequest,
  getAdminSwaps,
  deleteAdminSwap,
} from "../features/admin/api/api";

import type {
  DashboardStats,
  AdminUser,
  AdminSkillRequest,
  AdminSwap,
  SwapStatus,
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
  swaps: AdminSwap[];
swapsLoading: boolean;
swapsError: string | null;



  // Actions
  fetchAnalytics: () => Promise<void>;

  fetchUsers: () => Promise<void>;

  banOrUnbanUser: (id: string) => Promise<void>;

  deleteSwap: (id: string) => Promise<void>;

  fetchSkillRequests: () => Promise<void>;

  approveSkillRequest: (id: string) => Promise<void>;

  rejectSkillRequest: (id: string, reason: string) => Promise<void>;
  fetchSwaps: (
  status?: SwapStatus,
  search?: string
) => Promise<void>;

removeSwap: (id: string) => Promise<void>;
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
  swaps: [],
swapsLoading: false,
swapsError: null,

fetchSwaps: async (
  status,
  search
) => {
  set({
    swapsLoading: true,
    swapsError: null,
  });

  try {
    const swaps = await getAdminSwaps(
      status,
      search
    );

    set({
      swaps,
      swapsLoading: false,
    });
  } catch (error) {
    console.error(
      "Failed to fetch admin swaps:",
      error
    );

    set({
      swapsLoading: false,
      swapsError:
        "Failed to load swap requests.",
    });

    throw error;
  }
},

removeSwap: async (id) => {
  try {
    await deleteAdminSwap(id);

    set((state) => ({
      swaps: state.swaps.filter(
        (swap) => swap._id !== id
      ),
    }));
  } catch (error) {
    console.error(
      "Failed to delete admin swap:",
      error
    );

    throw error;
  }
},
}));
