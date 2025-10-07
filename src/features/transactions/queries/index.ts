import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { generateSearchParams } from "@/hooks/generateSearchParams";
import { api } from "@/services/api";
import { TransactionsFilters } from "@/store/transactionsStore";
import { Transaction, TransactionsData } from "../types";

export const transactionQueries = {
  all: () => ["transactions"],
  lists: () => [...transactionQueries.all(), "list"],
  list: (filter: TransactionsFilters)  =>
    queryOptions({
      queryKey: [...transactionQueries.lists(), filter],
      queryFn: () => fetchTransactionsList(filter),
      placeholderData: keepPreviousData,
    }),

  details: () => [...transactionQueries.all(), "detail"],
  detail: (transactionId: string | undefined) =>
    queryOptions({
      queryKey: [...transactionQueries.details(), transactionId],
      queryFn: () => fetchTransactionDetails(transactionId),
      enabled: !!transactionId,
      placeholderData: keepPreviousData,
    }),
};

async function fetchTransactionsList(filters: TransactionsFilters) {
  const params = generateSearchParams(filters);

  const response = await api.get<TransactionsData>(`/transactions?${params}`);

  return response.data;
}

async function fetchTransactionDetails(id: string | undefined) {
  const { data } = await api.get<Transaction>(`/transactions/${id}`);

  return data;
}
