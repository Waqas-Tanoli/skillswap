import { Response } from "express";
import Notification from "../models/notification";
import { AuthRequest } from "../middleware/auth.middleware";

// Get all notifications
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

// Get unread count
export const getUnreadCount = async (
  req: AuthRequest,
  res: Response
) => {
  const count = await Notification.countDocuments({
    recipient: req.user?.id,
    isRead: false,
  });

  return res.status(200).json({
    success: true,
    count,
  });
};

// Mark single notification as read
export const markNotificationAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  const notification = await Notification.findById(
    req.params.id
  );

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

// Mark all notifications as read
export const markAllNotificationsAsRead =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    await Notification.updateMany(
      {
        recipient: req.user?.id,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "All notifications marked as read",
    });
  };

// Delete notification
export const deleteNotification = async (
  req: AuthRequest,
  res: Response
) => {
  const notification =
    await Notification.findById(
      req.params.id
    );

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

  await notification.deleteOne();

  return res.status(200).json({
    success: true,
    message:
      "Notification deleted successfully",
  });
};