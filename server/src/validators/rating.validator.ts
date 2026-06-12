import {z} from "zod";
import {validate} from "../middleware/validate";


export const createRatingSchema = z.object({
  from: z.string().uuid(),
  to: z.string().uuid(),
  swapRequest: z.string().uuid(),
  rating: z.number().min(1).max(5),
  review: z.string().max(1000).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const validateCreateRating = validate(createRatingSchema);
