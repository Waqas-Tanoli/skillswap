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


/**
 * @openapi
 * /swaps/send:
 *   post:
 *     tags:
 *       - Swaps
 *     summary: Send a swap request
 *   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiver
 *               - skillOffered
 *               - skillRequested
 *             properties:
 *               receiver:
 *                 type: string
 *               skillOffered:
 *                 type: string
 *               skillRequested:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Swap request sent
 */