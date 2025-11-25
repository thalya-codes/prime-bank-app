import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { TransactionService } from "@/data/repositories/transactionService";
import { Transaction } from "@/domain/entities";
import { PaginatedResponse } from "@/domain/types";
import { TransactionsFilters } from "@/presentation/store/transactionsStore";
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

async function fetchTransactionsList(filters: TransactionsFilters): Promise<PaginatedResponse<Transaction>> {
  return await TransactionService.getAll(filters);
}

async function fetchTransactionDetails(id: string): Promise<Transaction> {
  TransactionValidations.validateTransactionId(id);
  return await TransactionService.getById(id);
}
