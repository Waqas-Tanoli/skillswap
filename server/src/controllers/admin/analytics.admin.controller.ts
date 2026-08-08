import User from "../../models/User";
import SwapRequest from "../../models/swapRequest";
import Rating from "../../models/rating";
import Skill from "../../models/skill";


import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";

export const getPlatformAnalytics = async (
  req: AuthRequest,
  res: Response
) => {
  const [
    totalUsers,
    verifiedUsers,
    bannedUsers,

    totalSwaps,
    pendingSwaps,
    acceptedSwaps,
    rejectedSwaps,
    completedSwaps,

    totalRatings,

    totalSkills,

    pendingSkillRequests,

    averageRatingResult,
  ] = await Promise.all([
    User.countDocuments(),

    User.countDocuments({
      isVerified: true,
    }),

    User.countDocuments({
      isBanned: true,
    }),

    SwapRequest.countDocuments(),

    SwapRequest.countDocuments({
      status: "pending",
    }),

    SwapRequest.countDocuments({
      status: "accepted",
    }),

    SwapRequest.countDocuments({
      status: "rejected",
    }),

    SwapRequest.countDocuments({
      status: "completed",
    }),

    Rating.countDocuments(),

    Skill.countDocuments(),

    Skill.countDocuments({
      status: "Pending",
    }),

    Rating.aggregate([
      {
        $group: {
          _id: null,
          average: {
            $avg: "$rating",
          },
        },
      },
    ]),
  ]);

  const averageRating =
    averageRatingResult.length > 0
      ? Number(
          averageRatingResult[0].average.toFixed(1)
        )
      : 0;

  return res.status(200).json({
    success: true,

    data: {
      users: {
        total: totalUsers,
        verified: verifiedUsers,
        banned: bannedUsers,
      },

      swaps: {
        total: totalSwaps,
        pending: pendingSwaps,
        accepted: acceptedSwaps,
        rejected: rejectedSwaps,
        completed: completedSwaps,
      },

      skills: {
        total: totalSkills,
        pendingRequests:
          pendingSkillRequests,
      },

      ratings: {
        total: totalRatings,
        average: averageRating,
      },
    },
  });
};