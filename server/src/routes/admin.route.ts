import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

import {
  getAllUsersAdmin,
  toggleBanUser,
} from "../controllers/admin/user.admin.controller";

import {
  getPlatformAnalytics,
} from "../controllers/admin/analytics.admin.controller";

import {
  deleteSwap,
} from "../controllers/admin/user.admin.controller";

const router = Router();

/**
 * USER MANAGEMENT
 */
router.get(
  "/users",
  authMiddleware,
  adminOnly,
  getAllUsersAdmin
);

router.patch(
  "/users/:id/ban",
  authMiddleware,
  adminOnly,
  toggleBanUser
);

/**
 * PLATFORM ANALYTICS
 */
router.get(
  "/analytics",
  authMiddleware,
  adminOnly,
  getPlatformAnalytics
);

/**
 * MODERATION
 */
router.delete(
  "/swap/:id",
  authMiddleware,
  adminOnly,
  deleteSwap
);

export default router;