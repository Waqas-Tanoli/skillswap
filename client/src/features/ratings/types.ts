export interface RatingUser {
  _id: string;
  username: string;
  avatar?: string;
}

export interface RatingSwap {
  _id: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  skillOffered?: {
    _id: string;
    name: string;
    category?: string;
  };
  skillRequested?: {
    _id: string;
    name: string;
    category?: string;
  };
}

export interface Rating {
  _id: string;

  swap: string | RatingSwap;

  rater: string | RatingUser;

  ratedUser: string | RatingUser;

  rating: number;

  review?: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateRatingPayload {
  swapId: string;

  ratedUser: string;

  rating: number;

  review?: string;
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface RatingSummary {
  averageRating: number;

  totalRatings: number;

  distribution: RatingDistribution;
}

export interface UserRatingsResponse {
  success: boolean;

  count: number;

  data: Rating[];

  summary?: RatingSummary;
}