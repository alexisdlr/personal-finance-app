import { Balance, Budget, Pot, Transaction } from "@/types/global";

export interface OverviewResponse {
  message: string;
  data: {
    pots: Pot[];
    budgets: Budget[];
    transactions: Transaction[];
    recurringBills: Transaction[];
    balance: Balance;
    paidBills: number;
    totalBills: number;
    dueSoon: number;
  };
}
