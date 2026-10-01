import type { User } from "@/types/user";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  redirectPath: string | null;
  lastFetched: number | null;
}

export interface SetCredentialsPayload {
  user: User;
  token: string;
}

export interface InitializeAuthPayload {
  user: User | null;
  token: string | null;
}
