import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

import { api } from "@/services/api";
import { transactionQueries } from "../queries";
import { TransactionFormData } from "../types";

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TransactionFormData) => {
      const response = await api.post("/transactions", {
        ...data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() });
      Alert.alert("Sucesso", "Transação realizada com sucesso!");
    },
    onError: error => {
      console.error("Erro ao criar transação:", error);
      Alert.alert(
        "Erro",
        "Não foi possível realizar a transação. Tente novamente."
      );
    },
  });
};
