import { Request, Response } from "express";
import authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const result = await authService.register(username, email, password);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};