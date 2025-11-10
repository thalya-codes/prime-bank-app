import { api } from './api';
import { generateSearchParams } from '@/hooks/generateSearchParams';

export interface TransactionFilters {
  minAmount?: number;
  maxAmount?: number;
  itemsPerPage?: number;
  month?: string;
}

export class TransactionService {
  static async create(data: any): Promise<any> {
    const response = await api.post("/transactions", data);
    return response.data;
  }

  static async getAll(filters: TransactionFilters = {}): Promise<any> {
    const params = generateSearchParams(filters);
    const response = await api.get(`/transactions?${params}`);
    return response.data;
  }

  static async getById(id: string): Promise<any> {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  }

  static async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  }

  static async delete(id: string): Promise<any> {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  }
}

