import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";

import {
  createRating,
  getUserRatings,
  getUserRatingSummary,
} from "../controllers/rating.controller";

import {
  createRatingSchema,
} from "../validators/rating.validator";

const router = Router();

//create rating
router.post(
  "/",
  authMiddleware,
  validate(createRatingSchema),
  createRating
);
//get rating summary for user
router.get(
  "/:userId/summary",
  authMiddleware,
  getUserRatingSummary
);

//get all ratings for a user
router.get(
  "/:userId",
  authMiddleware,
  getUserRatings
);

export default router;