import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

// Get current user profile
export const getMe = async (req: AuthRequest, res: any) => {
  const user = await User.findById(req.user?.id).select("-password");

  return res.status(200).json({
    success: true,
    data: user,
  });
};


// Update user profile
export const updateProfile = async (req: AuthRequest, res: any) => {
  const userId = req.user?.id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: req.body,
    },
    { new: true }
  ).select("-password");

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
};

// Get user by ID (admin only) - Get Public user profile
export const getUserById = async (req: any, res: any) => {
  const user = await User.findById(req.params.id).select(
    "-password -email"
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
};


// Search users by skill or location
export const searchUsers = async (req: any, res: any) => {
  const { skill, location } = req.query;

  const query: any = {};

  if (skill) {
    query.$or = [
      { skillsToTeach: { $regex: skill, $options: "i" } },
      { skillsToLearn: { $regex: skill, $options: "i" } },
    ];
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  const users = await User.find(query).select("-password");

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};


// Get all users (admin only)
export const getAllUsers = async (req: any, res: any) => {
  const users = await User.find().select("-password");

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};