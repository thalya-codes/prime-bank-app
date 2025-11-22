import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BankAccountService } from "@/data/repositories/bankAccountService";
import { TransactionService } from "@/data/repositories/transactionService";
import { CreateTransactionUseCase } from "@/domain/use-cases";
import { transactionQueries } from "../queries";
import { CreateTransactionData } from "../types";

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionData) => {
      const createTransactionUseCase = new CreateTransactionUseCase(
        TransactionService,
        BankAccountService
      );
      
      return await createTransactionUseCase.execute(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueries.all() });
    },
    onError: (error: any) => {
      console.error("Erro ao criar transação:", error);
    },
  });
};
