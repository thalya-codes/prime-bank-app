import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TransactionService } from "@/data/repositories/transactionService";
import { transactionQueries } from "../queries";
import { Transaction } from "../types";

export const useEditTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Transaction) => {
      return await TransactionService.update(data.id, { ...data });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() }),
  });
};
