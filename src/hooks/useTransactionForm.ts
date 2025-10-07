import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { useCreateTransactionMutation } from "@/features/transactions/mutations";
import {
  CreateTransactionData,
  TransactionType,
} from "@/features/transactions/types";
import useAuthStore from "@/store/useAuthStore";
import { currencyMasks, currencyToNumbers } from "@/utils/masks";

export const useTransactionForm = () => {
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    TransactionType | ""
  >("");
  const [transactionValue, setTransactionValue] = useState<string>("");

  const { uid } = useAuthStore();
  const createTransactionMutation = useCreateTransactionMutation();

  const handleValueChange = useCallback((value: string) => {
    const maskedValue = currencyMasks(value);
    setTransactionValue(maskedValue);
  }, []);

  const resetForm = useCallback(() => {
    setSelectedTransactionType("");
    setTransactionValue("");
  }, []);

  // Reset form when transaction is successful
  useEffect(() => {
    if (createTransactionMutation.isSuccess) {
      resetForm();
    }
  }, [createTransactionMutation.isSuccess, resetForm]);

  const handleTransactionSubmit = useCallback(() => {
    if (!selectedTransactionType || !transactionValue || !uid) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    const numericValue = currencyToNumbers(transactionValue);

    if (numericValue <= 0) {
      Alert.alert("Erro", "O valor deve ser maior que zero");
      return;
    }

    // Para este exemplo, estou usando a mesma conta para from e to
    // Em uma implementação real, você precisaria determinar as contas baseado no tipo de transação
    const transactionData: CreateTransactionData = {
      fromAccountId: uid, // Conta do usuário logado
      toAccountId: uid, // Para receita/despesa, pode ser a mesma conta ou uma conta sistema
      amount: numericValue,
      type: selectedTransactionType as TransactionType,
      anexo: undefined, // Opcional
    };

    createTransactionMutation.mutate(transactionData);
  }, [
    selectedTransactionType,
    transactionValue,
    uid,
    createTransactionMutation,
  ]);

  return {
    selectedTransactionType,
    setSelectedTransactionType,
    transactionValue,
    handleValueChange,
    handleTransactionSubmit,
    resetForm,
    isLoading: createTransactionMutation.isPending,
    isSuccess: createTransactionMutation.isSuccess,
    error: createTransactionMutation.error,
  };
};
