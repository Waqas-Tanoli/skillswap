import {Router} from 'express';     
import { authMiddleware } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { getMe, updateProfile, getUserById, searchUsers, getAllUsers } from '../controllers/user.controller';
import {validate} from '../middleware/validate';
import { updateProfileSchema } from '../validators/user.validator';

const router = Router();

// Get current user profile
router.get("/me", authMiddleware, getMe);

// Update user profile
router.put(
  "/update",
  authMiddleware,
  validate(updateProfileSchema),
  updateProfile
);

// Search users by skill or location
router.get("/search", searchUsers);

// Get user by ID (admin only) - Get Public user profile
router.get("/:id", getUserById);

// Get all users (admin only)
router.get(
  "/admin/all",
  authMiddleware,
  authorizeRoles("admin"),
  getAllUsers
);

export default router;