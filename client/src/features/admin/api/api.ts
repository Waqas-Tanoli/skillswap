
import api from "../../../services/api";
import type {
  DashboardStats,
  AdminUser,
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