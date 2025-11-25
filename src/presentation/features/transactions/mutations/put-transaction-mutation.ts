import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TransactionService } from "@/data/repositories/transactionService";
import { Transaction } from "@/domain/entities";
import { UpdateTransactionUseCase } from "@/domain/use-cases";
import { transactionQueries } from "../queries";

export const useEditTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Transaction) => {
      const updateTransactionUseCase = new UpdateTransactionUseCase(TransactionService);
      
      return await updateTransactionUseCase.execute({
        id: data.id,
        amount: data.amount,
        type: data.type,
        anexo: data.anexo,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() }),
  });
};
