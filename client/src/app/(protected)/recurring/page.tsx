"use client";

import RecurringContent from "@/components/recurring/recurring-content";
import RecurringSkeleton from "@/components/recurring/recurring-skeleton";
import { useRecurringBills } from "@/hooks/recurring/use-recurring-bills";

const RecurringPage = () => {
  const recurringQuery = useRecurringBills();

  if (recurringQuery.isLoading) {
    return <RecurringSkeleton />;
  }

  if (recurringQuery.isError) {
    return (
      <div className="w-full sm:h-screen mt-6 pb-20 md:pb-4 flex items-center justify-center">
        <p className="text-red-500">Failed to load recurring bills.</p>
      </div>
    );
  }

  return (
    <RecurringContent
      recurringBills={recurringQuery.recurringBills}
      totalBills={recurringQuery.totalBills}
      paidCount={recurringQuery.paidCount}
      paidTotal={recurringQuery.paidTotal}
      upcomingCount={recurringQuery.upcomingCount}
      upcomingTotal={recurringQuery.upcomingTotal}
      dueSoonCount={recurringQuery.dueSoonCount}
      dueSoonTotal={recurringQuery.dueSoonTotal}
    />
  );
};

export default RecurringPage;
