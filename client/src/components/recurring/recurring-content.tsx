"use client";

import { MotionDiv } from "@/components/animated/motion-div";
import RecurringSummary from "./recurring-summary";
import RecurringBillsTable from "./recurring-table";
import { TransactionData } from "@/types/api";
import EmptyState from "../shared/empty-state";
import RecurringIcon from "../Icons/recurring-nav";

type RecurringContentProps = {
  recurringBills: TransactionData[];
  totalBills: number;
  paidCount: number;
  paidTotal: number;
  upcomingCount: number;
  upcomingTotal: number;
  dueSoonCount: number;
  dueSoonTotal: number;
};

export default function RecurringContent({
  recurringBills,
  totalBills,
  paidCount,
  paidTotal,
  upcomingCount,
  upcomingTotal,
  dueSoonCount,
  dueSoonTotal,
}: RecurringContentProps) {
  return (
    <div className="w-full sm:h-screen mt-6 pb-20 md:pb-4 flex flex-col">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mt-2">Recurring Bills</h1>
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
        {recurringBills.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl py-12">
            <EmptyState
              icon={
                <RecurringIcon color="currentColor" width={24} height={24} />
              }
              title="No recurring bills yet"
              description="Mark transactions as recurring to track your regular payments and due dates."
            />
          </div>
        ) : (
          <>
            <RecurringSummary
              totalBills={totalBills}
              paidCount={paidCount}
              paidTotal={paidTotal}
              upcomingCount={upcomingCount}
              upcomingTotal={upcomingTotal}
              dueSoonCount={dueSoonCount}
              dueSoonTotal={dueSoonTotal}
            />

            <RecurringBillsTable recurringBills={recurringBills} />
          </>
        )}
      </MotionDiv>
    </div>
  );
}
