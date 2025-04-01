"use client"
import { MotionDiv } from "@/components/animated/motion-div";
import SearchInput from "@/components/search-input";
import Table from "@/components/table"
import { useGlobalState } from "@/store/global-store";
import { Transaction } from "@/types/global";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { useMemo, useState } from "react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
}

const TransacionsPage = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const { transactions } = useGlobalState()

  const columnHelper = createColumnHelper<Transaction>()

  const columns = [

    columnHelper.accessor(row => row.name, {
      id: 'Name',
      cell: info => <div className="font-bold flex gap-2 items-center">
        <Image className="rounded-full" src={info.row.original.avatar} alt="ASS" width={30} height={30} />
        <span className="text-xs text.gray.500">{info.getValue()}</span>
      </div>,
      header: () => <span className="text-xs text-gray-500">Recipient / Sender</span>,
    }),
    columnHelper.accessor('category', {
      cell: info => <p className="text-xs text-gray-500">{info.getValue()}</p>,
      header: () => <span className="text-xs text-gray-500">Category</span>,
    }),
    // you can use different aproach here

    columnHelper.accessor('date', {
      header: () => <span className="text-xs text-gray-500">Transaction Date</span>,
      cell: info => <p className="text-xs text-gray-500">{formatDate(info.getValue().toString())}</p>,
      // cell: info => info.renderValue(),
    }),

    columnHelper.accessor('amount', {
      header: () => <span className="text-xs text-gray-500">Amount</span>,
      cell: info => <p className="text-xs text-gray-500">{info.renderValue()}</p>,

    }),

  ]
  return (
    <div className="w-full h-full pt-6 px-6 lg:px-10 flex flex-col">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-grey-900 font-bold text-3xl mt-2 mb-4">Transactions</h1>
      </MotionDiv>

      <MotionDiv className="bg-white p-5 rounded-lg shadow-lg">
        <div className="p-3">

          <SearchInput globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} placeholder="Search transactions..." />
        </div>
        <Table data={transactions} columns={columns} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </MotionDiv>
    </div>
  )
}

export default TransacionsPage