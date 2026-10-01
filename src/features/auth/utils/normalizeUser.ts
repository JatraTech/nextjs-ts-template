import type { User } from "@/types/user";

export function normalizeUser(user: User): User {
  const normalized: User = {
    ...user,
    createdAt: user.createdAt || user.created_at,
    updatedAt: user.updatedAt || user.updated_at,
  };

  if (normalized.created_at) delete normalized.created_at;
  if (normalized.updated_at) delete normalized.updated_at;

  return normalized;
}
