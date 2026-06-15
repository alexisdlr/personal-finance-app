import { ReceiptText } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type Props = {
  totalBills: number;
  paidCount: number;
  paidTotal: number;
  upcomingCount: number;
  upcomingTotal: number;
  dueSoonCount: number;
  dueSoonTotal: number;
};

export default function RecurringSummary({
  totalBills,
  paidCount,
  paidTotal,
  upcomingCount,
  upcomingTotal,
  dueSoonCount,
  dueSoonTotal,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-black text-white rounded-xl p-6">
        <ReceiptText size={50} />

        <p className="text-sm mt-8">Total Bills</p>

        <h2 className="text-4xl font-bold mt-2">{formatPrice(totalBills)}</h2>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h3 className="font-bold text-lg mb-5">Summary</h3>

        <div className="flex justify-between py-3 border-b">
          <span className="text-sm text-gray-500">Paid Bills</span>

          <span className="font-bold">
            {paidCount} ({formatPrice(paidTotal)})
          </span>
        </div>

        <div className="flex justify-between py-3 border-b">
          <span className="text-sm text-gray-500">Total Upcoming</span>

          <span className="font-bold">
            {upcomingCount} ({formatPrice(upcomingTotal)})
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
