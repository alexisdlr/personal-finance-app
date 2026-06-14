"use client";

import OverviewSkeleton from "@/components/overview/overview-skeleton";

import useFetchOverviewData from "@/hooks/overview/use-get-overview-data";

import OverviewContent from "@/components/overview/overview-content";

export default function Overview() {
  const overviewQuery = useFetchOverviewData();

  const overview = overviewQuery.data?.data;

  if (overviewQuery.isLoading) {
    return <OverviewSkeleton />;
  }

  if (overviewQuery.isError || !overview) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load overview data.</p>
      </div>
    );
  }

  return <OverviewContent data={overview} />;
}
