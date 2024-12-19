"use client"
import { useRouter } from "next/navigation";
import Button from "@/components/auth/button";
import useLogout from "@/hooks/useLogout";
import toast from "react-hot-toast";
import { MotionDiv } from "@/components/animated/motion-div";
import CardBalance from "@/components/card-balance";
import Link from "next/link";
import Image from "next/image";
import TotalSaved from "@/components/total-saved";
import { useGlobalState } from "@/store/global-store";
import useFetchOverviewData from "@/hooks/use-get-overview-data";
import { useEffect } from "react";
import Pots from "@/components/pots-overview";
import Transactions from "@/components/transactions-overview";
import BudgetChart from "@/components/budget-chart";

export default function Home() {
  const overviewQuery = useFetchOverviewData()
  const setGlobalData = useGlobalState((state) => state.setGlobalData);
  const router = useRouter()

  console.log(overviewQuery, 'overview query');

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
      const res = await logout();

      if (res.error) {
        toast.error(res.error)
        return
      }
      const mss = res.message ? res.message : ''
      toast.success(mss)
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error); // Manejo de error
      toast.error(error.message);
    }
  }

  const { balance, pots, transactions, budgets } = useGlobalState()

  const totalSaved = pots.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="w-full h-full pt-6 px-6 lg:px-10 flex flex-col">
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
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-6 w-full">
            <div className="flex flex-col bg-white p-8 rounded-xl gap-5 items-center">
              <div className="w-full flex justify-between">
                <h2 className="text-grey-900 font-bold text-3xl">Pots</h2>
                <div className="flex gap-2 items-center">
                  <Link href='/pots' className="text-sm text-grey-500 transition-all duration-200 hover:underline">See Details</Link>
                  <Image src={'/images/icon-caret-right.svg'} alt="caret left" width={6} height={6} />
                </div>
              </div>
              <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
                <TotalSaved total={totalSaved} />
                <Pots pots={pots} />
              </div>
            </div>
          </MotionDiv>

          {/* TRANSACTIONS SECTION */}
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-6 w-full">
            <div className="flex flex-col bg-white p-8 rounded-xl gap-5 items-center">
              <div className="w-full flex justify-between">
                <h2 className="text-grey-900 font-bold text-3xl">Transactions</h2>
                <div className="flex gap-2 items-center">
                  <Link href='/transactions' className="text-sm text-grey-500 transition-all duration-200 hover:underline">View All</Link>
                  <Image src={'/images/icon-caret-right.svg'} alt="caret left" width={6} height={6} />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <Transactions transactions={transactions} />
              </div>
            </div>
          </MotionDiv>

        </div>
        {/* RIGHT */}
        <div className="w-full h-[500px] lg:h-auto lg:w-[40%]">
          {/* BUDGETS SECTION */}
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-6 w-full">
            <div className="flex flex-col bg-white p-8 rounded-xl gap-5 items-center">
              <div className="w-full flex justify-between">
                <h2 className="text-grey-900 font-bold text-3xl">Budgets</h2>
                <div className="flex gap-2 items-center">
                  <Link href='/budgets' className="text-sm text-grey-500 transition-all duration-200 hover:underline">See Details</Link>
                  <Image src={'/images/icon-caret-right.svg'} alt="caret left" width={6} height={6} />
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-3 md:flex-row justify-between">
                <BudgetChart budgets={budgets} transactions={transactions} />
              </div>
            </div>
          </MotionDiv>
        </div>

      </div>


    </div>
  );
}
