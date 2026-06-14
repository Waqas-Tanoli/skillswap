import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getMatches } from "../controllers/match.controller";

const router = Router();

router.get("/", authMiddleware, getMatches);

export default router;