import api  from "../../services/api";
import type { CreateSwapRequest } from "./types";

export const sendSwapRequest = (
  data: CreateSwapRequest
) => {
  return api.post("/swaps/send", data);
};