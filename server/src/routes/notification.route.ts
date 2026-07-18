import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../controllers/notification.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getNotifications
);

router.get(
  "/unread-count",
  authMiddleware,
  getUnreadCount
);

router.patch(
  "/:id/read",
  authMiddleware,
  markNotificationAsRead
);

router.patch(
  "/read-all",
  authMiddleware,
  markAllNotificationsAsRead
);

router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

export default router;