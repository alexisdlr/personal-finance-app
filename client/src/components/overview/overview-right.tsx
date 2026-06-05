import { Transaction, Budget } from "@/types/global";
import AnimatedSection from "./animated-section";
import BudgetChart from "./budget-chart";
import RecurringBills from "./recurring-bills";

type OverviewRightProps = {
  budgets: Budget[];
  transactions: Transaction[];
  recurringData: {
    paidBills: number;
    totalUpcoming: number;
    dueSoon: number;
  };
};

const OverviewRight = ({
  budgets,
  transactions,
  recurringData,
}: OverviewRightProps) => {
  return (
    <div className="w-full h-full lg:h-auto lg:w-[42%]">
      {/* BUDGETS SECTION */}

      <AnimatedSection title="Budgets" link="See Details" linkHref="/budgets">
        <div className="w-full flex flex-col gap-3 md:flex-row justify-between">
          <BudgetChart
            page="overview"
            budgets={budgets}
            transactions={transactions}
          >
            {budgets.slice(0, 4).map((budget) => (
              <div
                className="flex gap-2 justify-start w-full h-full sm:max-h-10 lg:max-h-12"
                key={budget.id}
              >
                <span
                  className="w-1 h-full rounded-xl"
                  style={{ backgroundColor: budget.theme }}
                ></span>
                <div className="flex flex-col justify-end items-start">
                  <div className="flex items-center gap-2 h-full">
                    <span className="text-[10px] text-grey-500">
                      {budget.category}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 text-left">
                    ${budget.maximum.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </BudgetChart>
        </div>
      </AnimatedSection>

      {/* RECURRING BILLS SECTION */}
      <AnimatedSection
        title="Recurring Bills"
        link="See Details"
        linkHref="/recurring"
      >
        <div className="w-full h-full flex flex-col gap-3 md:flex-row justify-between">
          <RecurringBills recurringData={recurringData} />
        </div>
      </AnimatedSection>
    </div>
  );
};

export default OverviewRight;
