import type { User } from "@/types/user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginResponseData {
  token?: string;
  data?: {
    token?: string;
    user?: User;
  };
}

export interface AuthMeApiResponse {
  success: boolean;
  data: User;
  message?: string;
}

export interface LogoutRequestBody {
  token: string;
}
