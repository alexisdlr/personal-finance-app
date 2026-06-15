import { formatPrice } from "@/lib/utils";
import { TransactionData } from "@/types/api";
import Image from "next/image";
import EmptyState from "../shared/empty-state";
import TransactionsIcon from "../Icons/transactions-nav";
import { User } from "lucide-react";

type TransactionsProps = {
  transactions: TransactionData[];
};
type TransactionItemProps = {
  transaction: TransactionData;
};

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full flex justify-between">
      <div className="flex-1 flex items-center gap-2">
        <span>
          {transaction.avatar.includes("default") ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-500" />
            </div>
          ) : (
            <Image
              src={transaction.avatar}
              alt={transaction.name}
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
        </span>
        <span className="font-bold text-grey-900 text-sm">
          {transaction.name}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-sm">
          {formatPrice(transaction.amount)}
        </span>
        <span className="text-xs text-grey-500">{formattedDate}</span>
      </div>
    </div>
  );
};

const TransactionsList = ({ transactions }: TransactionsProps) => {
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={<TransactionsIcon color="currentColor" width={24} height={24} />}
        title="No transactions yet"
        description="Add your first transaction to start tracking your income and expenses."
        className="w-full"
      />
    );
  }

  return (
    <div className="mt-2 w-full flex flex-col gap-6 items-start justify-start">
      {transactions.slice(0, 5).map((t) => (
        <TransactionItem key={t.id} transaction={t} />
      ))}
    </div>
  );
};

export default TransactionsList;
