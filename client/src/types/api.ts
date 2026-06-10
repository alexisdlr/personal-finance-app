import { Balance, Budget, Pot, Transaction } from "@/types/global";

export interface OverviewResponse {
  message: string;
  data: {
    pots: Pot[];
    budgets: Budget[];
    transactions: Transaction[];
    balance: Balance;
    paidBills: number;
    totalUpcoming: number;
    dueSoon: number;
  };
}
