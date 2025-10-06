import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { api } from "@/services/api";
import { UserData } from "../types";

export const userQueries = {
  all: () => ["users"],
  details: () => [...userQueries.all(), "user-detail"],
  detail: (userId: string | undefined) =>
    queryOptions({
      queryKey: [...userQueries.details(), userId],
      queryFn: () => fetchUserDetails(userId),
      enabled: !!userId,
      placeholderData: keepPreviousData,
    }),
};

async function fetchUserDetails(userId?: string) {
  const response = await api.get<UserData>(`/users/${userId}`);
  console.log("fetchUserDetails response:", response);
  return response.data;
}
