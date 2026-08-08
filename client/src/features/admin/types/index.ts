export interface DashboardStats {
  users: {
    total: number;
    verified: number;
    banned: number;
  };

  swaps: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    completed: number;
  };

  skills: {
    total: number;
    pendingRequests: number;
  };

  ratings: {
    total: number;
    average: number;
  };
}

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  trustScore: number;
  isVerified: boolean;
  isBanned: boolean;
  createdAt: string;
}

export interface SkillRequest {
  _id: string;
  name: string;
  category: string;

  status:
    | "Pending"
    | "Approved"
    | "Rejected";

  requestedBy: {
    _id: string;
    username: string;
    email: string;
  };

  createdAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
}

export interface Swap {
  _id: string;

  requester: {
    _id: string;
    username: string;
  };

  receiver: {
    _id: string;
    username: string;
  };

  status:
    | "pending"
    | "accepted"
    | "rejected"
    | "completed";

  createdAt: string;
}
export interface AdminSkillRequest {
  _id: string;

  name: string;

  category: string;

  description?: string;

  requestedBy:
    | string
    | {
        _id: string;
        username: string;
        email?: string;
        avatar?: string;
      };

  status:
    | "Pending"
    | "Approved"
    | "Rejected";

  rejectionReason?: string;

  createdAt: string;

  updatedAt: string;
}
export type SwapStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "completed";

export interface AdminSwapUser {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  trustScore?: number;
}

export interface AdminSwapSkill {
  _id: string;
  name: string;
  category: string;
}

export interface AdminSwap {
  _id: string;

  sender: AdminSwapUser;
  receiver: AdminSwapUser;

  skillOffered: AdminSwapSkill;
  skillRequested: AdminSwapSkill;

  message?: string;

  status: SwapStatus;

  createdAt: string;
  updatedAt: string;
}