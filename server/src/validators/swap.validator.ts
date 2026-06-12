import {z} from "zod";
import {validate} from "../middleware/validate";        
export const updateSwapSchema = z.object({
  sender: z.string().uuid(),
  receiver: z.string().uuid(),
  skillOffered: z.string().min(2).max(50),
  skillRequested: z.string().min(2).max(50),
  message: z.string().max(1000).optional(),
  status: z.enum(["pending", "accepted", "rejected", "completed"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

 
  export const validateCreateSwap = validate(updateSwapSchema);
