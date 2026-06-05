"use client";
import { useMemo } from "react";

import { MotionDiv } from "@/components/animated/motion-div";
import CardBalance from "@/components/overview/card-balance";
import Button from "@/components/auth/button";

import TotalSaved from "@/components/total-saved";
import { useGlobalState } from "@/store/global-store";
import Pots from "@/components/overview/pots-overview";
import Transactions from "@/components/overview/transactions-overview";
import BudgetChart from "@/components/overview/budget-chart";
import RecurringBills from "@/components/overview/recurring-bills";
import AnimatedSection from "@/components/overview/animated-section";
import useHandleLogout from "@/hooks/use-handle-logout";
import useOverview from "@/hooks/use-overview";
import OverviewSkeleton from "@/components/overview/overview-skeleton";

export default function Home() {
  const overviewQuery = useOverview();
  const setGlobalData = useGlobalState((state) => state.setGlobalData);
  const handleLogout = useHandleLogout();

  const {
    balance,
    pots,
    transactions,
    budgets,
    paidBills,
    totalUpcoming,
    dueSoon,
  } = useGlobalState();

  const totalSaved = useMemo(
    () => pots.reduce((sum, item) => sum + item.total, 0),
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
            <div className="w-full lg:w-[58%]">
              {/* POTS SECTION */}
              <AnimatedSection title="Pots" link="See Details" linkHref="/pots">
                <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
                  <TotalSaved total={totalSaved} />
                  <Pots pots={pots} />
                </div>
              </AnimatedSection>

              {/* TRANSACTIONS SECTION */}
              <AnimatedSection
                title="Transactions"
                link="See Details"
                linkHref="/transactions"
              >
                <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
                  <Transactions transactions={transactions} />
                </div>
              </AnimatedSection>
            </div>
            {/* RIGHT */}
            <div className="w-full h-full lg:h-auto lg:w-[42%]">
              {/* BUDGETS SECTION */}

              <AnimatedSection
                title="Budgets"
                link="See Details"
                linkHref="/budgets"
              >
                <div className="w-full flex flex-col gap-3 md:flex-row justify-between">
                  <BudgetChart budgets={budgets} transactions={transactions}>
                    {budgets.slice(0, 4).map((budget) => (
                      <div
                        className="flex gap-2 justify-start w-full h-full sm:max-h-10 lg:max-h-12"
                        key={budget.id}
                      >
                        <span
                          className="w-1 h-full rounded-xl"
                          style={{ backgroundColor: budget.theme }}
                        ></span>
                        <div className="flex flex-col justify-end items-start">
                          <div className="flex items-center gap-2 h-full">
                            <span className="text-[10px] text-grey-500">
                              {budget.category}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-gray-900 text-left">
                            ${budget.maximum.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </BudgetChart>
                </div>
              </AnimatedSection>

              {/* RECURRING BILLS SECTION */}
              <AnimatedSection
                title="Recurring Bills"
                link="See Details"
                linkHref="/recurring"
              >
                <div className="w-full h-full flex flex-col gap-3 md:flex-row justify-between">
                  <RecurringBills recurringData={recurringData} />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
