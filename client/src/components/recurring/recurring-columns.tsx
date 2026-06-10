"use client";

import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { formatPrice } from "@/lib/utils";
import { Transaction } from "@/types/global";

const columnHelper = createColumnHelper<Transaction>();
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

export const recurringColumns = [
  columnHelper.accessor("name", {
    header: () => <span className="text-xs text-gray-500">Bill Title</span>,

    cell: (info) => (
      <div className="flex items-center gap-3">
        <Image
          src={info.row.original.avatar}
          alt={info.getValue()}
          width={32}
          height={32}
          className="rounded-full"
        />

        <span className="font-bold text-sm">{info.getValue()}</span>
      </div>
    ),
  }),

  columnHelper.accessor("date", {
    header: () => <span className="text-xs text-gray-500">Due Date</span>,

    cell: (info) => (
      <span className="text-sm text-gray-500">
        {formatDate(info.getValue().toString())}
      </span>
    ),
  }),

  columnHelper.accessor("amount", {
    header: () => <span className="text-xs text-gray-500">Amount</span>,

    cell: (info) => (
      <div className="text-right font-bold">
        {formatPrice(Math.abs(info.getValue()))}
      </div>
    ),
  }),
];
