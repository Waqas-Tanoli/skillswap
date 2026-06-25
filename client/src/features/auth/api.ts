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

export const logout = () =>
  api.post("/auth/logout");