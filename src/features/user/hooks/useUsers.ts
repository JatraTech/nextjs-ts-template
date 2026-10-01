"use client";

import {
  deleteUser,
  fetchUserById,
  fetchUsers,
  removeUserRole,
  updateUser,
  updateUserRole,
  updateUserStatus,
} from "@/features/user/api/user.api";
import { queryKeys } from "@/lib/queryKeys";
import type { GetUsersQueryParams } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUsersQuery(params?: GetUsersQueryParams) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => fetchUsers(params),
    staleTime: 1000 * 60 * 2,
  });
}

export function useUserByIdQuery(userId: string | number | null | undefined) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId ?? "unknown"),
    queryFn: () => fetchUserById(userId as string | number),
    enabled: userId !== null && userId !== undefined && userId !== "",
  });
}

function useInvalidateUsers() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
}

export function useUpdateUserMutation() {
  const invalidateUsers = useInvalidateUsers();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: invalidateUsers,
  });
}

export function useUpdateUserStatusMutation() {
  const invalidateUsers = useInvalidateUsers();
  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: invalidateUsers,
  });
}

export function useUpdateUserRoleMutation() {
  const invalidateUsers = useInvalidateUsers();
  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: invalidateUsers,
  });
}

export function useRemoveUserRoleMutation() {
  const invalidateUsers = useInvalidateUsers();
  return useMutation({
    mutationFn: removeUserRole,
    onSuccess: invalidateUsers,
  });
}

export function useDeleteUserMutation() {
  const invalidateUsers = useInvalidateUsers();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: invalidateUsers,
  });
}
