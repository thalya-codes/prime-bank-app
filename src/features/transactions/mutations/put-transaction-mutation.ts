import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";
import { transactionQueries } from "../queries";
import { TransactionFormData } from "../types";

export const useEditTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TransactionFormData) => {
      return api.put(`/transactions/${data.id}`, {
        ...data,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() }),
  });
};
