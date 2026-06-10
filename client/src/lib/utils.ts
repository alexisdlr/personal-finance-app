import { SortOption } from "@/components/transactions/transaction-filters";
import { Transaction } from "@/types/global";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return price.toLocaleString("en-EN", {
    style: "currency",
    currency: "USD",
  });
}

export const MODALS = {
  CREATE_BUDGET: "CREATE_BUDGET",
  EDIT_BUDGET: "EDIT_BUDGET",
  CREATE_POT: "CREATE_POT",
  ADD_MONEY: "ADD_MONEY",
  WITHDRAW_MONEY: "WITHDRAW_MONEY",
} as const;

export const sortTransactions = (
  transactions: Transaction[],
  sortBy: SortOption,
) => {
  const sorted = [...transactions];

  switch (sortBy) {
    case "latest":
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

    case "atoz":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "ztoa":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case "highest":
      return sorted.sort((a, b) => b.amount - a.amount);

    case "lowest":
      return sorted.sort((a, b) => a.amount - b.amount);

    default:
      return sorted;
  }
};
