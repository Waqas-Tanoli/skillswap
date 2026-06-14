import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

export const getMatches = async (
  req: AuthRequest,
  res: any
) => {
  const currentUser = await User.findById(
    req.user?.id
  );

  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const users = await User.find({
    _id: { $ne: currentUser._id },
  }).select("-password");

  const matches = users
    .map((user) => {
      const teachMatch = currentUser.skillsToLearn.filter(
        (skill) =>
          user.skillsToTeach.includes(skill)
      );

      const learnMatch = currentUser.skillsToTeach.filter(
        (skill) =>
          user.skillsToLearn.includes(skill)
      );

      const score = teachMatch.length * 2 + learnMatch.length * 2;

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