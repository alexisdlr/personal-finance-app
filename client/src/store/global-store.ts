// store/global-store.ts
import { Balance, Budget, Pot, Transaction } from "@/types/global";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  balance: Balance | null;
  budgets: Budget[];
  pots: Pot[];
  transactions: Transaction[];
  paidBills: number;
  totalUpcoming: number;
  dueSoon: number;
  // Recurring bills
  setGlobalData: (data: {
    budgets: Budget[];
    pots: Pot[];
    balance: Balance;
    transactions: Transaction[];
    paidBills: number;
    totalUpcoming: number;
    dueSoon: number;
  }) => void;
  deleteState: () => void;
}

export const useGlobalState = create<GlobalState>()(
  persist(
    (set) => ({
      balance: null,
      pots: [],
      transactions: [],
      budgets: [],
      paidBills: 0,
      totalUpcoming: 0,
      dueSoon: 0,
      deleteState: () =>
        set({
          pots: [],
          budgets: [],
          transactions: [],
          balance: null,
          paidBills: 0,
          totalUpcoming: 0 ,
          dueSoon: 0,

        }),
      setGlobalData: (data) =>
        set({
          pots: data.pots,
          budgets: data.budgets,
          transactions: data.transactions,
          balance: data.balance,
          paidBills: data.paidBills,
          totalUpcoming: data.totalUpcoming,
          dueSoon: data.dueSoon,
          
        }),
    }),
    {
      name: "global-storage",
    }
  )
);
