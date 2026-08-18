import { Response } from "express";
import mongoose from "mongoose";

import Rating from "../models/rating";
import SwapRequest from "../models/swapRequest";
import User from "../models/User";

import { AuthRequest } from "../middleware/auth.middleware";
import { updateTrustScore } from "../utils/trustScore";
import { createNotification } from "../utils/createNotification";

/**
 * Helper to extract string from req.params
 */
const getParamAsString = (param: string | string[]): string => {
  return Array.isArray(param) ? param[0] : param;
};

/**
 * Create Rating
 *
 * Rules:
 * - User must be authenticated.
 * - Swap must exist.
 * - Swap must be completed.
 * - User must be a participant.
 * - User cannot rate themselves.
 * - ratedUser must be the other participant.
 * - User can only rate a swap once.
 * - Rating must be between 1 and 5.
 * - Review cannot exceed 1000 characters.
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

    // -----------------------------------------
    // Authentication
    // -----------------------------------------

    if (!raterId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // -----------------------------------------
    // Required fields
    // -----------------------------------------

    if (!swapId || !ratedUser || rating === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "swapId, ratedUser and rating are required",
      });
    }

    // -----------------------------------------
    // Validate MongoDB IDs
    // -----------------------------------------

    if (
      !mongoose.Types.ObjectId.isValid(swapId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid swap ID",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        ratedUser
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid rated user ID",
      });
    }

    // -----------------------------------------
    // Validate rating
    // -----------------------------------------

    if (
      typeof rating !== "number" ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rating must be an integer between 1 and 5",
      });
    }

    // -----------------------------------------
    // Validate review
    // -----------------------------------------

    if (
      review !== undefined &&
      review !== null &&
      typeof review !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Review must be a string",
      });
    }

    if (
      typeof review === "string" &&
      review.length > 1000
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Review cannot exceed 1000 characters",
      });
    }

    // -----------------------------------------
    // Prevent self-rating
    // -----------------------------------------

    if (raterId === ratedUser) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot rate yourself",
      });
    }

    // -----------------------------------------
    // Find swap
    // -----------------------------------------

    const swap =
      await SwapRequest.findById(swapId);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap not found",
      });
    }

    // -----------------------------------------
    // Only completed swaps can be rated
    // -----------------------------------------

    if (swap.status !== "completed") {
      return res.status(400).json({
        success: false,
        message:
          "You can only rate completed swaps",
      });
    }

    // -----------------------------------------
    // Check rater is a participant
    // -----------------------------------------

    const isSender =
      swap.sender.toString() === raterId;

    const isReceiver =
      swap.receiver.toString() === raterId;

    if (!isSender && !isReceiver) {
      return res.status(403).json({
        success: false,
        message:
          "You are not a participant of this swap",
      });
    }

    // -----------------------------------------
    // Determine the other participant
    // -----------------------------------------

    const otherParticipant = isSender
      ? swap.receiver.toString()
      : swap.sender.toString();

    // -----------------------------------------
    // Make sure ratedUser is the other user
    // -----------------------------------------

    if (otherParticipant !== ratedUser) {
      return res.status(400).json({
        success: false,
        message:
          "You can only rate the other participant",
      });
    }

    // -----------------------------------------
    // Verify rated user exists
    // -----------------------------------------

    const user =
      await User.findById(ratedUser).select(
        "_id username"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Rated user not found",
      });
    }

    // -----------------------------------------
    // Prevent duplicate rating
    // -----------------------------------------

    const existingRating =
      await Rating.findOne({
        swap: swapId,
        rater: raterId,
      });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message:
          "You already rated this swap",
      });
    }

    // -----------------------------------------
    // Create rating
    // -----------------------------------------

    const newRating =
      await Rating.create({
        swap: swapId,
        rater: raterId,
        ratedUser,
        rating,
        review:
          typeof review === "string"
            ? review.trim()
            : "",
      });

    // -----------------------------------------
    // Update trust score
    // -----------------------------------------

    await updateTrustScore(ratedUser);

    // -----------------------------------------
    // Notify rated user
    // -----------------------------------------

    try {
      await createNotification({
        recipient: ratedUser,
        sender: raterId,

        type: "rating",

        title: "New Review",

        message:
          "You received a new review from a completed skill swap.",
      });
    } catch (notificationError) {
      /**
       * Do not fail the rating request
       * if notification creation fails.
       */
      console.error(
        "Rating notification error:",
        notificationError
      );
    }

    // -----------------------------------------
    // Response
    // -----------------------------------------

    return res.status(201).json({
      success: true,

      message:
        "Rating submitted successfully",

      data: newRating,
    });
  } catch (error: any) {
    console.error(
      "Create rating error:",
      error
    );

    // Duplicate index protection
    if (error?.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "You already rated this swap",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to create rating",
    });
  }
};

/**
 * Get all ratings for a user
 *
 * GET /ratings/:userId
 */
