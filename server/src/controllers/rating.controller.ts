import Rating from "../models/rating";
import SwapRequest from "../models/swapRequest";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";
import { updateTrustScore } from "../utils/trustScore";
import { createNotification } from "../utils/createNotification";

export const createRating = async (
  req: AuthRequest,
  res: any
) => {
  const raterId = req.user?.id;
  const { swapId, ratedUser, rating, review } = req.body;

  const swap = await SwapRequest.findById(swapId);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap not found",
    });
  }

  if (swap.status !== "completed") {
    return res.status(400).json({
      success: false,
      message: "You can only rate completed swaps",
    });
  }

  const existing = await Rating.findOne({
    swap: swapId,
    rater: raterId,
  });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "You already rated this swap",
    });
  }

  await Rating.create({
    swap: swapId,
    rater: raterId,
    ratedUser,
    rating,
    review,
  });

  await updateTrustScore(ratedUser);
  await createNotification({
  recipient: ratedUser,
  sender: raterId,

  type: "rating",

  title: "New Review",

  message: "You received a new review.",
});

  return res.status(201).json({
    success: true,
    message: "Rating submitted successfully",
  });
};

// Get all ratings for a user
export const getUserRatings = async (
  req: any,
  res: any
) => {
  const { userId } = req.params;

  const ratings = await Rating.find({
    ratedUser: userId,
  })
    .populate("rater", "username avatar")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: ratings.length,
    data: ratings,
  });
};