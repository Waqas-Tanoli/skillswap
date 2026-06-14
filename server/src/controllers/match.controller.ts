import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

export const getMatches = async (
  req: AuthRequest,
  res: any
) => {
  const currentUser = await User.findById(req.user?.id)
    .populate("skillsToTeach.skill", "name category")
    .populate("skillsToLearn.skill", "name category");

  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const users = await User.find({
    _id: { $ne: currentUser._id },
  })
    .populate("skillsToTeach.skill", "name category")
    .populate("skillsToLearn.skill", "name category")
    .select("-password");

  const currentTeachSkillIds = currentUser.skillsToTeach.map(
    (item) => item.skill._id.toString()
  );

  const currentLearnSkillIds = currentUser.skillsToLearn.map(
    (item) => item.skill._id.toString()
  );

  const matches = users
    .map((user) => {
      const teachMatch = user.skillsToTeach.filter((item) =>
        currentLearnSkillIds.includes(item.skill._id.toString())
      );

      const learnMatch = user.skillsToLearn.filter((item) =>
        currentTeachSkillIds.includes(item.skill._id.toString())
      );

      const score =
        teachMatch.length * 2 +
        learnMatch.length * 2;

      return {
        user,
        score,
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