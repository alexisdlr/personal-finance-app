import useFetchOverviewData from "../overview/use-get-overview-data";

export const usePots = () => {
  const overviewQuery = useFetchOverviewData();

  return {
    pots: overviewQuery.data?.data.pots ?? [],
    isLoading: overviewQuery.isLoading,
    error: overviewQuery.error,
  };
};
