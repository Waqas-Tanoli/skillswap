import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  createRating,
  getUserRatings,
} from "../controllers/rating.controller";

const router = Router();

router.post("/", authMiddleware, createRating);

router.get("/:userId", authMiddleware, getUserRatings);

export default router;