import Skill from "../models/skill";

export const seedSkills = async () => {
  const count = await Skill.countDocuments();

  if (count > 0) return;

  await Skill.insertMany([
    { name: "React", category: "IT" },
    { name: "Node.js", category: "IT" },
    { name: "MongoDB", category: "IT" },
    { name: "Photoshop", category: "Design" },
    { name: "Illustration", category: "Design" },
    { name: "Guitar", category: "Music" },
    { name: "Piano", category: "Music" },
    { name: "Cooking", category: "Lifestyle" },
  ]);

  console.log("Skills seeded successfully");
};