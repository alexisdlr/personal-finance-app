"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Budget, Transaction } from "@/types/global";

type BudgetChartProps = {
  budgets: Budget[];
  transactions: Transaction[];
  children?: React.ReactNode;
  page?: "overview" | "budget";
};

const BudgetChart = ({
  budgets,
  transactions,
  children,
  page,
}: BudgetChartProps) => {
  const totalSpent = budgets.reduce((sum, budget) => {
    const categorySpent = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

    return sum + categorySpent;
  }, 0);

  const totalBudgetLimit = budgets.reduce(
    (sum, budget) => sum + budget.maximum,
    0,
  );

  const chartData = budgets.map((budget) => ({
    name: budget.category,
    value: budget.maximum,
    color: budget.theme,
  }));

  return (
    <div
      className={`bg-white rounded-lg w-full h-full flex lg:items-center sm:space-x-6 ${
        page === "overview" ? "flex-row" : "flex-col"
      }`}
    >
      {/* CHART */}
      <div
        className={`relative flex items-center justify-center mx-auto ${
          page === "overview"
            ? "w-[220px] h-[220px]"
            : "w-[280px] h-[280px] p-6"
        }`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              strokeWidth={0}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER LABEL */}
        <div className="absolute text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            ${totalSpent.toFixed(0)}
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            of ${totalBudgetLimit} limit
          </p>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div
        className={`grid gap-4 h-full ${
          page === "overview"
            ? "w-full lg:w-[40%]"
            : "w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-1"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default BudgetChart;
