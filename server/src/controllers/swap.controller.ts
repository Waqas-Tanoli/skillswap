import swapRequest from "../models/swapRequest";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";

// Send Swap Request
export const sendSwapRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const senderId = req.user?.id;
  const {
    receiver,
    skillOffered,
    skillRequested,
    message,
  } = req.body;

  if (senderId === receiver) {
    return res.status(400).json({
      success: false,
      message: "You cannot send swap request to yourself",
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
      message: "Swap request already exists",
    });
  }

  const swap = await swapRequest.create({
    sender: senderId,
    receiver,
    skillOffered,
    skillRequested,
    message,
  });

  return res.status(201).json({
    success: true,
    message: "Swap request sent",
    data: swap,
  });
};

// Accept Swap Request
export const acceptSwapRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  const swap = await swapRequest.findById(id);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap request not found",
    });
  }

  // only receiver can accept
  if (swap.receiver.toString() !== req.user?.id) {
    return res.status(403).json({
      success: false,
      message: "Only receiver can accept this request",
    });
  }

  // must be pending
  if (swap.status !== "pending") {
    return res.status(400).json({
      success: false,
      message: "Swap request is no longer pending",
    });
  }

  swap.status = "accepted";
  await swap.save();

  return res.status(200).json({
    success: true,
    message: "Swap request accepted",
    data: swap,
  });
};

// Reject Swap Request
export const rejectSwapRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  const swap = await swapRequest.findById(id);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap request not found",
    });
  }

  if (swap.receiver.toString() !== req.user?.id) {
    return res.status(403).json({
      success: false,
      message: "Only receiver can reject this request",
    });
  }

  if (swap.status !== "pending") {
    return res.status(400).json({
      success: false,
      message: "Swap request is no longer pending",
    });
  }

  swap.status = "rejected";
  await swap.save();

  return res.status(200).json({
    success: true,
    message: "Swap request rejected",
    data: swap,
  });
};

// Mark Swap as Completed
export const completeSwapRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  const swap = await swapRequest.findById(id);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap request not found",
    });
  }

  const isParticipant =
    swap.sender.toString() === req.user?.id ||
    swap.receiver.toString() === req.user?.id;

  if (!isParticipant) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (swap.status !== "accepted") {
    return res.status(400).json({
      success: false,
      message: "Only accepted swaps can be completed",
    });
  }

  swap.status = "completed";
  await swap.save();

  return res.status(200).json({
    success: true,
    message: "Swap marked as completed",
    data: swap,
  });
};

// Get all swaps for a user
export const getUserSwaps = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.user?.id;

  const swaps = await swapRequest
    .find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
    .populate("sender", "name email avatar trustScore")
    .populate("receiver", "name email avatar trustScore")
    .populate("skillOffered", "name category")
    .populate("skillRequested", "name category")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: swaps.length,
    data: swaps,
  });
};