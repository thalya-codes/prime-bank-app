export enum FilterType {
  All = "all",
  Income = "income",
  Expense = "expense",
  Transfer = "transfer"
}

export interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  category: string | undefined;
  type: FilterType | undefined;
}
