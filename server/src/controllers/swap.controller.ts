import { Response } from "express";

import swapRequest from "../models/swapRequest";
import User from "../models/User";

import { AuthRequest } from "../middleware/auth.middleware";
import { createNotification } from "../utils/createNotification";

//Send Swap Request
export const sendSwapRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    console.log("req.user:", req.user);

    const senderId = req.user?.id;

    const {
      receiver,
      skillOffered,
      skillRequested,
      message,
    } = req.body;

    if (!senderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (senderId === receiver) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot send swap request to yourself",
      });
    }

    const existing = await swapRequest.findOne({
      sender: senderId,
      receiver,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Swap request already exists",
      });
    }

    const senderUser = await User.findById(
      senderId
    ).select("username");

    const swap = await swapRequest.create({
      sender: senderId,
      receiver,
      skillOffered,
      skillRequested,
      message,
    });

    await createNotification({
      recipient: receiver,
      sender: senderId,

      type: "swap_request",

      title: "New Swap Request",

      message: `You have a new swap request from ${
        senderUser?.username ?? "a user"
      }`,
    });

    return res.status(201).json({
      success: true,
      message: "Swap request sent",
      data: swap,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to send swap request",
    });
  }
};

//Accept Swap Request
export const acceptSwapRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const swap =
      await swapRequest.findById(id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message:
          "Swap request not found",
      });
    }

    if (
      swap.receiver.toString() !==
      req.user?.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only receiver can accept this request",
      });
    }

    if (swap.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Swap request is no longer pending",
      });
    }

    swap.status = "accepted";

    await swap.save();

    await createNotification({
      recipient: swap.sender.toString(),

      sender: req.user?.id,

      type: "swap_accepted",

      title: "Swap Accepted",

      message:
        "Your swap request was accepted.",
    });

    return res.status(200).json({
      success: true,
      message:
        "Swap request accepted",
      data: swap,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to accept swap request",
    });
  }
};

//Reject Swap Request
export const rejectSwapRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const swap =
      await swapRequest.findById(id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message:
          "Swap request not found",
      });
    }

    if (
      swap.receiver.toString() !==
      req.user?.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only receiver can reject this request",
      });
    }

    if (swap.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Swap request is no longer pending",
      });
    }

    swap.status = "rejected";

    await swap.save();

    await createNotification({
      recipient: swap.sender.toString(),

      sender: req.user?.id,

      type: "swap_rejected",

      title: "Swap Rejected",

      message:
        "Your swap request was rejected.",
    });

    return res.status(200).json({
      success: true,
      message:
        "Swap request rejected",
      data: swap,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to reject swap request",
    });
  }
};

//Complete Swap Request
export const completeSwapRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const swap =
      await swapRequest.findById(id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message:
          "Swap request not found",
      });
    }

    const isParticipant =
      swap.sender.toString() ===
        req.user?.id ||
      swap.receiver.toString() ===
        req.user?.id;

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (swap.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message:
          "Only accepted swaps can be completed",
      });
    }

    swap.status = "completed";

    await swap.save();

    return res.status(200).json({
      success: true,
      message:
        "Swap marked as completed",
      data: swap,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to complete swap",
    });
  }
};

// Get all swaps for a user
export const getUserSwaps = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const swaps =
      await swapRequest
        .find({
          $or: [
            { sender: userId },
            { receiver: userId },
          ],
        })
        .populate(
          "sender",
          "username email avatar trustScore"
        )
        .populate(
          "receiver",
          "username email avatar trustScore"
        )
        .populate(
          "skillOffered",
          "name category"
        )
        .populate(
          "skillRequested",
          "name category"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: swaps.length,
      data: swaps,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch swaps",
    });
  }
};

//get swap by id
export const getSwapById = async (
  req: AuthRequest,
  res: Response
) => {
  const swap =
    await swapRequest
      .findById(req.params.id)
      .populate(
        "sender",
        "username email avatar trustScore"
      )
      .populate(
        "receiver",
        "username email avatar trustScore"
      )
      .populate(
        "skillOffered",
        "name category"
      )
      .populate(
        "skillRequested",
        "name category"
      );

  if (!swap) {
    return res.status(404).json({
      success: false,
      message:
        "Swap not found",
    });
  }

  return res.json({
    success: true,
    data: swap,
  });
};