import { IBankAccountRepository, ITransactionRepository } from '../repositories';

export interface CreateTransactionInput {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  type: string;
  anexo?: string | null;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private bankAccountRepository: IBankAccountRepository
  ) {}

  async execute(input: CreateTransactionInput): Promise<any> {
    if (input.amount <= 0) {
      throw new Error('O valor deve ser maior que zero');
    }

    if (input.type === 'expense') {
      const bankAccount = await this.bankAccountRepository.getBankAccount();
      
      if (!bankAccount.hasSufficientBalance(input.amount)) {
        throw new Error('Saldo insuficiente para realizar esta transação');
      }
    }

    return await this.transactionRepository.create(input);
  }
}


