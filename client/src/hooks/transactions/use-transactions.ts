import useFetchOverviewData from "../overview/use-get-overview-data";

export const useTransactions = () => {
  const overviewQuery = useFetchOverviewData();

  return {
    transactions: overviewQuery.data?.data.transactions ?? [],
    isLoading: overviewQuery.isLoading,
    error: overviewQuery.error,
  };
};
