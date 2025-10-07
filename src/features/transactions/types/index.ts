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
  anexo?: string;
}

export interface CreateTransactionData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  anexo?: string;
}

export type TransactionType = "receita" | "despesa" | "transferencia";
