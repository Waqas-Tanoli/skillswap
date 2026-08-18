import api from "../../services/api";

import type {
  CreateRatingPayload,
  Rating,
  UserRatingsResponse,
} from "./types";

interface CreateRatingResponse {
  success: boolean;
  message: string;
  data?: Rating;
}

/**
 * Create a new rating
 */
export const createRating = async (
  payload: CreateRatingPayload
): Promise<CreateRatingResponse> => {
  const response = await api.post(
    "/ratings",
    payload
  );

  return response.data;
};

/**
 * Get all ratings received by a user
 */
export const getUserRatings = async (
  userId: string
): Promise<UserRatingsResponse> => {
  const response = await api.get(
    `/ratings/${userId}`
  );

  return response.data;
};