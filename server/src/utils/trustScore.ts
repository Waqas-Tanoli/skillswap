import Rating from "../models/rating";
import User from "../models/User";

export const updateTrustScore = async (
  userId: string
) => {
  const ratings = await Rating.find({
    ratedUser: userId,
  }).select("rating");

  if (ratings.length === 0) {
    await User.findByIdAndUpdate(userId, {
      trustScore: 0,
    });

    return 0;
  }

  const totalRating = ratings.reduce(
    (sum, rating) =>
      sum + rating.rating,
    0
  );

  const averageRating =
    totalRating / ratings.length;

  const trustScore = Math.round(
    averageRating * 20
  );

  await User.findByIdAndUpdate(userId, {
    trustScore,
  });

  return trustScore;
};