export interface CreateSwapRequest {
  receiver: string;
  skillOffered: string;
  skillRequested: string;
  message?: string;
}