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
