import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  getNotifications,
  markNotificationAsRead,
  getUnreadCount,
} from "../controllers/notification.controller";

const router = Router();

router.get("/", authMiddleware, getNotifications);

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

export default router;