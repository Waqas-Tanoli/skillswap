import zod from "zod";
import {validate} from "../middleware/validate";

export const registerSchema = zod.object({
  username: zod.string().min(3).max(20),
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
});

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
});
export const forgotPasswordSchema =
  zod.object({
    email: zod
      .string()
      .email("Invalid email address"),
  });

export const resetPasswordSchema =
  zod.object({
    password: zod
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      ),
  });

export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);
export const validateForgotPassword = validate(forgotPasswordSchema);
export const validateResetPassword = validate(resetPasswordSchema);