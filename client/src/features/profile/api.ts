
import api from "../../services/api";
import type { UserProfile } from "./types";
import type { SkillRequest } from "./types";

export const getMyProfile = async () => {
  const res = await api.get("/users/me");

  return res.data.data as UserProfile;
};

export const updateProfile = async (
  data: Partial<UserProfile>
) => {
  const res = await api.patch(
    "users/me",
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


//request skill API
export const requestSkill = async (
  data: SkillRequest
) => {
  const res = await api.post(
    "/skills/request",
    data
  );

  return res.data;
};