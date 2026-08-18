import { Response } from "express";

import Rating from "../models/rating";
import SwapRequest from "../models/swapRequest";
import User from "../models/User";

import { AuthRequest } from "../middleware/auth.middleware";
import { updateTrustScore } from "../utils/trustScore";
import { createNotification } from "../utils/createNotification";

/**
 * Create Rating
 *
 * Only participants of a completed swap can rate each other.
 */
export const createRating = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const raterId = req.user?.id;

    const {
      swapId,
      ratedUser,
      rating,
      review,
    } = req.body;

    if (!raterId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Prevent self-rating
    if (raterId === ratedUser) {
      return res.status(400).json({
        success: false,
        message: "You cannot rate yourself",
      });
    }

    /**
     * Find swap
     */
    const swap = await SwapRequest.findById(
      swapId
    );

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap not found",
      });
    }

    /**
     * Only completed swaps can be rated.
     */
    if (swap.status !== "completed") {
      return res.status(400).json({
        success: false,
        message:
          "You can only rate completed swaps",
      });
    }

    /**
     * Make sure the current user
     * participated in this swap.
     */
    const isParticipant =
      swap.sender.toString() === raterId ||
      swap.receiver.toString() === raterId;

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message:
          "You are not a participant of this swap",
      });
    }

    /**
     * The person being rated must be
     * the other participant.
     */
    const isRatedUserParticipant =
      swap.sender.toString() === ratedUser ||
      swap.receiver.toString() === ratedUser;

    if (!isRatedUserParticipant) {
      return res.status(400).json({
        success: false,
        message:
          "The rated user is not part of this swap",
      });
    }

    /**
     * Make sure user is rating the OTHER participant.
     */
    const otherParticipant =
      swap.sender.toString() === raterId
        ? swap.receiver.toString()
        : swap.sender.toString();

    if (otherParticipant !== ratedUser) {
      return res.status(400).json({
        success: false,
        message:
          "You can only rate the other participant",
      });
    }

    /**
     * Prevent duplicate rating.
     */
    const existing = await Rating.findOne({
      swap: swapId,
      rater: raterId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "You already rated this swap",
      });
    }

    /**
     * Verify rated user exists.
     */
    const user = await User.findById(
      ratedUser
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Rated user not found",
      });
    }

    /**
     * Create rating.
     */
    const newRating = await Rating.create({
      swap: swapId,
      rater: raterId,
      ratedUser,
      rating,
      review: review ?? "",
    });

    /**
     * Recalculate trust score.
     */
    await updateTrustScore(ratedUser);

    /**
     * Notify rated user.
     */
    await createNotification({
      recipient: ratedUser,
      sender: raterId,

      type: "rating",

      title: "New Review",

      message:
        "You received a new review from a completed skill swap.",
    });

    return res.status(201).json({
      success: true,
      message:
        "Rating submitted successfully",
      data: newRating,
    });
  } catch (error) {
    console.error(
      "Create rating error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create rating",
    });
  }
};

/**
 * Get all ratings for a user
 */
export const getUserRatings = async (
  req: any,
  res: any
) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({
      ratedUser: userId,
    })
      .populate(
        "rater",
        "username avatar"
      )
      .populate(
        "swap",
        "status skillOffered skillRequested"
      )
      .populate(
        "swap.skillOffered",
        "name category"
      )
      .populate(
        "swap.skillRequested",
        "name category"
      )
      .sort({
        createdAt: -1,
      });

    const totalRatings = ratings.length;

    const totalScore = ratings.reduce(
      (sum, rating) =>
        sum + rating.rating,
      0
    );

    const averageRating =
      totalRatings > 0
        ? Number(
            (totalScore / totalRatings).toFixed(1)
          )
        : 0;

    const distribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    ratings.forEach((rating) => {
      distribution[
        rating.rating as 1 | 2 | 3 | 4 | 5
      ]++;
    });

    return res.status(200).json({
      success: true,

      count: totalRatings,

      data: ratings,

      summary: {
        averageRating,

        totalRatings,

        distribution,
      },
    });
  } catch (error) {
    console.error(
      "Failed to fetch user ratings:",
      error
    );

    return res.status(500).json({
      success: false,

      message: "Failed to fetch ratings",
    });
  }
};

/**
 * Get rating summary for a user
 */
export const getUserRatingSummary = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({
      ratedUser: userId,
    }).select("rating");

    const totalRatings = ratings.length;

    const totalStars = ratings.reduce(
      (sum, rating) =>
        sum + rating.rating,
      0
    );

    const averageRating =
      totalRatings > 0
        ? Number(
            (totalStars / totalRatings).toFixed(
              1
            )
          )
        : 0;

    const ratingDistribution = {
      5: ratings.filter(
        (r) => r.rating === 5
      ).length,

      4: ratings.filter(
        (r) => r.rating === 4
      ).length,

      3: ratings.filter(
        (r) => r.rating === 3
      ).length,

      2: ratings.filter(
        (r) => r.rating === 2
      ).length,

      1: ratings.filter(
        (r) => r.rating === 1
      ).length,
    };

    return res.status(200).json({
      success: true,

      data: {
        totalRatings,
        averageRating,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error(
      "Get rating summary error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch rating summary",
    });
  }
};