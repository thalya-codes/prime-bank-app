import { BankAccount } from "../entities";

export interface IBankAccountRepository {
  getBankAccount(): Promise<BankAccount>;
}

