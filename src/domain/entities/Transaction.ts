import { TransactionType } from "@/presentation/features/transactions";
import { firestoreToZulu } from "@/utils/masks";

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly fromAccountNumber: string,
    public readonly toAccountNumber: string,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly createdAt: {
      _seconds: number;
      _nanoseconds: number;
    },
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
    return firestoreToZulu(this.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  formattedDateTime(): string {
    return firestoreToZulu(this.createdAt).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formattedMonth(): string {
    return firestoreToZulu(this.createdAt).toLocaleString('pt-BR', {
      month: 'long',
    });
  }
}

