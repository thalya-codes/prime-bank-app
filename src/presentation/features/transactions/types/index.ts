export type TransactionType = "income" | "expense" | "transfer";

export interface TransactionFormData {
  id?: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  type: TransactionType;
  anexo?: string;
}

export interface CreateTransactionData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  type: TransactionType;
  anexo?: string | null;
}

// Novo tipo para o formato correto da API
export interface TransactionApiPayload {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
}
