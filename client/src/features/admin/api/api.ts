
import api from "../../../services/api";
import type {
  DashboardStats,
  AdminUser,
  AdminSkillRequest,
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
export const getSkillRequests =
  async (): Promise<AdminSkillRequest[]> => {
    const res = await api.get(
      "/skills/requests"
    );

    return res.data.data;
  };

export const approveSkillRequest = async (id: string) => {
  const res = await api.patch(`/skills/${id}/approve`);

  return res.data;
};

export const rejectSkillRequest = async (
  id: string,
  reason?: string
) => {
  const res = await api.delete(`/skills/${id}/reject`, {
    data: {
      reason,
    },
  });

  return res.data;
};