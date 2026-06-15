import { useMemo } from "react";
import Pots from "./pots";
import Transactions from "./transactions";
import Budgets from "./budgets";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { MotionDiv } from "../animated/motion-div";
import CardBalance from "./card-balance";
import useHandleLogout from "@/hooks/auth/use-handle-logout";
import { OverviewData } from "@/types/api";
import Recurring from "./recurring";

type OverviewContentProps = {
  data: OverviewData;
};

const OverviewContent = ({ data }: OverviewContentProps) => {
  const handleLogout = useHandleLogout();

  const balance = data?.balance ?? 0;
  const income = data?.income ?? 0;
  const expenses = data?.expenses ?? 0;

  const pots = data?.pots ?? [];
  const budgets = data?.budgets ?? [];
  const transactions = data?.transactions ?? [];

  const totalSaved = data?.totalSaved ?? 0;

  const recurringData = useMemo(
    () => ({
      paidBills: data?.bills.paidTotal ?? 0,
      totalUpcoming: data?.bills.upcomingTotal ?? 0,
      dueSoon: data?.bills.dueSoonTotal ?? 0,
    }),
    [data],
  );
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.maximum, 0);

  return (
    <div className="w-full h-full lg:mt-6 md:pb-4 px-3 flex flex-col">
      <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <header className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-grey-900 font-bold text-3xl md:text-4xl">
              Overview
            </h1>
            <p className="text-grey-500 max-w-3xs truncate lg:max-w-2xl hidden md:block">
              Monitor your financial health, track spending, and manage budgets
              across accounts all in one place.
            </p>
          </div>

          <Button
            className="p-6 text-lg font-semibold flex items-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            Logout <LogOut size={30} className="size-6" />
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
      <div className="w-full grid-layout lg:gap-6">
        <Pots pots={pots} totalSaved={totalSaved} />
        <Transactions transactions={transactions} />

        <Budgets
          budgets={budgets}
          totalLimit={totalLimit}
          totalSpent={totalSpent}
        />
        <Recurring
          recurringData={recurringData}
          totalBills={data?.bills.totalBills ?? 0}
        />
      </div>
    </div>
  );
};

export default OverviewContent;
