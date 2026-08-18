import Rating from "../models/rating";
import SwapRequest from "../models/swapRequest";
import User from "../models/User";

export const updateTrustScore = async (
  userId: string
) => {
  /**
   * Get all ratings received by user.
   */
  const ratings = await Rating.find({
    ratedUser: userId,
  });

  /**
   * Calculate average rating.
   */
  const totalRating = ratings.reduce(
    (sum, rating) =>
      sum + rating.rating,
    0
  );

  const averageRating =
    ratings.length > 0
      ? totalRating / ratings.length
      : 0;

  /**
   * Count completed swaps.
   */
  const completedSwaps =
    await SwapRequest.countDocuments({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],

      status: "completed",
    });

  /**
   * Rating component.
   *
   * 5 stars = 100 points.
   */
  const ratingScore =
    averageRating * 20;

  /**
   * Experience component.
   */
  const experienceScore =
    completedSwaps * 2;

  /**
   * Final trust score.
   */
  const calculatedScore =
    ratingScore + experienceScore;

  /**
   * Keep score between 0 and 100.
   */
  const trustScore = Math.min(
    100,
    Math.round(calculatedScore)
  );

  await User.findByIdAndUpdate(
    userId,
    {
      trustScore,
    },
    {
      new: true,
    }
  );

  return trustScore;
};