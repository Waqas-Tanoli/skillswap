import SwapRequest from "../models/swapRequest";
import Message from "../models/message";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import  {Types} from "mongoose";


export const getChatMessages = async (
  req: AuthRequest,
  res: Response
) => {
  const { swapId } = req.params;

  const swap = await SwapRequest.findById(swapId);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap not found",
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
    return res.status(403).json({
      success: false,
      message:
        "Chat is only available for accepted swaps",
    });
  }

  const messages = await Message.find({
    swap: swapId,
  })
    .populate("sender", "username avatar")
    .populate("receiver", "username avatar")
    .sort({ createdAt: 1 });

  return res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
};

// GET ALL CHATS FOR A USER


export const getMyChats = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = new Types.ObjectId(req.user!.id);

  const chats = await Message.aggregate([
    {
      $match: {
        $or: [
          { sender: userId },
          { receiver: userId },
        ],
      },
    },

    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $group: {
        _id: "$swap",
        lastMessage: {
          $first: "$message",
        },
        sender: {
          $first: "$sender",
        },
        receiver: {
          $first: "$receiver",
        },
        createdAt: {
          $first: "$createdAt",
        },
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "sender",
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "receiver",
        foreignField: "_id",
        as: "receiver",
      },
    },

    {
      $unwind: "$sender",
    },

    {
      $unwind: "$receiver",
    },

    {
      $project: {
        swapId: "$_id",
        lastMessage: 1,
        updatedAt: "$createdAt",

        otherUser: {
          $cond: [
            {
              $eq: [
                "$sender._id",
                userId,
              ],
            },
            {
              _id: "$receiver._id",
              username:
                "$receiver.username",
              avatar:
                "$receiver.avatar",
            },
            {
              _id: "$sender._id",
              username:
                "$sender.username",
              avatar:
                "$sender.avatar",
            },
          ],
        },

        unreadCount: {
          $literal: 0,
        },
      },
    },

    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);

  return res.json({
    success: true,
    data: chats,
  });
};


// import Message from "../models/message";
// import { AuthRequest } from "../middleware/auth.middleware";

// export const getChatMessages = async (
//   req: AuthRequest,
//   res: any
// ) => {
//   const { swapId } = req.params;

//   const messages = await Message.find({
//     swap: swapId,
//   })
//     .populate("sender", "username avatar")
//     .populate("receiver", "username avatar")
//     .sort({ createdAt: 1 });

//   return res.status(200).json({
//     success: true,
//     count: messages.length,
//     data: messages,
//   });
// };