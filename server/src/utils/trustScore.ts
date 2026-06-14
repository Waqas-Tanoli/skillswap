import Rating from "../models/rating";
import SwapRequest from "../models/swapRequest";
import User from "../models/User";

export const updateTrustScore = async (userId: string) => {
  const ratings = await Rating.find({ ratedUser: userId });

  const avgRating =
    ratings.reduce((acc, r) => acc + r.rating, 0) /
    (ratings.length || 1);

  const completedSwaps = await SwapRequest.countDocuments({
    $or: [{ sender: userId }, { receiver: userId }],
    status: "completed",
  });

  const trustScore = Math.round(
    avgRating * 20 + completedSwaps * 2
  );

  await User.findByIdAndUpdate(userId, {
    trustScore,
  });
};