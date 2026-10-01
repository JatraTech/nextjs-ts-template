"use client";

import { fetchCurrentUser } from "@/features/auth/api/auth.api";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUserQuery(
  token: string | null,
  options?: { enabled?: boolean },
) {
  const enabled = Boolean(token) && (options?.enabled ?? true);

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: fetchCurrentUser,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCurrentUserFromSession(token: string | null, isInitialized: boolean) {
  return useCurrentUserQuery(token, { enabled: isInitialized });
}
