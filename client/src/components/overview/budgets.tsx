import React from "react";
import { ChartPieDonutText } from "../shared/budget-chart";
import { BudgetWithData } from "@/types/global";
import Link from "next/link";
import { NavIcons } from "../shared/nav-icons";
import { MotionDiv } from "../animated/motion-div";

type BudgetsProps = {
  budgets: BudgetWithData[];
  totalLimit: number;
  totalSpent: number;
};

const Budgets = ({ budgets, totalLimit, totalSpent }: BudgetsProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="area-budgets bg-background rounded-12 grid min-h-54.5 grid-cols-1 gap-5 px-5 py-6 sm:px-8"
    >
      <div className="@container">
        <div className="flex items-center justify-between">
          <h2 className="text-primary text-xl font-bold">Budgets</h2>
          <Link
            className="group hover:text-primary text-muted-foreground focus-visible:outline-primary flex items-center gap-3 rounded-xs text-sm capitalize transition-colors focus-visible:outline-1"
            href="/budgets"
          >
            See details
            {NavIcons.chevronRight}
          </Link>
        </div>
        <div className=" grid grid-cols-1 @lg:grid-cols-2 gap-4 place-items-center">
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
      </div>
    </MotionDiv>
  );
};

export default Budgets;
