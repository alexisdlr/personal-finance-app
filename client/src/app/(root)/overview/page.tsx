"use client";
import { useMemo } from "react";

import { MotionDiv } from "@/components/animated/motion-div";
import CardBalance from "@/components/overview/card-balance";
import Button from "@/components/auth/button";
import OverviewLeft from "@/components/overview/overview-left";

import useHandleLogout from "@/hooks/auth/use-handle-logout";
import OverviewSkeleton from "@/components/overview/overview-skeleton";
import OverviewRight from "@/components/overview/overview-right";
import useFetchOverviewData from "@/hooks/overview/use-get-overview-data";
import { Pot } from "@/types/global";

export default function Home() {
  const overviewQuery = useFetchOverviewData();
  const handleLogout = useHandleLogout();

  const balance = overviewQuery.data?.data.balance;
  const pots = overviewQuery.data?.data.pots || [];
  const transactions = overviewQuery.data?.data.transactions || [];
  const budgets = overviewQuery.data?.data.budgets || [];
  const paidBills = overviewQuery.data?.data.paidBills || 0;
  const totalUpcoming = overviewQuery.data?.data.totalUpcoming || 0;
  const dueSoon = overviewQuery.data?.data.dueSoon || 0;

  const totalSaved = useMemo(
    () => pots.reduce((sum: number, item: Pot) => sum + item.total, 0),
    [pots],
  );

  const recurringData = useMemo(
    () => ({
      paidBills,
      totalUpcoming,
      dueSoon,
    }),
    [paidBills, totalUpcoming, dueSoon],
  );

  return (
    <>
      {overviewQuery.isLoading ? (
        <OverviewSkeleton />
      ) : overviewQuery.isError ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-red-500">Failed to load overview data.</p>
        </div>
      ) : (
        <div className="w-full h-full pt-6 pb-20 md:pb-4 px-6 lg:px-10 flex flex-col">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <header className="flex justify-between items-center">
              <h1 className="text-grey-900 font-bold text-3xl">Overview</h1>
              <Button
                className="px-8 text-xs font-semibold"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </header>
          </MotionDiv>

          {/* BALANCE SECTION */}
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 pb-0 w-full"
          >
            <div className="flex flex-col md:flex-row justify-start md:justify-between gap-5 flex-wrap lg:flex-nowrap items-center">
              <CardBalance type="Current Balance" value={balance?.current} />
              <CardBalance
                type="Income"
                value={balance?.income}
                classname="bg-white text-grey-500 shadow-lg"
              />
              <CardBalance
                type="Expenses"
                value={balance?.expenses}
                classname="bg-white text-grey-500 shadow-lg"
              />
            </div>
          </MotionDiv>

          <div className="w-full flex flex-col lg:flex-row lg:gap-6">
            {/* LEFT */}
            <OverviewLeft
              totalSaved={totalSaved}
              pots={pots}
              transactions={transactions}
            />
            {/* RIGHT */}
            <OverviewRight
              budgets={budgets}
              transactions={transactions}
              recurringData={recurringData}
            />
          </div>
        </div>
      )}
    </>
  );
}
