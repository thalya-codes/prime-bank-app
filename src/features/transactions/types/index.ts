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
  anexo: string;
}
