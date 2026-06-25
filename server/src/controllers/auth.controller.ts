import { Request, Response } from "express";
import authService from "../services/auth.service";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, email, password } = req.body;

    const result = await authService.register(
      username,
      email,
      password
    );

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });

    return res.status(201).json({
      success: true,
      data: {
        user: result.user,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Registration failed",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(
      email,
      password
    );

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      success: true,
      data: {
        user: result.user,
      },
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const me = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(
      req.user?.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch {
    return res.status(500).json({
      success: false,
    });
  }
};

export const logout = (
  req: Request,
  res: Response
) => {
  res.clearCookie("token");

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};