import { Transaction } from '../entities';
import { ITransactionRepository, TransactionFilters } from '../repositories';
import { PaginatedResponse } from '../types';

export class GetTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(filters?: TransactionFilters): Promise<PaginatedResponse<Transaction>> {
    return await this.transactionRepository.getAll(filters);
  }
}

