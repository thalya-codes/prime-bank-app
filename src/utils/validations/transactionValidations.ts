export type TransactionType = 'receita' | 'despesa' | 'transferencia';

export interface TransactionValidationData {
  amount: number;
  type: string;
  accountNumber: string;
  bankAccountId?: string;
  userId?: string;
}

export class TransactionValidations {
  static validateAmount(amount: number | undefined | null): string | null {
    if (!amount || amount === 0) {
      return "Por favor, insira um valor válido";
    }

    if (amount <= 0) {
      return "O valor deve ser maior que zero";
    }

    if (amount > 1000000) {
      return "Valor máximo por transação é R$ 1.000.000,00";
    }

    return null;
  }

  static validateType(type: string | undefined | null): string | null {
    if (!type || type === "") {
      return "Selecione o tipo de transação";
    }

    const validTypes: TransactionType[] = ['receita', 'despesa', 'transferencia'];
    if (!validTypes.includes(type as TransactionType)) {
      return "Tipo de transação inválido";
    }

    return null;
  }

  static validateAccountNumber(accountNumber: string | undefined | null): string | null {
    if (!accountNumber || accountNumber === "") {
      return "Número da conta bancária não encontrado";
    }

    return null;
  }

  static validateBankAccountId(accountId: string | undefined | null): string | null {
    if (!accountId) {
      return "Conta bancária não encontrada";
    }

    if (typeof accountId !== "string") {
      return "ID da conta bancária inválido";
    }

    return null;
  }

  static validateUserId(userId: string | undefined | null): string | null {
    if (!userId) {
      return "Usuário não autenticado";
    }

    return null;
  }

  static validateCreateTransaction(data: TransactionValidationData): string | null {
    const amountError = this.validateAmount(data.amount);
    if (amountError) return amountError;

    const typeError = this.validateType(data.type);
    if (typeError) return typeError;

    const accountNumberError = this.validateAccountNumber(data.accountNumber);
    if (accountNumberError) return accountNumberError;

    if (data.bankAccountId !== undefined) {
      const bankAccountError = this.validateBankAccountId(data.bankAccountId);
      if (bankAccountError) return bankAccountError;
    }

    if (data.userId !== undefined) {
      const userIdError = this.validateUserId(data.userId);
      if (userIdError) return userIdError;
    }

    return null;
  }

  static validateUpdateTransaction(data: Partial<TransactionValidationData>): string | null {
    if (data.amount !== undefined) {
      const amountError = this.validateAmount(data.amount);
      if (amountError) return amountError;
    }

    if (data.type !== undefined) {
      const typeError = this.validateType(data.type);
      if (typeError) return typeError;
    }

    return null;
  }
}

