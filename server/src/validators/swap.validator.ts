import {z} from "zod";
import {validate} from "../middleware/validate";        
// export const updateSwapSchema = z.object({
//   sender: z.string().uuid(),
//   receiver: z.string().uuid(),
//   skillOffered: z.string().min(2).max(50),
//   skillRequested: z.string().min(2).max(50),
//   message: z.string().max(1000).optional(),
//   status: z.enum(["pending", "accepted", "rejected", "completed"]),
// });

export const createSwapSchema = z.object({
  sender: z.string().uuid(),
  receiver: z.string().uuid(),
  skillOffered: z.string().min(2).max(50),
  skillRequested: z.string().min(2).max(50),
  message: z.string().max(1000).optional(),
  status: z.enum(["pending", "accepted", "rejected", "completed"]).default("pending"),
});

export const validateCreateSwap = validate(createSwapSchema);
 
  //export const validateCreateSwap = validate(updateSwapSchema);
