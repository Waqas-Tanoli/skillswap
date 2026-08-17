import { Types } from "mongoose";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

// bonus per skill pair when it's a genuine two-way swap
const MUTUAL_MATCH_BONUS = 3; 
const ONE_WAY_WEIGHT = 1.5;

export const getMatches = async (req: AuthRequest, res: any) => {
  const currentUser = await User.findById(req.user?.id)
    .populate("skillsToTeach.skill", "name category")
    .populate("skillsToLearn.skill", "name category");

  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Filter out any items whose skill ref no longer resolves (deleted skill docs)
  const currentTeachSkillIds = currentUser.skillsToTeach
    .filter((item) => item.skill)
    .map((item) => item.skill._id.toString());

  const currentLearnSkillIds = currentUser.skillsToLearn
    .filter((item) => item.skill)
    .map((item) => item.skill._id.toString());

  if (currentTeachSkillIds.length === 0 && currentLearnSkillIds.length === 0) {
    return res.status(200).json({
      success: true,
      count: 0,
      data: [],
    });
  }

  // Pre-filter at the DB level: only pull users who share at least one
  // relevant skill id, instead of loading the entire user collection.
  const users = await User.find({
    _id: { $ne: currentUser._id },
    $or: [
      { "skillsToTeach.skill": { $in: currentLearnSkillIds } },
      { "skillsToLearn.skill": { $in: currentTeachSkillIds } },
    ],
  })
    .populate("skillsToTeach.skill", "name category")
    .populate("skillsToLearn.skill", "name category")
    .select("-password");

  const maxPossible =
    (currentLearnSkillIds.length + currentTeachSkillIds.length) *
    (MUTUAL_MATCH_BONUS + ONE_WAY_WEIGHT * 2);

  const matches = users
    .map((user) => {
      const teachMatch = user.skillsToTeach.filter(
        (item) => item.skill && currentLearnSkillIds.includes(item.skill._id.toString())
      );

      const learnMatch = user.skillsToLearn.filter(
        (item) => item.skill && currentTeachSkillIds.includes(item.skill._id.toString())
      );

      const isMutualMatch = teachMatch.length > 0 && learnMatch.length > 0;

      // Reward true swaps (they teach what I want AND learn what I teach)
      // more than one-directional overlap.
      const score = isMutualMatch
        ? (teachMatch.length + learnMatch.length) * MUTUAL_MATCH_BONUS
        : (teachMatch.length + learnMatch.length) * ONE_WAY_WEIGHT;

      const matchPercentage = maxPossible > 0
        ? Math.min(100, Math.round((score / maxPossible) * 100))
        : 0;

      return {
        user,
        score,
        matchPercentage,
        isMutualMatch,
        teachMatch,
        learnMatch,
      };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);

  return res.status(200).json({
    success: true,
    count: matches.length,
    data: matches,
  });
};