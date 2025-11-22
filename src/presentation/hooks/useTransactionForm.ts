import { useCallback, useEffect, useState } from "react";

import { useGetBankAccount } from "@/presentation/features/bankAccount/queries";
import { useCreateTransactionMutation } from "@/presentation/features/transactions/mutations";
import {
  CreateTransactionData,
  TransactionType,
} from "@/presentation/features/transactions/types";
import useAuthStore from "@/presentation/store/useAuthStore";
import { showErrorToast } from "@/utils/helpers";
import { currencyMasks, currencyToNumbers } from "@/utils/masks";
import { TransactionValidations } from "@/utils/validations";

export const useTransactionForm = () => {
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    TransactionType | ""
  >("");
  const [transactionValue, setTransactionValue] = useState<string>("");

  const { uid } = useAuthStore();
  const { data: bankAccount } = useGetBankAccount();
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
    const fieldsError = TransactionValidations.validateFormFields(
      selectedTransactionType, 
      transactionValue, 
      uid
    );
    
    if (fieldsError) {
      showErrorToast("Erro", fieldsError);
      return;
    }

    const numericValue = currencyToNumbers(transactionValue);

    const valueError = TransactionValidations.validatePositiveValue(numericValue);
    
    if (valueError) {
      showErrorToast("Erro", valueError);
      return;
    }

    if (selectedTransactionType === "expense" && bankAccount) {
      if (!bankAccount.hasSufficientBalance(numericValue)) {
        showErrorToast("Saldo insuficiente", "Você não tem saldo suficiente para esta transação");
        return;
      }
    }

    if (!uid) {
      showErrorToast("Erro", "Usuário não identificado");
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
