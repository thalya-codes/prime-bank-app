export enum FilterType {
  All = "all",
  Income = "income",
  Expense = "expense",
}

export interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  category: string;
  type: FilterType;
}
