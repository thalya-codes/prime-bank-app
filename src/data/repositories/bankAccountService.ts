import { BankAccount } from '@/domain/entities';
import { IBankAccountRepository } from '@/domain/repositories';
import { api } from '@/infrastructure/http/api';
import { BankAccountMapper } from '../mappers';

export class BankAccountService {
  static async getBankAccount(): Promise<BankAccount> {
    const response = await api.get(`bankAccount/user`);
    return BankAccountMapper.toDomain(response.data);
  }
}

const _: IBankAccountRepository = BankAccountService;

