"use client";

import {
  extractLoginToken,
  loginUser,
  logoutUser,
  registerUser,
} from "@/features/auth/api/auth.api";
import { fetchCurrentUser } from "@/features/auth/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import { queryKeys } from "@/lib/queryKeys";
import { setAuthToken } from "@/lib/auth/tokenStorage";
import type { LoginCredentials, RegisterPayload } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const { setCredentials } = useAuth();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await loginUser(credentials);
      const token = extractLoginToken(response);

      if (!token) {
        throw new Error("No token received from server");
      }

      setAuthToken(token);
      const user = await fetchCurrentUser();
      return { response, token, user };
    },
    onSuccess: ({ token, user }) => {
      setCredentials({ token, user });
      queryClient.setQueryData(queryKeys.auth.me(), user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const { logout, token } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (token) {
        await logoutUser(token);
      }
    },
    onSettled: () => {
      logout();
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });
      queryClient.removeQueries({ queryKey: queryKeys.users.all });
    },
  });
}
