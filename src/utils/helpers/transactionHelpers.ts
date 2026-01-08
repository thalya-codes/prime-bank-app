import { TransactionType } from "@/presentation/features/transactions";

export function buildTransactionData(
  fromAccountNumber: string | undefined,
  toAccountNumber: string | undefined,
  amount: string | number,
  receipt: any,
  category: "others" | "investiments",
  type: TransactionType
): any {
  return {
    fromAccountNumber,
    toAccountNumber,
    amount,
    anexo: receipt,
    category,
    type,
  };
}

export function extractErrorMessage(
  error: any,
  defaultMessage: string = "Tente novamente"
): string {
  return error.response?.data?.message || defaultMessage;
}

