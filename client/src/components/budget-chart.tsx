// components/BudgetChart.tsx
import { Budget, Transaction } from '@/types/global';

type BudgetChartProps = {
  budgets: Budget[]
  transactions: Transaction[]
}

const BudgetChart = ({ budgets, transactions }: BudgetChartProps) => {

  // Calcular el total gastado

  const totalSpent = budgets.slice(0, 4).reduce((sum, budget) => {
    const categorySpent = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    return sum + categorySpent;
  }, 0);



  const totalBudgetLimit = budgets.reduce((sum, budget) => sum + budget.maximum, 0);
  // SVG circle properties
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  let offset = 0; // Offset inicial para cada segmento

  console.log(totalBudgetLimit, 'totalBudgetLimit')

  return (
    <div className="bg-white rounded-lg w-full h-full flex flex-col lg:flex-row justify-between lg:items-center gap-2">

      <div className="relative flex items-center justify-center w-38 h-38 mx-auto ">
        <svg className="w-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          {/* Dibujar cada segmento */}
          {budgets.map((category, index) => {
            const segmentLength = (category.maximum / totalBudgetLimit) * circumference;
            const circle = (
              <circle
                key={index}
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={category.theme}
                strokeWidth="10"
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={-offset}
              />
            );
            offset += segmentLength; // Actualizar el offset para el siguiente segmento
            return circle;
          })}
        </svg>
        <div className="absolute text-center">
          <span className="text-xl font-bold">${Math.abs(totalSpent).toFixed(2)}</span>
          <p className="text-sm text-gray-500">of ${totalBudgetLimit} limit</p>
        </div>
      </div>
      <div className="space-y-2.5 relative grid grid-cols-2 gap-2 lg:gap-4 w-full h-full">
        {budgets.slice(0, 4).map((budget) => (
          <div className="flex gap-2 justify-start w-full h-full sm:max-h-10 lg:max-h-12" key={budget.id}>
            <span
              className="w-1 h-full rounded-xl"
              style={{ backgroundColor: budget.theme }}
            ></span>
            <div className="flex flex-col justify-start items-center">
              <div className="flex items-center gap-2 h-full">
                <span className="text-[10px] text-grey-500">{budget.category}</span>
              </div>
              <span className="text-sm font-bold text-gray-900 text-left">${budget.maximum.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetChart;
