import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { api } from "@/services/api";
import { TransactionsData } from "../types";

export const transactionQueries = {
  all: () => ["transactions"],
  lists: () => [...transactionQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...transactionQueries.lists()],
      queryFn: () => fetchTransactionsList(),
      placeholderData: keepPreviousData,
    }),

  details: () => [...transactionQueries.all(), "detail"],
  detail: (transactionId: number | undefined) =>
    queryOptions({
      queryKey: [...transactionQueries.details(), transactionId],
      queryFn: () => fetchTransactionDetails(transactionId),
      enabled: !!transactionId,
      placeholderData: keepPreviousData,
    }),
};

async function fetchTransactionsList() {
  const response = await api.get<any[]>(`/transactions`);
  console.log("response:", response.data);
  return response.data;
}

async function fetchTransactionDetails(id: number | undefined) {
  const { data } = await api.get<TransactionsData>(`/transactions/${id}`);

  return data;
}
