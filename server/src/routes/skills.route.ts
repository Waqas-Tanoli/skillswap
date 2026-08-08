import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { validate } from "../middleware/validate";

import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
  requestSkill,
  approveSkill,
  rejectSkill,
  getPendingSkills,
  getSkills,
} from "../controllers/skills.controller";

import {
  createSkillSchema,
  rejectSkillSchema,
  requestSkillSchema,
  updateSkillSchema,
} from "../validators/skills.validator";

const router = Router();

// Get all skills
router.get("/", getSkills);

/**
 * =========================================================
 * ADMIN SKILL REQUEST ROUTES
 * =========================================================
 */

// Get pending skill requests
// Used by Admin Dashboard
router.get(
  "/requests",
  authMiddleware,
  authorizeRoles("admin"),
  getPendingSkills,
);

router.get(
  "/pending",
  authMiddleware,
  authorizeRoles("admin"),
  getPendingSkills,
);

/**
 * =========================================================
 * USER SKILL REQUEST
 * =========================================================
 */

// Request a new skill
router.post(
  "/request",
  authMiddleware,
  validate(requestSkillSchema),
  requestSkill,
);

/**
 * =========================================================
 * ADMIN SKILL CREATION
 * =========================================================
 */

// Create skill manually
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  validate(createSkillSchema),
  createSkill,
);

/**
 * =========================================================
 * SKILL ACTIONS
 * =========================================================
 */

// Approve skill request
router.patch(
  "/:id/approve",
  authMiddleware,
  authorizeRoles("admin"),
  approveSkill,
);

// Reject skill request
router.delete(
  "/:id/reject",
  authMiddleware,
  authorizeRoles("admin"),
  validate(rejectSkillSchema),
  rejectSkill,
);

// Get skill by ID

router.get("/:id", getSkillById);

//ADMIN SKILL MANAGEMENT //

// Update skill
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validate(updateSkillSchema),
  updateSkill,
);

// Delete skill
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteSkill);

export default router;
