import User from "../../models/User";
import SwapRequest from "../../models/swapRequest";
import Rating from "../../models/rating";
import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";

export const getPlatformAnalytics = async (
  req: AuthRequest,
  res: Response
) => {
  const [
    totalUsers,
    totalSwaps,
    completedSwaps,
    totalRatings,
    bannedUsers,
  ] = await Promise.all([
    User.countDocuments(),
    SwapRequest.countDocuments(),
    SwapRequest.countDocuments({
      status: "completed",
    }),
    Rating.countDocuments(),
    User.countDocuments({ isBanned: true }),
  ]);

  return res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalSwaps,
      completedSwaps,
      totalRatings,
      bannedUsers,
    },
  });
};

