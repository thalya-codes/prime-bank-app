import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";
import { transactionQueries } from "../queries";
import { TransactionFormData } from "../types";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TransactionFormData) => {
      return api.post("/transactions", {
        ...data,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() }),
  });
};
