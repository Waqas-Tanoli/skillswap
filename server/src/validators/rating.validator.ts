import { z } from "zod";
import { validate } from "../middleware/validate";

export const createRatingSchema = z.object({
  swapId: z.string().min(1, "Swap ID is required"),
    ratedUser: z.string().min(1),
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  review: z
    .string()
    .max(1000, "Review cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
});

export const validateCreateRating = validate(
  createRatingSchema
);