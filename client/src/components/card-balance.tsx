import { cn } from '@/lib/utils'
import React from 'react'

type CardBalanceProps = {
  type: "Current Balance" | "Income" | "Expenses",
  value: number | undefined,
  classname?: string
}

const CardBalance = ({ type, value, classname }: CardBalanceProps) => {
  return (
    <div className={cn(`w-full bg-grey-900 lg:max-w-96 pl-6 pr-10 py-6 lg:w-[340px] md:w-[200px] flex flex-col gap-2 items-start justify-center text-white rounded-xl`, classname)}>
      <span className='text-sm'>
        {type}
      </span>
      <span className={`font-bold text-3xl leading-[120%] ${type === 'Current Balance' ? 'text-white': 'text-grey-900'}`}>
        ${value}
      </span>
    </div>
  )
}

export default CardBalance