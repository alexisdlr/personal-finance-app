"use client";

import BudgetContent from "@/components/budgets/budget-content";
import BudgetSkeleton from "@/components/budgets/budget-skeleton";
import useFetchOverviewData from "@/hooks/overview/use-get-overview-data";

const Budgets = () => {
  const overviewQuery = useFetchOverviewData();
  const budgets = overviewQuery.data?.data.budgets ?? [];
  const transactions = overviewQuery.data?.data.transactions ?? [];

  return (
    <>
      {overviewQuery.isLoading ? (
        <BudgetSkeleton />
      ) : overviewQuery.isError ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500">Error loading budgets.</p>
        </div>
      ) : (
        <BudgetContent budgets={budgets} transactions={transactions} />
      )}
    </>
  );
};

export default Budgets;
