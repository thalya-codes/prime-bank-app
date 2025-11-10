import { TransactionType } from "@/features/transactions/types";

export interface TransactionOption {
  value: TransactionType;
  label: string;
}

export const TRANSACTION_TYPES: TransactionOption[] = [
  { value: "income", label: "Receita" },
  { value: "expense", label: "Despesa" },
  { value: "transfer", label: "Transferência" },
];

