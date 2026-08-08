import { Response } from "express";

import User from "../../models/User";
import SwapRequest from "../../models/swapRequest";
import { AuthRequest } from "../../middleware/auth.middleware";

// Get all users - Admin
export const getAllUsersAdmin = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// Ban / Unban user - Admin
export const toggleBanUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isBanned = !user.isBanned;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.isBanned
        ? "User banned successfully"
        : "User unbanned successfully",
      data: {
        id: user._id,
        isBanned: user.isBanned,
      },
    });
  } catch (error) {
    console.error("Toggle ban user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user ban status",
    });
  }
};

// Get all swaps - Admin
export const getAllSwapsAdmin = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { status, search } = req.query;

    const query: any = {};

    // Filter by status
    if (
      status &&
      ["pending", "accepted", "rejected", "completed"].includes(
        status as string
      )
    ) {
      query.status = status;
    }

    const swaps = await SwapRequest.find(query)
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
      .sort({ createdAt: -1 });

    // Optional search
    let filteredSwaps = swaps;

    if (search && typeof search === "string") {
      const searchTerm = search.toLowerCase();

      filteredSwaps = swaps.filter((swap: any) => {
        const senderUsername =
          swap.sender?.username?.toLowerCase() || "";

        const receiverUsername =
          swap.receiver?.username?.toLowerCase() || "";

        const offeredSkill =
          swap.skillOffered?.name?.toLowerCase() || "";

        const requestedSkill =
          swap.skillRequested?.name?.toLowerCase() || "";

        return (
          senderUsername.includes(searchTerm) ||
          receiverUsername.includes(searchTerm) ||
          offeredSkill.includes(searchTerm) ||
          requestedSkill.includes(searchTerm)
        );
      });
    }

    return res.status(200).json({
      success: true,
      count: filteredSwaps.length,
      data: filteredSwaps,
    });
  } catch (error) {
    console.error("Get all swaps admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch swaps",
    });
  }
};

// Delete swap - Admin
export const deleteSwap = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const swap = await SwapRequest.findById(id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap not found",
      });
    }

    await SwapRequest.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Swap deleted successfully",
    });
  } catch (error) {
    console.error("Delete swap error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete swap",
    });
  }
};