"use client";

import Table from "@/components/transactions/table";
import TransactionFilters, {
  SortOption,
} from "@/components/transactions/transaction-filters";

import { MotionDiv } from "@/components/animated/motion-div";
import { useMemo, useState } from "react";

import { useTransactions } from "@/hooks/transactions/use-transactions";
import {
  columns,
  mobileColumns,
} from "@/components/transactions/transaction-columns";
import { sortTransactions } from "@/lib/utils";
import { TransactionData } from "@/types/api";
import { Button } from "@/components/ui/button";

const TransactionsPage = () => {
  const { transactions } = useTransactions();

  const [globalFilter, setGlobalFilter] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const uniqueCategories = useMemo<string[]>(
    () => [
      ...new Set(
        transactions.map(
          (transaction: TransactionData) => transaction.category,
        ),
      ),
    ],
    [transactions],
  );

  const transactionsFiltered = useMemo(() => {
    let filtered = transactions;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (transaction: TransactionData) =>
          transaction.category === categoryFilter,
      );
    }

    return sortTransactions(filtered, sortBy);
  }, [transactions, categoryFilter, sortBy]);

  return (
    <div className="w-full h-full sm:h-full lg:mt-6 px-3 flex flex-col ">
      <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <header className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-grey-900 font-bold text-4xl">Transactions</h1>
            <p className="text-grey-500 max-w-2xl truncate lg:text-balance lg:whitespace-normal lg:overflow-visible mt-2">
              Manage your transaction history. Use the filters to search, sort,
              and categorize your expenses and income for better financial
              insights.
            </p>
          </div>
          <Button className="px-6 py-6 text-lg font-semibold flex items-center gap-2 cursor-pointer">
            + New Transaction
          </Button>
        </header>
      </MotionDiv>

      <MotionDiv className="bg-white p-5 rounded-lg shadow-lg mt-8">
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