export const getUserRatings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const userIdStr = getParamAsString(userId);

    // -----------------------------------------
    // Validate user ID
    // -----------------------------------------

    if (
      !mongoose.Types.ObjectId.isValid(userIdStr)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid user ID",
      });
    }

    // -----------------------------------------
    // Verify user exists
    // -----------------------------------------

    const user =
      await User.findById(userIdStr).select(
        "_id username avatar trustScore"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // -----------------------------------------
    // Get ratings
    // -----------------------------------------

    const ratings =
      await Rating.find({
        ratedUser: userIdStr,
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

    // -----------------------------------------
    // Calculate summary
    // -----------------------------------------

    const totalRatings =
      ratings.length;

    const totalScore =
      ratings.reduce(
        (sum, rating) =>
          sum + rating.rating,
        0
      );

    const averageRating =
      totalRatings > 0
        ? Number(
            (
              totalScore /
              totalRatings
            ).toFixed(1)
          )
        : 0;

    // -----------------------------------------
    // Rating distribution
    // -----------------------------------------

    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    ratings.forEach((rating) => {
      if (
        rating.rating >= 1 &&
        rating.rating <= 5
      ) {
        distribution[
          rating.rating as
            | 1
            | 2
            | 3
            | 4
            | 5
        ]++;
      }
    });

    // -----------------------------------------
    // Response
    // -----------------------------------------

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
      "Get user ratings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch ratings",
    });
  }
};

/**
 * Get rating summary for a user
 *
 * GET /ratings/:userId/summary
 */
export const getUserRatingSummary = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const userIdStr = getParamAsString(userId);

    // -----------------------------------------
    // Validate ID
    // -----------------------------------------

    if (
      !mongoose.Types.ObjectId.isValid(userIdStr)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid user ID",
      });
    }

    // -----------------------------------------
    // Verify user exists
    // -----------------------------------------

    const user =
      await User.findById(userIdStr).select(
        "_id username avatar trustScore"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // -----------------------------------------
    // Get ratings
    // -----------------------------------------

    const ratings =
      await Rating.find({
        ratedUser: userIdStr,
      }).select("rating");

    // -----------------------------------------
    // Calculate average
    // -----------------------------------------

    const totalRatings =
      ratings.length;

    const totalStars =
      ratings.reduce(
        (sum, rating) =>
          sum + rating.rating,
        0
      );

    const averageRating =
      totalRatings > 0
        ? Number(
            (
              totalStars /
              totalRatings
            ).toFixed(1)
          )
        : 0;

    // -----------------------------------------
    // Distribution
    // -----------------------------------------

    const ratingDistribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    ratings.forEach((rating) => {
      if (
        rating.rating >= 1 &&
        rating.rating <= 5
      ) {
        ratingDistribution[
          rating.rating as
            | 1
            | 2
            | 3
            | 4
            | 5
        ]++;
      }
    });

    // -----------------------------------------
    // Response
    // -----------------------------------------

    return res.status(200).json({
      success: true,

      data: {
        user: {
          id: user._id,
          username: user.username,
          avatar: user.avatar,
          trustScore: user.trustScore,
        },

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

/**
 * Check whether the authenticated user
 * can rate a particular swap.
 *
 * GET /ratings/can-rate/:swapId
 */
export const canRateSwap = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const raterId = req.user?.id;
    const { swapId } = req.params;
    const swapIdStr = getParamAsString(swapId);

    if (!raterId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // -----------------------------------------
    // Validate swap ID
    // -----------------------------------------

    if (
      !mongoose.Types.ObjectId.isValid(swapIdStr)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid swap ID",
      });
    }

    // -----------------------------------------
    // Find swap
    // -----------------------------------------

    const swap =
      await SwapRequest.findById(swapIdStr);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap not found",
      });
    }

    // -----------------------------------------
    // Check participation
    // -----------------------------------------

    const isSender =
      swap.sender.toString() === raterId;

    const isReceiver =
      swap.receiver.toString() === raterId;

    if (!isSender && !isReceiver) {
      return res.status(200).json({
        success: true,
        data: {
          canRate: false,
          reason:
            "You are not a participant of this swap",
        },
      });
    }

    // -----------------------------------------
    // Check completion
    // -----------------------------------------

    if (swap.status !== "completed") {
      return res.status(200).json({
        success: true,
        data: {
          canRate: false,
          reason:
            "Only completed swaps can be rated",
        },
      });
    }

    // -----------------------------------------
    // Determine other participant
    // -----------------------------------------

    const ratedUser = isSender
      ? swap.receiver.toString()
      : swap.sender.toString();

    // -----------------------------------------
    // Check existing rating
    // -----------------------------------------

    const existingRating =
      await Rating.findOne({
        swap: swapIdStr,
        rater: raterId,
      });

    if (existingRating) {
      return res.status(200).json({
        success: true,
        data: {
          canRate: false,
          alreadyRated: true,
          ratedUser,
          reason:
            "You already rated this swap",
        },
      });
    }

    // -----------------------------------------
    // User can rate
    // -----------------------------------------

    return res.status(200).json({
      success: true,

      data: {
        canRate: true,
        alreadyRated: false,
        ratedUser,
      },
    });
  } catch (error) {
    console.error(
      "Can rate swap error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to check rating eligibility",
    });
  }
};