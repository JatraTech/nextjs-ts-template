import type { GetUsersQueryParams } from "@/types/user";

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (params?: GetUsersQueryParams) =>
      [...queryKeys.users.lists(), params ?? {}] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (userId: string | number) =>
      [...queryKeys.users.details(), userId] as const,
  },
} as const;
