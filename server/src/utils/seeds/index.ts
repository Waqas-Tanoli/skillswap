

import { seedSkills } from "./seedSkills";
import { seedUsers } from "./seedUsers";
import { seedSwaps } from "./seedSwaps";
import { seedRatings } from "./seedRating";

export const seedDatabase = async () => {
  try {
    

    await seedSkills();
    await seedUsers();
    await seedSwaps();
    await seedRatings();

    console.log("Database seeded successfully");

    
  } catch (error) {
    console.error("Database seeding failed:", error);
  }
};

