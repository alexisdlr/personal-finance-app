"use client"
import BudgetCard from "@/components/budgets/budget-card"
import BudgetChart from "@/components/overview/budget-chart"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
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
        <div className="bg-white p-3 h-fit">
          <BudgetChart budgets={budgets} transactions={transactions}>
            <div className="px-2 flex flex-col items-start w-full">
              <h2 className="mt-3 mb-2 text-gray-900 font-bold text-xl">Spending Summary</h2>
              <div className="flex flex-col gap-2 w-full ">
                {budgets.map((budget) => (
                  <>
                    <div className="flex flex-col gap-2 justify-start w-full h-full sm:max-h-10 lg:max-h-12" key={budget.id}>
                      <div className="w-full h-full bg-transparent rounded-lg flex items-center justify-between p-2">
                        <div className="flex gap-2 items-center h-full">
                          <div className="w-2 h-full opacity-80" style={{ backgroundColor: budget.theme }}></div>
                          <span className="text-md text-gray-500">{budget.category}</span>
                        </div>
                        <span className="text-md line-clamp-1 tracking-wider font-semibold">{formatPrice(budget.maximum)} of</span>
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
        <div className="w-full p-3 flex flex-col gap-2">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              transactions={transactions.filter((transaction) => transaction.category === budget.category)}
              theme={budget.theme}
            />
          )
          )}
        </div>
      </div>
    </div>)
}

export default Budgets