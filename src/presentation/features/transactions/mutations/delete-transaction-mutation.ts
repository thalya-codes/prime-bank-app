import { TransactionService } from "@/data/repositories/transactionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionQueries } from "../queries";

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await TransactionService.delete(id);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() }),
  });
};
