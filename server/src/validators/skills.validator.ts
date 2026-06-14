import { z } from "zod";
import { validate } from "../middleware/validate";

export const createSkillSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
});

export const updateSkillSchema = z.object({
  name: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
});

export const validateCreateSkill = validate(createSkillSchema);
export const validateUpdateSkill = validate(updateSkillSchema);