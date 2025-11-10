import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { TransactionService } from "@/services/transactionService";
import { TransactionsFilters } from "@/store/transactionsStore";
import { TransactionValidations } from "@/utils/validations";

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
  detail: (transactionId: string) =>
    queryOptions({
      queryKey: [...transactionQueries.details(), transactionId],
      queryFn: () => fetchTransactionDetails(transactionId),
      enabled: !!transactionId,
      placeholderData: keepPreviousData,
    }),
};

async function fetchTransactionsList(filters: TransactionsFilters) {
  return await TransactionService.getAll(filters);
}

async function fetchTransactionDetails(id: string) {
  TransactionValidations.validateTransactionId(id);
  return await TransactionService.getById(id);
}
