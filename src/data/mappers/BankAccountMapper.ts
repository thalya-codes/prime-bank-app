import { BankAccount } from '@/domain/entities';

export class BankAccountMapper {
  static toDomain(dto: any): BankAccount {
    return new BankAccount(
      dto.id,
      dto.associatedUser || dto.userId,
      dto.bankAccountNumber,
      dto.balance,
      dto.createdAt,
      dto.name
    );
  }

  static toDTO(account: BankAccount): any {
    
    return {
      id: account.id,
      userId: account.userId,
      bankAccountNumber: account.bankAccountNumber,
      balance: account.balance,
      createdAt: account.createdAt,
      name: account.name,
    };
  }
}

