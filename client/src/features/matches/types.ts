export interface MatchUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  trustScore?: number;
}

export interface Match {
  user: MatchUser;
  score: number;
  teachMatch: string[];
  learnMatch: string[];
}