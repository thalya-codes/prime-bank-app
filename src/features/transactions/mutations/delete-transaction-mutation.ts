import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";
import { transactionQueries } from "../queries";

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return api.delete(`/transactions/${id}`);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() }),
  });
};
