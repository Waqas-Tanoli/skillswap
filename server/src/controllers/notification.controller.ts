import { Response } from "express";
import Notification from "../models/notification";
import { AuthRequest } from "../middleware/auth.middleware";

export const getNotifications = async (
  req: AuthRequest,
  res: Response
) => {
  const notifications = await Notification.find({
    recipient: req.user?.id,
  })
    .populate("sender", "username avatar")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications,
  });
};


// Mark notification as read
export const markNotificationAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  const notification =
    await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  if (
    notification.recipient.toString() !==
    req.user?.id
  ) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  notification.isRead = true;

  await notification.save();

  return res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
};

// unread count 
export const getUnreadCount = async (
  req: AuthRequest,
  res: Response
) => {
  const count =
    await Notification.countDocuments({
      recipient: req.user?.id,
      isRead: false,
    });

  return res.status(200).json({
    success: true,
    count,
  });
};