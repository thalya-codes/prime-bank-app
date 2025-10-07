export type TransactionType = "receita" | "despesa" | "transferencia";

export interface TransactionsData {
  id: string;
  amount: number;
  type: string;
  createdAt: string;
}

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
  anexo?: string;
}

// Novo tipo para o formato correto da API
export interface TransactionApiPayload {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
}
