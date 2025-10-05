export interface TransactionsData {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  date: string;
  anexo: null;
  urlAnexo: null;
  associatedUser: string;
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
