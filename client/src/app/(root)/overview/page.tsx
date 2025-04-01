"use client"
import { useRouter } from "next/navigation";
import Button from "@/components/auth/button";
import useLogout from "@/hooks/useLogout";
import toast from "react-hot-toast";
import { MotionDiv } from "@/components/animated/motion-div";
import CardBalance from "@/components/overview/card-balance";
import Link from "next/link";
import Image from "next/image";
import TotalSaved from "@/components/total-saved";
import { useGlobalState } from "@/store/global-store";
import useFetchOverviewData from "@/hooks/use-get-overview-data";
import { useEffect, useMemo } from "react";
import Pots from "@/components/overview/pots-overview";
import Transactions from "@/components/overview/transactions-overview";
import BudgetChart from "@/components/overview/budget-chart";
import RecurringBills from "@/components/overview/recurring-bills";
import AnimatedSection from "@/components/overview/animated-section";

export default function Home() {
  const overviewQuery = useFetchOverviewData()
  const setGlobalData = useGlobalState((state) => state.setGlobalData);
  const router = useRouter()

  const { mutateAsync: logout } = useLogout();

  useEffect(() => {
    // Verificar que overviewQuery.data esté definido antes de acceder a 'error'
    if (!overviewQuery.data) return;
    if (overviewQuery.error) return;

    if (overviewQuery.isSuccess && overviewQuery.data) {
      setGlobalData(overviewQuery.data.data);
    }
  }, [overviewQuery.isSuccess, overviewQuery.data, setGlobalData]);

  const handleLogout = async () => {
    try {
      const { error, message } = await logout();
      if (error) return toast.error(error);

      toast.success(message || "Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error(error.message || "An error occurred");
    }
  };

  const { balance, pots, transactions, budgets, paidBills, totalUpcoming, dueSoon } = useGlobalState()


  const totalSaved = useMemo(() =>
    pots.reduce((sum, item) => sum + item.total, 0), [pots]
  );

  const recurringData = useMemo(() => ({
    paidBills,
    totalUpcoming,
    dueSoon
  }), [paidBills, totalUpcoming, dueSoon]);

  return (
    <div className="w-full h-full pt-6 pb-20 md:pb-4 px-6 lg:px-10 flex flex-col">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <header className="flex justify-between items-center">
          <h1 className="text-grey-900 font-bold text-3xl" >Overview</h1>
          <Button className="px-8 text-xs font-semibold" onClick={handleLogout}>Logout</Button>
        </header>
      </MotionDiv>

      {/* BALANCE SECTION */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 w-full">
        <div className="flex flex-col md:flex-row justify-start md:justify-between gap-5 flex-wrap items-center">
          <CardBalance type="Current Balance" value={balance?.current} />
          <CardBalance type="Income" value={balance?.income} classname="bg-white text-grey-500 shadow-lg" />
          <CardBalance type="Expenses" value={balance?.expenses} classname="bg-white text-grey-500 shadow-lg" />
        </div>
      </MotionDiv>

      <div className="w-full flex flex-col lg:flex-row lg:gap-6">
        {/* LEFT */}
        <div className="w-full lg:w-[60%]">
          {/* POTS SECTION */}
          <AnimatedSection title="Pots" link="See Details" linkHref="/pots">
            <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
              <TotalSaved total={totalSaved} />
              <Pots pots={pots} />
            </div>
          </AnimatedSection>

          {/* TRANSACTIONS SECTION */}
          <AnimatedSection title="Transactions" link="See Details" linkHref="/transactions">
            <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
              <Transactions transactions={transactions} />
            </div>
          </AnimatedSection>

        </div>
        {/* RIGHT */}
        <div className="w-full h-full lg:h-auto lg:w-[40%]">
          {/* BUDGETS SECTION */}

          <AnimatedSection title="Budgets" link="See Details" linkHref="/budgets">
            <div className="w-full  flex flex-col gap-3 md:flex-row justify-between">
              <BudgetChart budgets={budgets} transactions={transactions} />
            </div>
          </AnimatedSection>

          {/* RECURRING BILLS SECTION */}
          <AnimatedSection title="Recurring Bills" link="See Details" linkHref="/recurring">
            <div className="w-full h-full flex flex-col gap-3 md:flex-row justify-between">
              <RecurringBills recurringData={recurringData} />
            </div>
          </AnimatedSection>
        </div>

      </div>


    </div>
  );
}
