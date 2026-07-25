
import api from "../../services/api";
import type { UserProfile } from "./types";

export const getMyProfile = async () => {
  const res = await api.get("/users/me");

  return res.data.data as UserProfile;
};

export const updateProfile = async (
  data: Partial<UserProfile>
) => {
  const res = await api.patch(
    "/users/profile",
    data
  );

  return res.data.data as UserProfile;
};

export const getPublicProfile = async (
  id: string
) => {
  const res = await api.get(
    `/users/${id}`
  );

  return res.data.data as UserProfile;
};