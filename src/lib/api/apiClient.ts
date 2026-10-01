import { BASE_URL } from "@/constants/constants";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import type { ApiErrorData } from "@/types/api";
import { ApiError } from "./apiError";

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
};

async function parseJsonSafe(response: Response): Promise<ApiErrorData | Record<string, never>> {
  try {
    return (await response.json()) as ApiErrorData;
  } catch {
    return {};
  }
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  if (!BASE_URL) {
    throw new ApiError("NEXT_PUBLIC_API_URL is not configured");
  }

  const { body, auth = true, headers: initHeaders, ...rest } = options;
  const headers = new Headers(initHeaders);

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getAuthToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    mode: "cors",
    credentials: "include",
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await parseJsonSafe(response);

  if (!response.ok) {
    const message =
      payload.message ||
      payload.error ||
      (Array.isArray(payload.errors) ? payload.errors.join(", ") : undefined) ||
      payload.details ||
      `Request failed (${response.status})`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as TResponse;
}
