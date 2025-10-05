import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export interface TransactionsFilters {
  itemsPerPage?: number;
  lastItemId?: number;
  minAmount?: number;
  maxAmount?: number;
  month?: string;
}

interface TransactionsFilterStore {
  filters: TransactionsFilters;
  resetFilters: () => void;
  setFilters: (filters: TransactionsFilters) => void;
}

const INITIAL_STATE: TransactionsFilters = {
  itemsPerPage: 10,
  lastItemId: undefined,
  minAmount: undefined,
  maxAmount: undefined,
  month: undefined,
};

const transactionsFilterStore = createWithEqualityFn<TransactionsFilterStore>()(
  devtools(
    persist(
      (set) => ({
        filters: INITIAL_STATE,

        setFilters: (filters) => {
          set(
            (oldState) => ({
              filters: { ...oldState.filters, ...filters },
            }),
            false,
            "set-transactions-filters"
          );
        },

        resetFilters: () => {
          set(
            {
              filters: INITIAL_STATE,
            },
            false,
            "reset-transactions-filters"
          );
        },
      }),
      {
        name: "transactions-filter-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    { name: "transactions-filter-store" }
  ),
  shallow
);

export const resetTransactionsFilters =
  transactionsFilterStore.getState().resetFilters;

export {
  TransactionsFilterStore,
  transactionsFilterStore as useTransactionsFilters,
};
