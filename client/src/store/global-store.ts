// store/global-store.ts
import { Balance, Budget, Pot, Transaction } from "@/types/global";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  balance: Balance | null;
  budgets: Budget[];
  pots: Pot[];
  transactions: Transaction[];
  setGlobalData: (data: {
    budgets: Budget[];
    pots: Pot[];
    balance: Balance;
    transactions: Transaction[];
  }) => void;
}

export const useGlobalState = create<GlobalState>()(
  persist(
    (set) => ({
      balance: null,
      pots: [],
      transactions: [],
      budgets: [],
      setGlobalData: (data) =>
        set({
          pots: data.pots,
          budgets: data.budgets,
          transactions: data.transactions,
          balance: data.balance
        }),
    }),
    {
      name: "global-storage",
    }
  )
);
