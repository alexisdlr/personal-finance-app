"use client"
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
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
import Pots from "@/components/pots";

export default function Home() {
  const overviewQuery = useFetchOverviewData()
  const setGlobalData = useGlobalState((state) => state.setGlobalData);
  const router = useRouter()

  const { mutateAsync: logout } = useLogout();

  useEffect(() => {
    if (overviewQuery.isSuccess) {
      setGlobalData(overviewQuery.data.data)
    }
  }, [])

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

  const { balance, pots } = useGlobalState()

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
        <div className="flex flex-col md:flex-row justify-start lg:justify-between gap-5 flex-wrap items-center">
          <CardBalance type="Current Balance" value={balance?.current} />
          <CardBalance type="Income" value={balance?.income} classname="bg-white text-grey-500 shadow-lg" />
          <CardBalance type="Expenses" value={balance?.expenses} classname="bg-white text-grey-500 shadow-lg" />
        </div>
      </MotionDiv>

      {/* POTS SECTION */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 w-full">
        <div className="flex flex-col bg-white p-8 rounded-xl gap-5 items-center">
          <div className="w-full flex justify-between">
            <h2 className="text-grey-900 font-bold text-3xl">Pots</h2>
            <div className="flex gap-2 items-center">
              <Link href='/pots' className="text-sm text-grey-500 transition-all duration-200 hover:underline">See Details</Link>
              <Image src={'/images/icon-caret-right.svg'} alt="caret left" width={6} height={6} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <TotalSaved />
            <Pots pots={pots} />
          </div>
        </div>
      </MotionDiv>

    </div>
  );
}
