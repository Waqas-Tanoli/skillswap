import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong"
): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse;

    return data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};