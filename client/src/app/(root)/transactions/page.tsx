"use client";

import Table from "@/components/transactions/table";
import TransactionFilters, {
  SortOption,
} from "@/components/transactions/transaction-filters";

import { MotionDiv } from "@/components/animated/motion-div";
import { Transaction } from "@/types/global";
import { useMemo, useState } from "react";

import { useTransactions } from "@/hooks/transactions/use-transactions";
import {
  columns,
  mobileColumns,
} from "@/components/transactions/transaction-columns";

const sortTransactions = (transactions: Transaction[], sortBy: SortOption) => {
  const sorted = [...transactions];

  switch (sortBy) {
    case "latest":
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

    case "atoz":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "ztoa":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case "highest":
      return sorted.sort((a, b) => b.amount - a.amount);

    case "lowest":
      return sorted.sort((a, b) => a.amount - b.amount);

    default:
      return sorted;
  }
};

const TransactionsPage = () => {
  const { transactions } = useTransactions();

  const [globalFilter, setGlobalFilter] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const uniqueCategories = useMemo<string[]>(
    () => [
      ...new Set(
        transactions.map((transaction: Transaction) => transaction.category),
      ),
    ],
    [transactions],
  );

  const transactionsFiltered = useMemo(() => {
    let filtered = transactions;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (transaction: Transaction) => transaction.category === categoryFilter,
      );
    }

    return sortTransactions(filtered, sortBy);
  }, [transactions, categoryFilter, sortBy]);

  return (
    <div className="w-full h-screen pt-6 sm:px-6 px-3 lg:px-10 flex flex-col pb-24">
      <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-grey-900 font-bold text-3xl mt-2 mb-10">
          Transactions
        </h1>
      </MotionDiv>

      <MotionDiv className="bg-white p-5 rounded-lg shadow-lg">
        <TransactionFilters
          search={globalFilter}
          setSearch={setGlobalFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          category={categoryFilter}
          setCategory={setCategoryFilter}
          categories={uniqueCategories}
        />

        {/* MOBILE */}
        <div className="block md:hidden overflow-x-auto">
          <Table
            data={transactionsFiltered}
            columns={mobileColumns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block overflow-x-auto">
          <Table
            data={transactionsFiltered}
            columns={columns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </MotionDiv>
    </div>
  );
};

export default TransactionsPage;
