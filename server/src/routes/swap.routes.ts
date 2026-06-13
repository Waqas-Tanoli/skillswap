import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { createSwapSchema } from "../validators/swap.validator";

import {
  sendSwapRequest,
  acceptSwapRequest,
  rejectSwapRequest,
  completeSwapRequest,
  getUserSwaps,
} from "../controllers/swap.controller";

const router = Router();

router.post("/send", authMiddleware, validate(createSwapSchema), sendSwapRequest);

router.get("/", authMiddleware, getUserSwaps);

router.patch("/:id/accept", authMiddleware, acceptSwapRequest);

router.patch("/:id/reject", authMiddleware, rejectSwapRequest);

router.patch("/:id/complete", authMiddleware, completeSwapRequest);

export default router;