
import api from "../../services/api";
import type { Match } from "./types";

export const getMatches = async (): Promise<Match[]> => {
  const response = await api.get("/matches");

  return response.data.data;
};