import { Balance, BudgetWithData, Pot, Transaction } from "@/types/global";

export interface OverviewResponse {
  message: string;
  data: {
    pots: Pot[];
    budgets: BudgetWithData[];
    transactions: Transaction[];
    recurringBills: Transaction[];
    balance: Balance;
    paidBills: number;
    totalBills: number;
    dueSoon: number;
  };
}
