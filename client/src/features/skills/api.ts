

import api from "../../services/api";
import type { Skill } from "./types";   

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get("/skills");

  return response.data.data;
};