import { formatPrice } from "@/lib/utils";
import { TransactionData } from "@/types/api";
import { BudgetWithData } from "@/types/global";
import React from "react";
type BudgetSummaryProps = {
  budgets: BudgetWithData[];
  transactions: TransactionData[];
};

const BudgetSummary = ({ budgets, transactions }: BudgetSummaryProps) => {
  return (
    <div className="px-2 flex flex-col items-start w-full h-full ">
      <h2 className="my-4 text-gray-900 font-bold text-xl">Spending Summary</h2>
      <div className="flex flex-col gap-2 w-full">
        {budgets.map((budget: BudgetWithData) => (
          <React.Fragment key={budget.id}>
            <div className="flex flex-col gap-2 justify-start w-full h-full ">
              <div className="w-full h-full bg-transparent rounded-lg flex items-center justify-between p-2">
                <div className="flex gap-4 items-center h-full">
                  <div
                    className="w-1 h-6 rounded-2xl opacity-80"
                    style={{ backgroundColor: budget.theme }}
                  ></div>
                  <span className="text-sm text-gray-500">
                    {budget.category}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="text-base line-clamp-1 tracking-wider font-bold text-primary">
                    {formatPrice(
                      transactions
                        .filter(
                          (transaction: TransactionData) =>
                            transaction.category === budget.category,
                        )
                        .reduce(
                          (acc: number, transaction: TransactionData) =>
                            acc + Math.abs(transaction.amount),
                          0,
                        ),
                    )}
                  </span>{" "}
                  <span className="text-xs font-normal">
                    of {formatPrice(budget.maximum)}
                  </span>
                </div>
              </div>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BudgetSummary;
