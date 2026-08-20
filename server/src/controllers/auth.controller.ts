import { Request, Response } from "express";
import authService from "../services/auth.service";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import {
  sendPasswordResetEmail,
} from "../utils/sendEmail";
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
      password,
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

export const logout = async (
  req: Request,
  res: Response
) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, 
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    /**
     * Do not reveal whether an email exists.
     */
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "A password reset link has been sent.",
      });
    }

    /**
     * Generate random reset token.
     *
     * This token is sent to the user.
     * Only its hash is stored in MongoDB.
     */
    const resetToken =
      crypto.randomBytes(32).toString("hex");

    const hashedToken =
      crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    /**
     * Token expires after 15 minutes.
     */
    const resetPasswordExpires =
      new Date(
        Date.now() + 15 * 60 * 1000
      );

    user.resetPasswordToken =
      hashedToken;

    user.resetPasswordExpires =
      resetPasswordExpires;

    await user.save();

    const clientUrl =
      process.env.CLIENT_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${clientUrl}/reset-password/${resetToken}`;

    await sendPasswordResetEmail({
      email: user.email,
      username: user.username,
      resetUrl,
    });

    return res.status(200).json({
      success: true,
      message:
        "A password reset link has been sent.",
    });
  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to process password reset request",
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
   const tokenStr = Array.isArray(token) ? token[0] : token;
    const hashedToken =
      crypto
        .createHash("sha256")
        .update(tokenStr)
        .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired password reset token",
      });
    }

    user.password = await bcrypt.hash(
      password,
      10
    );
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password has been reset successfully",
    });
  } catch (error) {
    console.error(
      "Reset password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to reset password",
    });
  }
};