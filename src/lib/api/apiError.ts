import type { ApiErrorData } from "@/types/api";

export class ApiError extends Error {
  status?: number;
  data?: ApiErrorData;

  constructor(message: string, status?: number, data?: ApiErrorData) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
