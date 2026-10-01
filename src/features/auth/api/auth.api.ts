import { apiRequest } from "@/lib/api/apiClient";
import { ApiError } from "@/lib/api/apiError";
import type {
  AuthMeApiResponse,
  LoginCredentials,
  LoginResponseData,
  LogoutRequestBody,
  RegisterPayload,
} from "@/types/auth";
import type { User } from "@/types/user";
import { normalizeUser } from "../utils/normalizeUser";

export async function registerUser(payload: RegisterPayload): Promise<unknown> {
  return apiRequest("/auth/register", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponseData> {
  return apiRequest<LoginResponseData>("/auth/login", {
    method: "POST",
    body: credentials,
    auth: false,
  });
}

export function extractLoginToken(response: LoginResponseData): string | null {
  return response?.data?.token ?? response?.token ?? null;
}

export async function logoutUser(token: string): Promise<unknown> {
  const body: LogoutRequestBody = { token };
  return apiRequest("/auth/logout", {
    method: "POST",
    body,
  });
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await apiRequest<AuthMeApiResponse>("/auth/me");

  if (response.success && response.data) {
    return normalizeUser(response.data);
  }

  throw new ApiError(response.message || "Failed to fetch user data");
}
