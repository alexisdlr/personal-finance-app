import useFetchOverviewData from "../overview/use-get-overview-data";

export const useRecurringBills = () => {
  const overviewQuery = useFetchOverviewData();
  const transactions = overviewQuery.data?.data.transactions ?? [];
  const bills = overviewQuery.data?.data.bills;

  const recurringBills = transactions.filter(
    (transaction) => transaction.recurring && transaction.amount < 0,
  );

  return {
    recurringBills,
    totalBills: bills?.totalBills ?? 0,
    paidCount: bills?.paidCount ?? 0,
    paidTotal: bills?.paidTotal ?? 0,
    upcomingCount: bills?.upcomingCount ?? 0,
    upcomingTotal: bills?.upcomingTotal ?? 0,
    dueSoonCount: bills?.dueSoonCount ?? 0,
    dueSoonTotal: bills?.dueSoonTotal ?? 0,
    isLoading: overviewQuery.isLoading,
    isError: overviewQuery.isError,
    error: overviewQuery.error,
  };
};
