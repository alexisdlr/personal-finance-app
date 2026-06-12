import React from "react";
import TransactionsList from "./transactions-list";
import AnimatedSection from "./animated-section";
import { TransactionData } from "@/types/api";

type TransactionsProps = {
  transactions: TransactionData[];
};

const Transactions = ({ transactions }: TransactionsProps) => {
  return (
    <div className="area-transactions">
      <AnimatedSection
        title="Transactions"
        link="See Details"
        linkHref="/transactions"
      >
        <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
          <TransactionsList transactions={transactions} />
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Transactions;
