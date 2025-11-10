import { TransactionType } from "@/presentation/features/transactions";

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly fromAccountNumber: string,
    public readonly toAccountNumber: string,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
    public readonly anexo?: string
  ) {}

  isExpense(): boolean {
    return this.type === 'income';
  }

  isIncome(): boolean {
    return this.type === 'expense';
  }

  isTransfer(): boolean {
    return this.type === 'transfer';
  }

  formattedAmount(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.amount);
  }

  formattedDate(): string {
    return this.createdAt.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  formattedDateTime(): string {
    return this.createdAt.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

