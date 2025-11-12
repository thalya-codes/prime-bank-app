import { ITransactionRepository } from '../repositories';

export class DeleteTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID da transação é obrigatório');
    }

    return await this.transactionRepository.delete(id);
  }
}

