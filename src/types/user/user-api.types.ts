import type { User } from "./user.types";
import type { UserPagination } from "./user-state.types";

export interface GetUsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: string;
  excludeAdmins?: boolean;
}

export interface GetUsersResponse extends Partial<UserPagination> {
  users: User[];
}

export interface UpdateUserMutationArgs {
  userId: string | number;
  userData: Partial<User>;
}

export interface UpdateUserStatusArgs {
  userId: string | number;
  status: string;
}

export interface UpdateUserRoleArgs {
  userId: string | number;
  role: string;
}

export interface RemoveUserRoleArgs {
  userId: string | number;
  role: string;
}

export interface ApiSuccessEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}
