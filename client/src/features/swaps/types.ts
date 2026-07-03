export interface CreateSwapRequest {
  receiver: string;
  skillOffered: string;
  skillRequested: string;
  message?: string;
  
}
export type SwapStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "completed";

export interface SwapUser {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  trustScore?: number;
}
export interface SwapSkill {
  _id: string;
  name: string;
  category: string;
}


export interface Swap {
  _id: string;

  sender: SwapUser;
  receiver: SwapUser;

  skillOffered: SwapSkill;
  skillRequested: SwapSkill;

  message?: string;

  status: SwapStatus;

  createdAt: string;
}
 







