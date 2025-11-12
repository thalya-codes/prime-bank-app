import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TransactionService } from "@/data/repositories/transactionService";
import { DeleteTransactionUseCase } from "@/domain/use-cases";
import { transactionQueries } from "../queries";

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const deleteTransactionUseCase = new DeleteTransactionUseCase(TransactionService);
      
      return await deleteTransactionUseCase.execute(id);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() }),
  });
};
