import { BudgetWithData, Pot, Transaction } from "@/types/global";

export interface RecurringBillsSummary {
  totalBills: number;

  paidCount: number;
  paidTotal: number;

  upcomingCount: number;
  upcomingTotal: number;

  dueSoonCount: number;
  dueSoonTotal: number;
}

export interface TransactionData {
  id: number;
  avatar: string;
  name: string;
  amount: number;
  date: string;
  category: string;
}
export interface PotData {
  id: number;
  name: string;
  total: number;
  theme: string;
  target: number;
}
export interface OverviewData {
  balance: number;

  income: number;

  expenses: number;

  totalSaved: number;

  pots: PotData[];

  budgets: BudgetWithData[];

  totalSpent: number;

  totalLimit: number;

  transactions: TransactionData[];

  bills: RecurringBillsSummary;
}
export interface OverviewResponse {
  message: string;

  data: OverviewData;
}
