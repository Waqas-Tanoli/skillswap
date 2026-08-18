import { create } from "zustand";

import {
  createRating,
  getUserRatings,
} from "../features/ratings/api";

import type {
  CreateRatingPayload,
  Rating,
  RatingSummary,
} from "../features/ratings/types";
import { getErrorMessage } from "../utils/getErrorMessage";

interface RatingState {
  ratings: Rating[];

  summary: RatingSummary | null;

  loading: boolean;

  submitting: boolean;

  error: string | null;

  successMessage: string | null;

  fetchUserRatings: (
    userId: string
  ) => Promise<void>;

  submitRating: (
    payload: CreateRatingPayload
  ) => Promise<void>;

  clearError: () => void;

  clearSuccessMessage: () => void;

  reset: () => void;
}

export const useRatingStore =
  create<RatingState>((set) => ({
    ratings: [],

    summary: null,

    loading: false,

    submitting: false,

    error: null,

    successMessage: null,

    /**
     * Fetch ratings received by a user
     */
    fetchUserRatings: async (
      userId: string
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await getUserRatings(userId);

        set({
          ratings: response.data ?? [],

          summary:
            response.summary ?? null,

          loading: false,
        });
      } catch (error: unknown) {
        console.error(
          "Failed to fetch user ratings:",
          error
        );

        set({
          loading: false,

          error:
            getErrorMessage(error) ??
            "Failed to fetch ratings",
        });
      }
    },

    /**
     * Submit a rating
     */
    submitRating: async (
      payload: CreateRatingPayload
    ) => {
      try {
        set({
          submitting: true,

          error: null,

          successMessage: null,
        });

        const response =
          await createRating(payload);

        set({
          submitting: false,

          successMessage:
            response.message ||
            "Rating submitted successfully",
        });
      } catch (error:unknown) {
        console.error(
          "Failed to submit rating:",
          error
        );

        set({
          submitting: false,

          error:
            getErrorMessage(error) ??
            "Failed to submit rating",
        });

        throw error;
      }
    },

    /**
     * Clear error
     */
    clearError: () => {
      set({
        error: null,
      });
    },

    /**
     * Clear success message
     */
    clearSuccessMessage: () => {
      set({
        successMessage: null,
      });
    },

    /**
     * Reset rating store
     */
    reset: () => {
      set({
        ratings: [],

        summary: null,

        loading: false,

        submitting: false,

        error: null,

        successMessage: null,
      });
    },
  }));