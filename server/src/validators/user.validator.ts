import {z} from "zod";
import {validate} from "../middleware/validate";    

export const skillSchema = z.object({
  skill: z.string(),
  level: z.enum([
    "beginner",
    "intermediate",
    "advanced",
  ]),
});
export const updateProfileSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(100).optional(),
  bio: z.string().max(500).optional(),
   skillsToTeach: z.array(skillSchema).optional(),
  skillsToLearn: z.array(skillSchema).optional(),
  avatar: z.string().url().optional(),
  trustScore: z.number().min(0).max(100).optional(),
  role: z.enum(["user", "admin"]).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const validateUpdateProfile = validate(updateProfileSchema);

