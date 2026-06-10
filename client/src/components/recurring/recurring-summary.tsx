import { Receipt } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type Props = {
  totalBills: number;
  totalBillsCount: number;
  dueSoonCount: number;
  dueSoonTotal: number;
};

export default function RecurringSummary({
  totalBills,
  totalBillsCount,
  dueSoonCount,
  dueSoonTotal,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-black text-white rounded-xl p-6">
        <Receipt size={28} />

        <p className="text-sm mt-8">Total Bills</p>

        <h2 className="text-4xl font-bold mt-2">{formatPrice(totalBills)}</h2>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h3 className="font-bold text-lg mb-5">Summary</h3>

        <div className="flex justify-between py-3 border-b">
          <span className="text-sm text-gray-500">Total Bills</span>

          <span className="font-bold">
            {totalBillsCount} ({formatPrice(totalBills)})
          </span>
        </div>

        <div className="flex justify-between py-3">
          <span className="text-sm text-red-500">Due Soon</span>

          <span className="font-bold text-red-500">
            {dueSoonCount} ({formatPrice(dueSoonTotal)})
          </span>
        </div>
      </div>
    </div>
  );
}
