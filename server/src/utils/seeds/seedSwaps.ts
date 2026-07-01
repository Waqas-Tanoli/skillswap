
import User from "../../models/User";
import Skill from "../../models/skill";
import SwapRequest from "../../models/swapRequest";

export const seedSwaps = async () => {
  const existingSwaps = await SwapRequest.countDocuments();

  if (existingSwaps > 0) {
    console.log("Swaps already seeded");
    return;
  }

  const [
    ali,
    sara,
    ahmed,
    fatima,
    usman,
  ] = await Promise.all([
    User.findOne({ email: "ali@example.com" }),
    User.findOne({ email: "sara@example.com" }),
    User.findOne({ email: "ahmed@example.com" }),
    User.findOne({ email: "fatima@example.com" }),
    User.findOne({ email: "usman@example.com" }),
  ]);

  if (!ali || !sara || !ahmed || !fatima || !usman) {
    throw new Error(
      "Required users not found. Run seedUsers first."
    );
  }

  const skills = await Skill.find();

  const getSkillId = (name: string) => {
    const skill = skills.find((s) => s.name === name);

    if (!skill) {
      throw new Error(
        `Skill "${name}" not found. Run seedSkills first.`
      );
    }

    return skill._id;
  };

  await SwapRequest.insertMany([
    {
      sender: ali._id,
      receiver: sara._id,

      skillOffered: getSkillId("React"),
      skillRequested: getSkillId("UI Design"),

      status: "completed",
    },

    {
      sender: ahmed._id,
      receiver: fatima._id,

      skillOffered: getSkillId("Node.js"),
      skillRequested: getSkillId("Flutter"),

      status: "accepted",
    },

    {
      sender: usman._id,
      receiver: ali._id,

      skillOffered: getSkillId("Photoshop"),
      skillRequested: getSkillId("React"),

      status: "pending",
    },
  ]);

  console.log("Swaps seeded successfully");
};