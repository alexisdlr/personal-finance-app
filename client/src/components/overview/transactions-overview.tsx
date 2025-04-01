import { formatPrice } from '@/lib/utils'
import { Transaction } from '@/types/global'
import Image from 'next/image'

type TransactionsProps = {
  transactions: Transaction[]
}
type TransactionItemProps = {
  transaction: Transaction
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='w-full flex justify-between'>
      <div className='flex-1 flex items-center gap-2'>
        <span>
          <Image src={transaction.avatar} alt={transaction.name} width={30} height={30} className='rounded-full' />
        </span>
        <span className='font-bold text-grey-900 text-sm'>{transaction.name}</span>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='font-bold text-sm'>{formatPrice(transaction.amount)}</span>
        <span className='text-xs text-grey-500'>{formattedDate}</span>
      </div>
    </div>
  )
}

const Transactions = ({ transactions }: TransactionsProps) => {
  return (
    <div className='mt-2 w-full flex flex-col gap-6 items-start justify-start'>
      {
        transactions.length === 0 && (
          <h2 className='text-grey-500 text-sm'>No results found...</h2>
        )
      }
      {
        transactions &&  transactions.slice(0, 5).map(t => (
          <TransactionItem key={t.id} transaction={t} />
        ))
      }
    </div>
  )
}

export default Transactions