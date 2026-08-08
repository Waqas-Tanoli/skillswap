import api from "../../../services/api";
import type {
  DashboardStats,
  AdminUser,
  AdminSkillRequest,
  AdminSwap,
  SwapStatus,
} from "../types";

export const getAnalytics = async (): Promise<DashboardStats> => {
  const res = await api.get("/admin/analytics");

  return res.data.data;
};

export const getUsers = async (): Promise<AdminUser[]> => {
  const res = await api.get("/admin/users");

  return res.data.data;
};

export const toggleBan = async (id: string) => {
  const res = await api.patch(`/admin/users/${id}/ban`);

  return res.data;
};

export const deleteSwap = async (id: string) => {
  const res = await api.delete(`/admin/swap/${id}`);
  return res.data;
};

//skill request apis
export const getSkillRequests = async (): Promise<AdminSkillRequest[]> => {
  const res = await api.get("/skills/requests");

  return res.data.data;
};

export const approveSkillRequest = async (id: string) => {
  const res = await api.patch(`/skills/${id}/approve`);

  return res.data;
};

export const rejectSkillRequest = async (id: string, reason?: string) => {
  const res = await api.delete(`/skills/${id}/reject`, {
    data: {
      reason,
    },
  });

  return res.data;
};

// ===============================
// Get all admin swaps
// ===============================

export const getAdminSwaps = async (
  status?: SwapStatus,
  search?: string,
): Promise<AdminSwap[]> => {
  const params: Record<string, string> = {};

  if (status) {
    params.status = status;
  }

  if (search?.trim()) {
    params.search = search.trim();
  }

  const response = await api.get("/admin/swaps", {
    params,
  });

  return response.data.data;
};

// ===============================
// Delete swap
// ===============================

export const deleteAdminSwap = async (id: string) => {
  const response = await api.delete(`/admin/swap/${id}`);

  return response.data;
};
