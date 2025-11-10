import { api } from './api';

export class BankAccountService {
  static async getBankAccount(): Promise<any> {
    const response = await api.get(`bankAccount`);
    return response.data;
  }
}

