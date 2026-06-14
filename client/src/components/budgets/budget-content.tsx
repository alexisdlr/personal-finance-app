import React from "react";
import { useModalStore } from "@/store/modal-store";
import { MotionDiv } from "../animated/motion-div";
import { Button } from "@/components/ui/button";
import BudgetCard from "./budget-card";
import { BudgetWithData, Transaction } from "@/types/global";
import { formatPrice } from "@/lib/utils";
import { TransactionData } from "@/types/api";
import BudgetSummary from "./budget-summary";
import { ChartPieDonutText } from "../shared/budget-chart";
type BudgetContentProps = {
  budgets: BudgetWithData[];
  transactions: TransactionData[];
};

const BudgetContent = ({ budgets, transactions }: BudgetContentProps) => {
  const { openModal } = useModalStore();
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.maximum, 0);
  return (
    <div className="w-full h-full px-3 lg:mt-6 flex flex-col ">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center my-2"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Budgets</h1>
          <p className="text-gray-500 text-sm mt-2">
            Track your spending across different categories and manage your
            financial goals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="px-4 py-6 text-md font-bold mr-1 cursor-pointer rounded-lg bg-black text-white"
            onClick={() => openModal("CREATE_BUDGET")}
          >
            + Add New Budget
          </Button>
        </div>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-[42%_58%] gap-6 mt-4"
      >
        {/* BUDGETS CHART */}
        <div className="bg-background rounded-12 flex h-fit w-full flex-col items-center p-5 sm:flex-row lg:max-w-107 lg:flex-col">
          <ChartPieDonutText
            budgets={budgets}
            totalLimit={totalLimit}
            totalSpent={totalSpent}
          />
          <BudgetSummary budgets={budgets} transactions={transactions} />
        </div>
        {/* BUDGETS LIST */}
        <div className="w-full flex flex-col items-end gap-6">
          {budgets.map((budget: BudgetWithData) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              transactions={transactions.filter(
                (transaction: TransactionData) =>
                  transaction.category === budget.category,
              )}
              theme={budget.theme}
            />
          ))}
        </div>
      </MotionDiv>
    </div>
  );
};

export default BudgetContent;
