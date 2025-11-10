import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TransactionService } from "@/data/repositories/transactionService";
import { transactionQueries } from "../queries";
import { CreateTransactionData } from "../types";

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionData) => {
      return await TransactionService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() });
    },
    onError: (error: any) => {
      console.error("Erro ao criar transação:", error);
    },
  });
};
