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
} from "../controllers/skills.controller";

import {
  approveSkillSchema,
  createSkillSchema,
  rejectSkillSchema,
  requestSkillSchema,
  updateSkillSchema,
} from "../validators/skills.validator";

const router = Router();
// Get all skills
router.get("/", getAllSkills);

// Get pending skills (admin only)
router.get(
  "/pending",
  authMiddleware,
  authorizeRoles("admin"),
  getPendingSkills
);


// Request a new skill
router.post(
  "/request",
  authMiddleware,
  validate(requestSkillSchema),
  requestSkill
);
// Get single skill by ID
router.get("/:id", getSkillById);

// Create skill (admin only)
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  validate(createSkillSchema),
  createSkill
);

// Update skill (admin only)
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validate(updateSkillSchema),
  updateSkill
);

// Delete skill (admin only)
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteSkill
);

// Approve skill request (admin only)
router.patch(
  "/:id/approve",
  authMiddleware,
  authorizeRoles("admin"),
  validate(approveSkillSchema),
  approveSkill
);

// Reject skill request (admin only)
router.delete(
  "/:id/reject",
  authMiddleware,
  authorizeRoles("admin"),
  validate(rejectSkillSchema),
  rejectSkill
);

export default router;