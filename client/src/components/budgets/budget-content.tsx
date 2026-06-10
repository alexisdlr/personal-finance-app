import { useModalStore } from "@/store/modal-store";
import { MotionDiv } from "../animated/motion-div";
import { Button } from "@/components/ui/button";
import BudgetChart from "../overview/budget-chart";
import BudgetCard from "./budget-card";
import { Budget, Transaction } from "@/types/global";
import { formatPrice } from "@/lib/utils";

type BudgetContentProps = {
  budgets: Budget[];
  transactions: Transaction[];
};

const BudgetContent = ({ budgets, transactions }: BudgetContentProps) => {
  const { openModal } = useModalStore();
  return (
    <div className="w-full h-full pt-6 sm:px-6 px-3 lg:px-10 flex flex-col pb-24">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center my-2"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Budgets</h1>
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
        className="grid grid-cols-1 md:grid-cols-[42%_58%] gap-2 mt-4"
      >
        {/* BUDGETS CHART */}
        <div className="bg-white md:p-4 h-fit rounded-lg shadow-md mt-2">
          <BudgetChart
            page="budget"
            budgets={budgets}
            transactions={transactions}
          >
            <div className="px-2 flex flex-col items-start w-full ">
              <h2 className="my-4 text-gray-900 font-bold text-xl">
                Spending Summary
              </h2>
              <div className="flex flex-col gap-2 w-full">
                {budgets.map((budget: Budget) => (
                  <>
                    <div
                      className="flex flex-col gap-2 justify-start w-full h-full sm:max-h-10 lg:max-h-12"
                      key={budget.id}
                    >
                      <div className="w-full h-full bg-transparent rounded-lg flex items-center justify-between p-2">
                        <div className="flex gap-4 items-center h-full">
                          <div
                            className="w-2 h-full opacity-80"
                            style={{ backgroundColor: budget.theme }}
                          ></div>
                          <span className="text-sm text-gray-500">
                            {budget.category}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 flex gap-2">
                          <span className="text-base line-clamp-1 tracking-wider font-bold text-gray-900">
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
                  </>
                ))}
              </div>
            </div>
          </BudgetChart>
        </div>
        {/* BUDGETS LIST */}
        <div className="w-full sm:p-3 flex flex-col items-end gap-6">
          {budgets.map((budget: Budget) => (
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
