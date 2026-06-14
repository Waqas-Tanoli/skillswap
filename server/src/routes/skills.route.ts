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
} from "../controllers/skills.controller";

import {
  createSkillSchema,
  updateSkillSchema,
} from "../validators/skills.validator";

const router = Router();

// Get all skills
router.get("/", getAllSkills);
router.get("/:id", getSkillById);


router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  validate(createSkillSchema),
  createSkill
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validate(updateSkillSchema),
  updateSkill
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteSkill
);

export default router;