
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getChatMessages } from "../controllers/chat.controller";
import { getSwapById } from "../controllers/swap.controller";

const router = Router();

// GET CHAT MESSAGES
router.get(
  "/messages/:swapId",
  authMiddleware,
  getChatMessages
);

// GET SWAP DETAILS
router.get(
  "/swap/:id",
  authMiddleware,
  getSwapById
);

export default router;