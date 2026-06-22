import { Response } from "express";

import User from "../models/User";
import SwapRequest from "../models/swapRequest";
import Rating from "../models/rating";
import Notification from "../models/notification";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDashboard = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.user?.id;

  const user = await User.findById(userId)
    .select(
      "name email avatar trustScore skillsToTeach skillsToLearn"
    )
    .populate("skillsToTeach.skill", "name category")
    .populate("skillsToLearn.skill", "name category");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const [
    totalSwaps,
    pendingSwaps,
    acceptedSwaps,
    completedSwaps,
    ratings,
    notifications,
  ] = await Promise.all([
    SwapRequest.countDocuments({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    }),

    SwapRequest.countDocuments({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
      status: "pending",
    }),

    SwapRequest.countDocuments({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
      status: "accepted",
    }),

    SwapRequest.countDocuments({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
      status: "completed",
    }),

    Rating.find({
      ratedUser: userId,
    }),

    Notification.find({
      recipient: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("sender", "name avatar"),
  ]);

  const averageRating =
    ratings.length > 0
      ? Number(
          (
            ratings.reduce(
              (sum, rating) => sum + rating.rating,
              0
            ) / ratings.length
          ).toFixed(1)
        )
      : 0;

  return res.status(200).json({
    success: true,

    data: {
      user,

      statistics: {
        totalSwaps,
        pendingSwaps,
        acceptedSwaps,
        completedSwaps,
      },

      reputation: {
        trustScore: user.trustScore,
        totalReviews: ratings.length,
        averageRating,
      },

      recentNotifications: notifications,
    },
  });
};