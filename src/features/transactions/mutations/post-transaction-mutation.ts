import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";
import { transactionQueries } from "../queries";
import { CreateTransactionData } from "../types";

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionData) => {
      try {
        const response = await api.post("/transactions", data);
        return response.data;
      } catch (error: any) {
        console.error("Erro na requisição:", error);
        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
          console.error("Headers:", error.response.headers);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() });
      // Removido o Alert - usando apenas Toast na HomePage
    },
    onError: (error: any) => {
      console.error("Erro ao criar transação:", error);
      // Removido o Alert - usando apenas Toast na HomePage
    },
  });
};
