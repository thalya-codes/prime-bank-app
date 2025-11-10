
export interface TransactionFilters {
  minAmount?: number;
  maxAmount?: number;
  itemsPerPage?: number;
  month?: string;
}

export interface ITransactionRepository {
  create(data: any): Promise<any>;
  getAll(filters?: TransactionFilters): Promise<any>;
  getById(id: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}

