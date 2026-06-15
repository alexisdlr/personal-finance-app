import React from "react";
import RecurringBillsData from "./recurring-bills-data";
import Link from "next/link";
import { NavIcons } from "../shared/nav-icons";
import { MotionDiv } from "../animated/motion-div";
import EmptyState from "../shared/empty-state";
import RecurringIcon from "../Icons/recurring-nav";

type Props = {
  recurringData: {
    paidBills: number;
    dueSoon: number;
    totalUpcoming: number;
  };
  totalBills: number;
};

const Recurring = ({ recurringData, totalBills }: Props) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="area-bills"
    >
      <div className="h-fit flex flex-col bg-white p-6 rounded-xl gap-5 items-center">
        <div className="w-full flex justify-between">
          <h2 className="text-grey-900 font-bold text-[20px]">
            Recurring Bills
          </h2>
          <div className="flex gap-2 items-center">
            <Link
              className="group hover:text-primary text-muted-foreground focus-visible:outline-primary flex items-center gap-3 rounded-xs text-sm capitalize transition-colors focus-visible:outline-1"
              href="/recurring"
            >
              See details
              {NavIcons.chevronRight}
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-3 md:flex-row justify-between">
          {totalBills === 0 ? (
            <EmptyState
              icon={
                <RecurringIcon color="currentColor" width={24} height={24} />
              }
              title="No recurring bills yet"
              description="Mark transactions as recurring to track your regular payments and due dates."
              className="w-full"
            />
          ) : (
            <RecurringBillsData recurringData={recurringData} />
          )}
        </div>
      </div>
    </MotionDiv>
  );
};

export default Recurring;
