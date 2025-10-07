export type TransactionType = "receita" | "despesa" | "transferencia";

export type Transaction = {
  id: string;
  amount: number;
  type: string;
  createdAt: string;
};

export interface TransactionsData {
  data: Transaction[];
  pagination: {
    hasMore: boolean;
    itemsPerPage: number;
    nextCursorId: any;
  };
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
  anexo?: string | null;
}

// Novo tipo para o formato correto da API
export interface TransactionApiPayload {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
}
