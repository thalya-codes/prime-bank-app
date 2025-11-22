export class BankAccount {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bankAccountNumber: string,
    public readonly balance: number,
    public readonly createdAt: {
      _seconds: number;
      _nanoseconds: number;
    },
    public readonly name?: string
  ) {}

  hasBalance(): boolean {
    return this.balance > 0;
  }

  hasSufficientBalance(amount: number): boolean {
    return this.balance >= amount;
  }

  formattedBalance(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.balance);
  }

  formattedAccountNumber(): string {
    if (this.bankAccountNumber.length === 16) {
      return this.bankAccountNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1.$2.$3.$4');
    }
    return this.bankAccountNumber;
  }

  maskedAccountNumber(): string {
    if (this.bankAccountNumber.length >= 4) {
      const lastFour = this.bankAccountNumber.slice(-4);
      return `****${lastFour}`;
    }
    return this.bankAccountNumber;
  }
}

