import api from "../../services/api";
import type {
  LoginDTO,
  RegisterDTO,
} from "../../types/auth";

export const login = (data: LoginDTO) =>
  api.post("/auth/login", data);

export const registerUser = (
  data: RegisterDTO
) =>
  api.post("/auth/register", data);

export const getMe = () =>
  api.get("/auth/me");

export const logoutUser = () =>
  api.post("/auth/logout");

export const forgotPassword = async (
  email: string
) => {
  const response = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};
export const resetPassword = async (
  token: string,
  password: string
) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};