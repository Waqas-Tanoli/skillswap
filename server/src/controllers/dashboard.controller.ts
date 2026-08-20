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
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId)
      .select(
        "username email avatar trustScore skillsToTeach skillsToLearn"
      )
      .populate(
        "skillsToTeach.skill",
        "name category"
      )
      .populate(
        "skillsToLearn.skill",
        "name category"
      );

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
      }).select("rating"),

      Notification.find({
        recipient: userId,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate(
          "sender",
          "username avatar"
        ),
    ]);

    /**
     * Calculate average rating
     */
    const totalReviews = ratings.length;

    const totalRatingPoints = ratings.reduce(
      (sum, rating) =>
        sum + rating.rating,
      0
    );

    const averageRating =
      totalReviews > 0
        ? Number(
            (
              totalRatingPoints /
              totalReviews
            ).toFixed(1)
          )
        : 0;

    /**
     * Trust Score
     *
     * 5 stars  = 100
     * 4 stars  = 80
     * 3 stars  = 60
     * 2 stars  = 40
     * 1 star   = 20
     *
     * Based on the average received rating.
     */
    const trustScore =
      totalReviews > 0
        ? Math.round(
            averageRating * 20
          )
        : 0;

    /**
     * Keep User.trustScore synchronized
     * with the calculated value.
     */
    if (user.trustScore !== trustScore) {
      await User.findByIdAndUpdate(
        userId,
        {
          trustScore,
        }
      );

      user.trustScore = trustScore;
    }

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
          trustScore,
          totalReviews,
          averageRating,
        },

        recentNotifications:
          notifications,
      },
    });
  } catch (error) {
    console.error(
      "Get dashboard error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard",
    });
  }
};