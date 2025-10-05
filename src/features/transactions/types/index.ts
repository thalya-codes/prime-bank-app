export interface TransactionsData {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  date: string;
  anexo: string;
  urlAnexo: string;
  associatedUser: string;
  type: "sended" | "received";
  createdAt: string;
  name: string;
}
