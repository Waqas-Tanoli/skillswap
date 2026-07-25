import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";

// Get current user profile
export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.id)
  .populate("skillsToTeach.skill", "name category")
  .populate("skillsToLearn.skill", "name category")
  .select("-password");

  return res.status(200).json({
    success: true,
    data: user,
  });
};


// Update user profile
export const updateProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
const {
  username,
  bio,
  location,
  avatar,
  skillsToTeach,
  skillsToLearn,
} = req.body;

const updatedUser = await User.findByIdAndUpdate(
  userId,
  {
    username,
    bio,
    location,
    avatar,
    skillsToTeach,
    skillsToLearn,
  },
  {
    returnDocument: "after",
    runValidators: true,
  }
)
.populate("skillsToTeach.skill", "name category")
.populate("skillsToLearn.skill", "name category")
.select("-password");
  

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
};

// Get user by ID (admin only) - Get Public user profile
export const getUserById = async (req: any, res: Response) => {
  const user = await User.findById(req.params.id)
  .populate("skillsToTeach.skill", "name category")
  .populate("skillsToLearn.skill", "name category")
  .select(
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
export const searchUsers = async (
  req: AuthRequest,
  res: Response
) => {
  const { skill, location } = req.query;

  const query: any = {};

  if (skill) {
    query.$or = [
      { "skillsToTeach.skill": skill },
      { "skillsToLearn.skill": skill },
    ];
  }

  if (location) {
    query.location = {
      $regex: location,
      $options: "i",
    };
  }

  const users = await User.find(query)
    .populate("skillsToTeach.skill", "name category")
    .populate("skillsToLearn.skill", "name category")
    .select("-password");

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};


// Get all users (admin only)
export const getAllUsers = async (
  req: AuthRequest,
  res: Response
) => {
  const users = await User.find()
    .populate("skillsToTeach.skill", "name category")
    .populate("skillsToLearn.skill", "name category")
    .select("-password");

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};