export interface Skill {
  _id: string;
  name: string;
  category: string;
}

export interface UserSkill {
  skill: Skill;
  level: "beginner" | "intermediate" | "advanced";
}

export interface UserProfile {
  _id: string;

  username: string;

  email?: string;

  bio: string;

  location: string;

  avatar: string;

  trustScore: number;

  role: "user" | "admin";

  isVerified: boolean;

  skillsToTeach: UserSkill[];

  skillsToLearn: UserSkill[];

  createdAt: string;

  updatedAt: string;
}