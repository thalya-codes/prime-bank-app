import { TransactionsFilters } from "@/store/transactionsStore";

type GenericFilters = Record<string, string | string[] | undefined>;

type Filters = TransactionsFilters | GenericFilters;

const generateSearchParams = (filters: Filters) => {
  const urlParams = new URLSearchParams(
    Object.entries(filters)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => [key, v]);
        }
        if (typeof value !== "undefined") {
          return [[key, value]];
        }
        return [];
      })
      .flat()
  );
  return urlParams.toString();
};

export { generateSearchParams };
