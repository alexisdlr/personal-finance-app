import React from "react";
import { useModalStore } from "@/store/modal-store";
import { MotionDiv } from "../animated/motion-div";
import { Button } from "@/components/ui/button";
import { ChartPieDonutText } from "../overview/budget-chart";
import BudgetCard from "./budget-card";
import { BudgetWithData, Transaction } from "@/types/global";
import { formatPrice } from "@/lib/utils";
type BudgetContentProps = {
  budgets: BudgetWithData[];
  transactions: Transaction[];
};

const BudgetContent = ({ budgets, transactions }: BudgetContentProps) => {
  const { openModal } = useModalStore();
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.maximum, 0);
  return (
    <div className="w-full h-full px-3 flex flex-col ">
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
            className="px-4 py-6 text-md font-bold mr-1 rounded-lg bg-black text-white"
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
          <div className="px-2 flex flex-col items-start w-full h-full ">
            <h2 className="my-4 text-gray-900 font-bold text-xl">
              Spending Summary
            </h2>
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
                                (transaction: Transaction) =>
                                  transaction.category === budget.category,
                              )
                              .reduce(
                                (acc: number, transaction: Transaction) =>
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
        </div>
        {/* BUDGETS LIST */}
        <div className="w-full flex flex-col items-end gap-6">
          {budgets.map((budget: BudgetWithData) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              transactions={transactions.filter(
                (transaction: Transaction) =>
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
