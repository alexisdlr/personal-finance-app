// components/BudgetChart.tsx
import { Budget, Transaction } from '@/types/global';

type BudgetChartProps = {
  budgets: Budget[]
  transactions: Transaction[]
}

const BudgetChart = ({ budgets, transactions }: BudgetChartProps) => {
  
  const totalSpent = budgets.slice(0,4).reduce((sum, budget) => {
    const categorySpent = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    return sum + categorySpent;
  }, 0);

  const totalBudgetLimit = budgets.reduce((sum, budget) => sum + budget.maximum, 0);
  const percentageSpent = (totalSpent / totalBudgetLimit) * 100;

  // SVG circle properties
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentageSpent / 100) * circumference;

  return (
    <div className="bg-white rounded-lg w-full h-full flex flex-col lg:flex-row justify-between gap-2">

      <div className="relative flex items-center justify-center w-38 h-38 mx-auto ">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#d1d5db" // color del "trail"
            strokeWidth="10"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#3b82f6" // color del "path"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-xl font-bold">${totalSpent}</span>
          <p className="text-sm text-gray-500">of ${totalBudgetLimit} limit</p>
        </div>
      </div>
      <div className="space-y-2">
        {budgets.slice(0, 4).map((budget) => (
          <div className="flex gap-2 justify-start w-full h-full max-h-10" key={budget.id}>
            <span
              className="w-1 h-full rounded-xl"
              style={{ backgroundColor: budget.theme }}
            ></span>
            <div className="flex flex-col justify-start items-center">
              <div className="flex items-center gap-2 h-full">
                <span className="text-[10px] text-grey-500">{budget.category}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">${budget.maximum.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetChart;
