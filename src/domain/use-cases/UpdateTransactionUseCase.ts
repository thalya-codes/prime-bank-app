import { ITransactionRepository } from '../repositories';

export interface UpdateTransactionInput {
  id: string;
  amount?: number;
  type?: string;
  anexo?: string;
}

export class UpdateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(input: UpdateTransactionInput): Promise<any> {
    if (!input.id) {
      throw new Error('ID da transação é obrigatório');
    }

    if (input.amount !== undefined && input.amount <= 0) {
      throw new Error('O valor deve ser maior que zero');
    }

    return await this.transactionRepository.update(input.id, input);
  }
}

