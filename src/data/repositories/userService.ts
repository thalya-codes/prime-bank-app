import { api } from './api';

export class UserService {
  static async getUser(): Promise<any> {
    const response = await api.get(`user`);
    return response.data;
  }

  static async create(data: any): Promise<any> {
    return api.post(`users`, data);
  }
}

