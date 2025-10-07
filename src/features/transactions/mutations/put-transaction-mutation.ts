import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";
import { transactionQueries } from "../queries";
import { Transaction } from "../types";

export const useEditTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Transaction) => {
      return api.put(`/transactions/${data.id}`, { 
        ...data,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() }),
  });
};
