import React from "react";
import AnimatedSection from "./animated-section";
import { ChartPieDonutText } from "../shared/budget-chart";
import { BudgetWithData } from "@/types/global";

type BudgetsProps = {
  budgets: BudgetWithData[];
  totalLimit: number;
  totalSpent: number;
};

const Budgets = ({ budgets, totalLimit, totalSpent }: BudgetsProps) => {
  return (
    <div className="area-budgets">
      <AnimatedSection title="Budgets" link="See Details" linkHref="/budgets">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartPieDonutText
            budgets={budgets}
            totalLimit={totalLimit}
            totalSpent={totalSpent}
          />
          <div className="@container flex w-full flex-1 items-center">
            <div className="grid w-full grid-cols-2 gap-4">
              {budgets.map((budget) => (
                <div key={budget.id} className="flex gap-4">
                  <div
                    className="w-1 self-stretch rounded-full"
                    style={{ backgroundColor: budget.theme }}
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-muted-foreground text-xs">
                      {budget.category}
                    </span>
                    <span className="text-primary text-sm font-bold">
                      ${budget.maximum.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Budgets;
