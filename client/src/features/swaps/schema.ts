import { z } from "zod";

export const createSwapSchema = z.object({
  skillOffered: z
    .string()
    .min(1, "Please select a skill to offer"),

  skillRequested: z
    .string()
    .min(1, "Please select a skill to request"),

  message: z.string().optional(),
});