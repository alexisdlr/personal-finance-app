"use client";

import { useMemo } from "react";

import { MotionDiv } from "@/components/animated/motion-div";
import CardBalance from "@/components/overview/card-balance";
import Button from "@/components/auth/button";
import OverviewSkeleton from "@/components/overview/overview-skeleton";

import useHandleLogout from "@/hooks/auth/use-handle-logout";
import useFetchOverviewData from "@/hooks/overview/use-get-overview-data";
import Pots from "@/components/overview/pots";
import Transactions from "@/components/overview/transactions";
import Budgets from "@/components/overview/budgets";
import Recurring from "@/components/overview/recurring";

export default function Home() {
  const overviewQuery = useFetchOverviewData();
  const handleLogout = useHandleLogout();

  const overview = overviewQuery.data?.data;

  const balance = overview?.balance ?? 0;
  const income = overview?.income ?? 0;
  const expenses = overview?.expenses ?? 0;

  const pots = overview?.pots ?? [];
  const budgets = overview?.budgets ?? [];
  const transactions = overview?.transactions ?? [];

  const totalSaved = overview?.totalSaved ?? 0;

  const recurringData = useMemo(
    () => ({
      paidBills: overview?.bills.paidTotal ?? 0,
      totalUpcoming: overview?.bills.upcomingTotal ?? 0,
      dueSoon: overview?.bills.dueSoonTotal ?? 0,
    }),
    [overview],
  );
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.maximum, 0);
  const isEmpty =
    pots.length === 0 && budgets.length === 0 && transactions.length === 0;

  if (overviewQuery.isLoading) {
    return <OverviewSkeleton />;
  }

  if (overviewQuery.isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load overview data.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full lg:h-screen 2xl:h-full pt-1 md:pb-4 px-3 flex flex-col">
      <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <header className="flex justify-between items-center">
          <h1 className="text-grey-900 font-bold text-3xl">Overview</h1>

          <Button className="px-8 text-xs font-semibold" onClick={handleLogout}>
            Logout
          </Button>
        </header>
      </MotionDiv>

      {/* BALANCE */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 pb-0 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          <CardBalance type="Current Balance" value={balance} />

          <CardBalance
            type="Income"
            value={income}
            classname="bg-white text-grey-500"
          />

          <CardBalance
            type="Expenses"
            value={expenses}
            classname="bg-white text-grey-500"
          />
        </div>
      </MotionDiv>

      {/* EMPTY STATE */}
      {isEmpty ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:flex-1 flex items-center justify-center mt-10 md:mt-0"
        >
          <div className="bg-white rounded-2xl p-10 text-center max-w-lg">
            <h2 className="text-2xl font-bold text-grey-900 mb-3">
              Welcome 👋
            </h2>

            <p className="text-grey-500 mb-6">
              Your account is ready. Start by creating your first budget,
              transaction, or savings pot.
            </p>

            <Button className="px-4">Create your first budget</Button>
          </div>
        </MotionDiv>
      ) : (
        <div className="w-full grid-layout lg:gap-6">
          <Pots pots={pots} totalSaved={totalSaved} />
          <Transactions transactions={transactions} />

          <Budgets
            budgets={budgets}
            totalLimit={totalLimit}
            totalSpent={totalSpent}
          />
          <Recurring recurringData={recurringData} />
        </div>
      )}
    </div>
  );
}
