// components/BudgetChart.tsx
import { Budget, Transaction } from '@/types/global';

type BudgetChartProps = {
  budgets: Budget[]
  transactions: Transaction[]
  children?: React.ReactNode
}

const BudgetChart = ({ budgets, transactions, children }: BudgetChartProps) => {

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

  return (
    <div className="bg-white rounded-lg w-full h-full flex flex-row lg:flex-col justify-between lg:items-center">

      <div className="relative flex items-center justify-center w-30 h-30 mx-auto ">
        <svg className="w-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="12"
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
          <span className="text-3xl font-bold">${Math.abs(totalSpent).toFixed(2)}</span>
          <p className="text-lg text-gray-500">of ${totalBudgetLimit} limit</p>
        </div>
      </div>
      <div className="space-y-2 w-full relative grid grid-cols-2 md:grid-cols-1 gap-2 2xl:gap-4 h-full">
       {children}
      </div>
    </div>
  );
};

export default BudgetChart;
