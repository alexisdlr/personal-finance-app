"use client";

import RecurringContent from "@/components/recurring/recurring-content";
import { useRecurringBills } from "@/hooks/recurring/use-recurring-bills";

const RecurringPage = () => {
  const recurringQuery = useRecurringBills();
  console.log("recurring info", recurringQuery);
  return (
    <RecurringContent
      dueSoonTotal={recurringQuery.dueSoonTotal}
      dueSoonCount={recurringQuery.dueSoonCount}
      recurringBills={recurringQuery.recurringBills}
      totalBills={recurringQuery.totalBills}
    />
  );
};

export default RecurringPage;
