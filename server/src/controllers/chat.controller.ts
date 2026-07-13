import SwapRequest from "../models/swapRequest";
import Message from "../models/message";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";

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