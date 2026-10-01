import type { User } from "./user.types";

export type UserListSortOrder = "asc" | "desc";

export interface UserFilters {
  search: string;
  isActive: string;
  role: string;
  sortBy: string;
  sortOrder: UserListSortOrder | string;
}

export interface UserPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
  pagination: UserPagination;
}

export interface SetUsersPayload {
  users?: User[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}
