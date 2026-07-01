import User from "../../models/User";
import SwapRequest from "../../models/swapRequest";
import Rating from "../../models/rating";

export const seedRatings = async () => {
  const existingRatings = await Rating.countDocuments();

  if (existingRatings > 0) {
    console.log("Ratings already seeded");
    return;
  }

  const ali = await User.findOne({
    email: "ali@example.com",
  });

  const sara = await User.findOne({
    email: "sara@example.com",
  });

  if (!ali || !sara) {
    throw new Error(
      "Required users not found. Run seedUsers first."
    );
  }

  const swap = await SwapRequest.findOne({
    sender: ali._id,
    receiver: sara._id,
    status: "completed",
  });

  if (!swap) {
    throw new Error(
      "Completed swap not found. Run seedSwaps first."
    );
  }

  await Rating.insertMany([
    {
      swap: swap._id,

      rater: sara._id,
      ratedUser: ali._id,

      rating: 5,

      review:
        "Ali explained React concepts really well.",
    },

    {
      swap: swap._id,

      rater: ali._id,
      ratedUser: sara._id,

      rating: 5,

      review:
        "Sara helped me understand UI principles.",
    },
  ]);

  console.log("Ratings seeded successfully");
};