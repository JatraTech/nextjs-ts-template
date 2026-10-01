import { apiRequest } from "@/lib/api/apiClient";
import { ApiError } from "@/lib/api/apiError";
import type {
  ApiSuccessEnvelope,
  GetUsersQueryParams,
  GetUsersResponse,
  RemoveUserRoleArgs,
  UpdateUserMutationArgs,
  UpdateUserRoleArgs,
  UpdateUserStatusArgs,
} from "@/types/user";
import type { User } from "@/types/user";

const emptyUsersResponse = (): GetUsersResponse => ({
  users: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  hasNextPage: false,
  hasPrevPage: false,
});

export async function fetchUsers(
  params?: GetUsersQueryParams,
): Promise<GetUsersResponse> {
  const safeParams = params ?? {};
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "all",
    role = "all",
    sortBy = "created_at",
    sortOrder = "desc",
    excludeAdmins = false,
  } = safeParams;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    sortOrder,
  });

  if (search) queryParams.append("search", search);
  if (status !== "all") queryParams.append("status", status);
  if (role !== "all") queryParams.append("role", role);
  if (excludeAdmins) queryParams.append("excludeAdmins", "true");

  const response = await apiRequest<
    ApiSuccessEnvelope<GetUsersResponse> | GetUsersResponse
  >(`/users?${queryParams.toString()}`);

  if ("success" in response && response.success && response.data) {
    return response.data;
  }

  if ("users" in response) {
    return response;
  }

  return emptyUsersResponse();
}

export async function fetchUserById(userId: string | number): Promise<User> {
  const response = await apiRequest<ApiSuccessEnvelope<User>>(`/users/${userId}`);

  if (response.success && response.data) {
    return response.data;
  }

  throw new ApiError(response.message || "Failed to fetch user data");
}

export async function updateUser({ userId, userData }: UpdateUserMutationArgs): Promise<User> {
  return apiRequest<User>(`/users/${userId}`, {
    method: "PATCH",
    body: userData,
  });
}

export async function updateUserStatus({ userId, status }: UpdateUserStatusArgs): Promise<User> {
  return apiRequest<User>(`/users/${userId}/status`, {
    method: "PATCH",
    body: { status },
  });
}

export async function updateUserRole({ userId, role }: UpdateUserRoleArgs): Promise<User> {
  return apiRequest<User>(`/users/${userId}/role`, {
    method: "PATCH",
    body: { role },
  });
}

export async function removeUserRole({ userId, role }: RemoveUserRoleArgs): Promise<User> {
  return apiRequest<User>(`/users/${userId}/role/remove`, {
    method: "PATCH",
    body: { role },
  });
}

export async function deleteUser(userId: string | number): Promise<unknown> {
  return apiRequest(`/users/${userId}`, { method: "DELETE" });
}
