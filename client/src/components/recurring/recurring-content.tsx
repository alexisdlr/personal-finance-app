"use client";

import { MotionDiv } from "@/components/animated/motion-div";
import RecurringSummary from "./recurring-summary";
import RecurringBillsTable from "./recurring-table";
import { Transaction } from "@/types/global";

type Props = {
  recurringBills: Transaction[];
  totalBills: number;
  dueSoonCount: number;
  dueSoonTotal: number;
};

export default function RecurringContent({
  recurringBills,
  totalBills,
  dueSoonCount,
  dueSoonTotal,
}: Props) {
  return (
    <div className="w-full h-full pt-6 pb-20 md:pb-4 px-6 lg:px-10 flex flex-col">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Recurring Bills</h1>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          grid
          grid-cols-1
          lg:grid-cols-[320px_1fr]
          gap-6
          mt-8
        "
      >
        <RecurringSummary
          totalBills={totalBills}
          totalBillsCount={recurringBills.length}
          dueSoonCount={dueSoonCount}
          dueSoonTotal={dueSoonTotal}
        />

        <RecurringBillsTable recurringBills={recurringBills} />
      </MotionDiv>
    </div>
  );
}
