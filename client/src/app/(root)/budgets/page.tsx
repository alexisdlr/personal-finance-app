"use client"
import BudgetChart from "@/components/overview/budget-chart"
import { Button } from "@/components/ui/button"
import { useGlobalState } from "@/store/global-store"


const Budgets = () => {
  const { budgets, transactions } = useGlobalState()
  return (
    <div className="w-full h-full pt-6 sm:px-6 px-3 lg:px-10 flex flex-col pb-24">
      <div className="flex justify-between items-center my-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Budgets</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button className="px-3 py-4 text-xs font-semibold" >+ Add New Budget</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">  
        {/* BUDGETS CHART */}
        <div className="bg-white p-3">
          <BudgetChart budgets={budgets} transactions={transactions}>
            <h2 className="mt-2 text-gray-900 font-bold">Spending Summary</h2>
            {budgets.map((budget) => (
              <div className="flex gap-2 justify-start w-full h-full sm:max-h-10 lg:max-h-12" key={budget.id}>
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-between p-2">
                  <span className="text-sm font-semibold">{budget.category}</span>
                  <span className="text-sm font-semibold">${budget.maximum}</span>
                </div>
              </div>
            ))}
          </BudgetChart>
        </div>
      </div>
    </div>)
}

export default Budgets