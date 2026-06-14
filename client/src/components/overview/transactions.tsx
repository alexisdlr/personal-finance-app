import React from "react";
import TransactionsList from "./transactions-list";
import { TransactionData } from "@/types/api";
import Link from "next/link";
import { NavIcons } from "../shared/nav-icons";
import { MotionDiv } from "../animated/motion-div";

type TransactionsProps = {
  transactions: TransactionData[];
};

const Transactions = ({ transactions }: TransactionsProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="area-transactions"
    >
      <div className="h-fit flex flex-col bg-white p-6 rounded-xl gap-5 items-center">
        <div className="w-full flex justify-between">
          <h2 className="text-grey-900 font-bold text-[20px]">Transactions</h2>

          <div className="flex gap-2 items-center">
            <Link
              className="group hover:text-primary text-muted-foreground focus-visible:outline-primary flex items-center gap-3 rounded-xs text-sm capitalize transition-colors focus-visible:outline-1"
              href="/transactions"
            >
              See details
              {NavIcons.chevronRight}
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
          <TransactionsList transactions={transactions} />
        </div>
      </div>
    </MotionDiv>
  );
};

export default Transactions;
