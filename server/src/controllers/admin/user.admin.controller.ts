import User from "../../models/User";
import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import swapRequest from "../../models/swapRequest";

//Get all users (admin only)    
export const getAllUsersAdmin = async (
  req: AuthRequest,
  res: Response
) => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

//Ban a user (admin only)
export const toggleBanUser = async (
  req: AuthRequest,
  res: Response
) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.isBanned = !user.isBanned;

  await user.save();

  return res.status(200).json({
    success: true,
    message: `User ${
      user.isBanned ? "banned" : "unbanned"
    } successfully`,
    data: user,
  });
};

// Delete swap

export const deleteSwap = async (
  req: AuthRequest,
  res: Response
) => {
  const swap = await swapRequest.findById(req.params.id);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap not found",
    });
  }

  await swap.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Swap deleted successfully",
  });
};