export type Skill = {
  _id: string;
  name: string;
  category?: string;
};

export type UserSkill = {
  _id: string;
  skill: Skill;
  level: "beginner" | "intermediate" | "advanced";
};

export type MatchUser = {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;

  skillsToTeach: UserSkill[];
  skillsToLearn: UserSkill[];
};

export type Match = {
  user: MatchUser;
  score: number;
};