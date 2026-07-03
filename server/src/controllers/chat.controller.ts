import Message from "../models/message";
import { AuthRequest } from "../middleware/auth.middleware";

export const getChatMessages = async (
  req: AuthRequest,
  res: any
) => {
  const { swapId } = req.params;

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