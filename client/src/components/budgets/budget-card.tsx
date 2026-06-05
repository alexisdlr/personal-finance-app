import { formatPrice } from '@/lib/utils'
import { Budget, Transaction } from '@/types/global'
import React from 'react'

type BudgetCardProps = {
  budget: Budget
  transactions: Transaction[]
  theme: string
  // onClick?: () => void
  // onMouseEnter?: () => void
  // onMouseLeave?: () => void
  // onFocus?: () => void
  // onBlur?: () => void
  // onKeyDown?: (event: React.KeyboardEvent) => void
  // onKeyUp?: (event: React.KeyboardEvent) => void
}

const BudgetCard = ({ budget, transactions, theme }: BudgetCardProps) => {

  const spent = transactions
    .filter((transaction) => transaction.category === budget.category && transaction.amount < 0)
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

  return (
    <div className='max-w-[600px] w-full h-full'>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2">
        <div className="flex flex-col"
        >
          <div className='flex gap-4 items-center'>
            <div className='size-4 rounded-full' style={{ backgroundColor: `${theme}` }}></div>
            <h2 className="text-xl font-bold">{budget.category}</h2>
          </div>
          <span className="text-sm my-4 text-gray-500">Maximum of {formatPrice(budget.maximum)}</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-4 bg-gray-200 rounded-XL overflow-hidden">
          <div
            className="h-full "
            style={{
              backgroundColor: `${theme}`,
              width: `${spent / budget.maximum * 100}%`,
            }}
          ></div>
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className="flex gap-2 items-center h-12 mt-4">
            <div className='w-1 h-full rounded-xl' style={{ backgroundColor: `${theme}` }} />
            <div className='flex flex-col items-start gap-2'>
              <span className="text-sm text-gray-500">Spent</span>
              <span className="text-md font-semibold">{formatPrice(spent)}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center h-12 mt-4">
            <div className='w-1 h-full rounded-xl bg-gray-200' />
            <div className='flex flex-col items-start gap-2'>
              <span className="text-sm text-gray-500">Remaining</span>
              <span className="text-md font-semibold">{formatPrice(budget.maximum - spent)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetCard