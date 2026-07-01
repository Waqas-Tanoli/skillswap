import Skill from "../../models/skill";


export const seedSkills = async () => {
  const count = await Skill.countDocuments();

  if (count > 0) return;

  await Skill.insertMany([
   //* IT */
{ name: "HTML", category: "IT" },
{ name: "CSS", category: "IT" },
{ name: "JavaScript", category: "IT" },
{ name: "TypeScript", category: "IT" },
{ name: "React", category: "IT" },
{ name: "Next.js", category: "IT" },
{ name: "Node.js", category: "IT" },
{ name: "Express.js", category: "IT" },
{ name: "MongoDB", category: "IT" },
{ name: "PostgreSQL", category: "IT" },
{ name: "Docker", category: "IT" },
{ name: "Git & GitHub", category: "IT" },
{ name: "AWS", category: "IT" },
{ name: "Flutter", category: "IT" }, // ← ADD THIS
{ name: "Linux Administration", category: "IT" },
{ name: "DevOps", category: "IT" },

    /**
     * Design
     */
    { name: "Photoshop", category: "Design" },
    { name: "Illustrator", category: "Design" },
    { name: "Figma", category: "Design" },
    { name: "UI Design", category: "Design" },
    { name: "UX Design", category: "Design" },
    { name: "Logo Design", category: "Design" },
    { name: "Brand Identity Design", category: "Design" },
    { name: "Canva", category: "Design" },

    /**
     * Music
     */
    { name: "Guitar", category: "Music" },
    { name: "Piano", category: "Music" },
    { name: "Violin", category: "Music" },
    { name: "Drums", category: "Music" },
    { name: "Music Production", category: "Music" },
    { name: "Singing", category: "Music" },

    /**
     * Cooking
     */
    { name: "Pakistani Cooking", category: "Cooking" },
    { name: "Italian Cooking", category: "Cooking" },
    { name: "Baking", category: "Cooking" },
    { name: "BBQ & Grilling", category: "Cooking" },
    { name: "Dessert Making", category: "Cooking" },

    /**
     * Arts
     */
    { name: "Sketching", category: "Arts" },
    { name: "Painting", category: "Arts" },
    { name: "Calligraphy", category: "Arts" },
    { name: "Digital Art", category: "Arts" },
    { name: "Portrait Drawing", category: "Arts" },

    /**
     * Languages
     */
    { name: "English Speaking", category: "Languages" },
    { name: "Urdu", category: "Languages" },
    { name: "Arabic", category: "Languages" },
    { name: "Chinese", category: "Languages" },
    { name: "French", category: "Languages" },

    /**
     * Fitness
     */
    { name: "Weight Training", category: "Fitness" },
    { name: "Yoga", category: "Fitness" },
    { name: "Calisthenics", category: "Fitness" },
    { name: "Running", category: "Fitness" },
    { name: "Nutrition Planning", category: "Fitness" },

    /**
     * Business
     */
    { name: "Digital Marketing", category: "Business" },
    { name: "SEO", category: "Business" },
    { name: "Content Writing", category: "Business" },
    { name: "Public Speaking", category: "Business" },
    { name: "Entrepreneurship", category: "Business" },

    /**
     * Photography
     */
    { name: "Portrait Photography", category: "Photography" },
    { name: "Product Photography", category: "Photography" },
    { name: "Photo Editing", category: "Photography" },
    { name: "Videography", category: "Photography" },

    /**
     * Lifestyle
     */
    { name: "Gardening", category: "Lifestyle" },
    { name: "Home Organization", category: "Lifestyle" },
    { name: "Time Management", category: "Lifestyle" },
    { name: "Personal Finance", category: "Lifestyle" },
    { name: "Travel Planning", category: "Lifestyle" },
  ]);

  console.log("Skills seeded successfully");
};