export interface Pagination {
  hasMore: boolean;
  itemsPerPage: number;
  nextCursorId?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  data?: any;
}

export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

