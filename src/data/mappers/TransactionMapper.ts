import { Transaction } from '@/domain/entities';

export class TransactionMapper {
  static toDomain(dto: any): Transaction {
    
    const transaction = new Transaction(
      dto.id,
      dto.fromAccountNumber,
      dto.toAccountNumber,
      dto.amount,
      dto.type,
      dto.createdAt,
      dto.anexo
    );
    return transaction;
  }

  static toDomainList(dtos: any[]): Transaction[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  static toDTO(transaction: Transaction): any {
    return {
      id: transaction.id,
      fromAccountNumber: transaction.fromAccountNumber,
      toAccountNumber: transaction.toAccountNumber,
      amount: transaction.amount,
      type: transaction.type,
      createdAt: transaction.createdAt,
      anexo: transaction.anexo,
    };
  }
}

