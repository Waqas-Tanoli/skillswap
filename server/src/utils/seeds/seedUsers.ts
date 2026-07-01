import Skill from "../../models/skill";
import User from "../../models/User";
import { hashPassword } from "../hash";

export const seedUsers = async () => {
  const seedEmails = [
    "ali@example.com",
    "sara@example.com",
    "ahmed@example.com",
    "fatima@example.com",
    "usman@example.com",
  ];

  const existingUsers = await User.find({
    email: { $in: seedEmails },
  });

  if (existingUsers.length === seedEmails.length) {
    console.log("Users already seeded");
    return;
  }

  const skills = await Skill.find();

  const getSkillId = (name: string) => {
    const skill = skills.find((s) => s.name === name);

    if (!skill) {
      throw new Error(`Skill "${name}" not found. Run seedSkills first.`);
    }

    return skill._id;
  };

  const defaultPassword = await hashPassword("Password123!");

  await User.insertMany([
    {
      username: "Ali Khan",
      email: "ali@example.com",
      password: defaultPassword,

      bio: "Full-stack developer from Islamabad who loves teaching MERN technologies.",
      location: "Islamabad, Pakistan",

      skillsToTeach: [
        {
          skill: getSkillId("React"),
          level: "advanced",
        },
        {
          skill: getSkillId("Node.js"),
          level: "advanced",
        },
        {
          skill: getSkillId("MongoDB"),
          level: "intermediate",
        },
      ],

      skillsToLearn: [
        {
          skill: getSkillId("UI Design"),
          level: "beginner",
        },
        {
          skill: getSkillId("Photoshop"),
          level: "beginner",
        },
      ],
    },

    {
      username: "Sara Ahmed",
      email: "sara@example.com",
      password: defaultPassword,

      bio: "UI/UX designer looking to improve her frontend development skills.",
      location: "Lahore, Pakistan",

      skillsToTeach: [
        {
          skill: getSkillId("UI Design"),
          level: "advanced",
        },
        {
          skill: getSkillId("Photoshop"),
          level: "advanced",
        },
        {
          skill: getSkillId("Figma"),
          level: "advanced",
        },
      ],

      skillsToLearn: [
        {
          skill: getSkillId("React"),
          level: "beginner",
        },
        {
          skill: getSkillId("Node.js"),
          level: "beginner",
        },
      ],
    },

    {
      username: "Ahmed Raza",
      email: "ahmed@example.com",
      password: defaultPassword,

      bio: "Backend engineer passionate about cloud and DevOps.",
      location: "Rawalpindi, Pakistan",

      skillsToTeach: [
        {
          skill: getSkillId("Node.js"),
          level: "advanced",
        },
        {
          skill: getSkillId("Docker"),
          level: "advanced",
        },
        {
          skill: getSkillId("AWS"),
          level: "intermediate",
        },
      ],

      skillsToLearn: [
        {
          skill: getSkillId("Flutter"),
          level: "beginner",
        },
      ],
    },

    {
      username: "Fatima Noor",
      email: "fatima@example.com",
      password: defaultPassword,

      bio: "Mobile developer exploring full-stack technologies.",
      location: "Karachi, Pakistan",

      skillsToTeach: [
        {
          skill: getSkillId("Flutter"),
          level: "advanced",
        },
      ],

      skillsToLearn: [
        {
          skill: getSkillId("React"),
          level: "intermediate",
        },
        {
          skill: getSkillId("MongoDB"),
          level: "beginner",
        },
      ],
    },

    {
      username: "Usman Tariq",
      email: "usman@example.com",
      password: defaultPassword,

      bio: "Graphic designer interested in web technologies.",
      location: "Peshawar, Pakistan",

      skillsToTeach: [
        {
          skill: getSkillId("Photoshop"),
          level: "advanced",
        },
        {
          skill: getSkillId("Figma"),
          level: "intermediate",
        },
      ],

      skillsToLearn: [
        {
          skill: getSkillId("React"),
          level: "beginner",
        },
        {
          skill: getSkillId("Node.js"),
          level: "beginner",
        },
      ],
    },
  ]);

  console.log("Users seeded successfully");
};