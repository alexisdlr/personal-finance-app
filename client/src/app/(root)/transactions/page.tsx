"use client"
import { MotionDiv } from "@/components/animated/motion-div";
import Table from "@/components/table"
import { useGlobalState } from "@/store/global-store";
import { Transaction } from "@/types/global";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";


const TransacionsPage = () => {
  const { transactions } = useGlobalState()

  const columnHelper = createColumnHelper<Transaction>()

  const columns = [
    columnHelper.accessor('id', {
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
    }),
    // you can use different aproach here
    columnHelper.accessor(row => row.name, {
      id: 'Name',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('amount', {
      header: () => 'Amount',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('date', {
      header: () => 'Date',
      cell: info => info.getValue(),
    })


  ]
  return (
    <div className="w-full h-full pt-6 px-6 lg:px-10 flex flex-col">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-grey-900 font-bold text-3xl">Transactions</h1>
      </MotionDiv>

      <MotionDiv>
        <Table data={transactions} columns={columns} />
      </MotionDiv>
    </div>
  )
}

export default TransacionsPage