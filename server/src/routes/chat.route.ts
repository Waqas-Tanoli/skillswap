import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getChatMessages } from "../controllers/chat.controller";

const router = Router();

router.get("/:swapId", authMiddleware, getChatMessages);

export default router;