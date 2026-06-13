import swapRequest from "../models/swapRequest";
import { AuthRequest } from "../middleware/auth.middleware";

//send swap request
export const sendSwapRequest = async (req: AuthRequest, res: any) => {
  const senderId = req.user?.id;
  const { receiver, skillOffered, skillRequested, message } = req.body;

  if (senderId === receiver) {
    return res.status(400).json({
      success: false,
      message: "You cannot send swap request to yourself",
    });
  }

  // prevent duplicate pending request
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


//Accept swap request
export const acceptSwapRequest = async (req: any, res: any) => {
  const { id } = req.params;

  const swap = await swapRequest.findById(id);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap request not found",
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

//Reject Swap Request
export const rejectSwapRequest = async (req: any, res: any) => {
  const { id } = req.params;

  const swap = await swapRequest.findById(id);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap request not found",
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

//Mark Completed 
export const completeSwapRequest = async (req: any, res: any) => {
  const { id } = req.params;

  const swap = await swapRequest.findById(id);

  if (!swap) {
    return res.status(404).json({
      success: false,
      message: "Swap request not found",
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

//get user swaps
export const getUserSwaps = async (req: any, res: any) => {
  const userId = req.user?.id;

  const swaps = await swapRequest.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate("sender receiver", "name email avatar")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: swaps.length,
    data: swaps,
  });
};