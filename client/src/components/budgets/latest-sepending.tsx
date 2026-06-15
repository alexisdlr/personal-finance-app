import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { TransactionData } from "@/types/api";

type Props = {
  transactions: TransactionData[];
};

export default function LatestSpending({ transactions }: Props) {
  const latestTransactions = [...transactions]
    .filter((t) => t.amount < 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="mt-6 rounded-xl bg-beige-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Latest Spending</h3>

        <button className="text-sm text-grey-500">See All</button>
      </div>

      {latestTransactions.length === 0 ? (
        <p className="text-grey-500 text-sm text-center py-4">
          No spending in this category yet.
        </p>
      ) : (
        latestTransactions.map((transaction, index) => (
        <div key={transaction.name + transaction.date}>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <Image
                src={transaction.avatar}
                alt={transaction.name}
                width={32}
                height={32}
                className="rounded-full"
              />

              <span className="font-semibold text-sm">{transaction.name}</span>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-bold">
                -{formatPrice(Math.abs(transaction.amount))}
              </span>

              <span className="text-xs text-grey-500">
                {new Date(transaction.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {index !== latestTransactions.length - 1 && <hr />}
        </div>
        ))
      )}
    </div>
  );
}
