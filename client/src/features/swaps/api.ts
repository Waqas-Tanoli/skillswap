import api  from "../../services/api";
import type { CreateSwapRequest, Swap } from "./types";

export const sendSwapRequest = (
  data: CreateSwapRequest
) => {
  return api.post("/swaps/send", data);
};

export const getUserSwaps = async (): Promise<
  Swap[]
> => {
  const response = await api.get("/swaps");

  return response.data.data;
};

export const acceptSwap = (id: string) => {
  return api.patch(`/swaps/${id}/accept`);
};

export const rejectSwap = (id: string) => {
  return api.patch(`/swaps/${id}/reject`);
};

export const completeSwap = (id: string) => {
  return api.patch(`/swaps/${id}/complete`);
};