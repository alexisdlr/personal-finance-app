"use client";

import { cn, formatPrice } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";

import Image from "next/image";
import { TransactionData } from "@/types/api";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

const columnHelper = createColumnHelper<TransactionData>();

export const columns = [
  columnHelper.accessor((row) => row.name, {
    id: "Name",

    cell: (info) => (
      <div className="font-bold flex gap-2 items-center">
        <Image
          className="rounded-full"
          src={info.row.original.avatar}
          alt={info.getValue()}
          width={30}
          height={30}
        />
        <span className="text-sm font-bold text-[#201F24]">
          {info.getValue()}
        </span>
      </div>
    ),
    header: () => (
      <span className="text-xs  text-[#696868]">Recipient / Sender</span>
    ),
  }),

  columnHelper.accessor("category", {
    cell: (info) => (
      <p className="text-xs text-[#696868] text-center mx-auto">
        {info.getValue()}
      </p>
    ),
    header: () => (
      <span className="text-xs text-[#696868] text-center mx-auto">
        Category
      </span>
    ),
  }),

  columnHelper.accessor("date", {
    header: () => (
      <span className="text-xs text-[#696868] text-center mx-auto">
        Transaction Date
      </span>
    ),
    cell: (info) => (
      <p className="text-xs text-[#696868] text-center mx-auto">
        {formatDate(info.getValue().toString())}
      </p>
    ),
  }),

  columnHelper.accessor("amount", {
    id: "amount",

    header: () => (
      <span className="text-xs text-[#696868] text-right ml-auto">Amount</span>
    ),

    cell: (info) => {
      const amount = info.getValue();
      const isNegative = amount < 0;

      return (
        <p
          className={cn(
            "text-xs font-bold w-full ml-auto text-right",
            isNegative ? "text-gray-900" : "text-secondary-green",
          )}
        >
          {isNegative
            ? `-${formatPrice(Math.abs(amount))}`
            : `+${formatPrice(amount)}`}
        </p>
      );
    },
  }),
];
export const mobileColumns = [
  columnHelper.accessor((row) => row.name, {
    id: "Name",
    cell: (info) => (
      <div className="font-bold flex gap-2 items-center">
        <Image
          className="rounded-full"
          src={info.row.original.avatar}
          alt={info.getValue()}
          width={30}
          height={30}
        />
        <span className="text-xs text-gray-500">{info.getValue()}</span>
      </div>
    ),
  }),

  columnHelper.accessor("amount", {
    cell: (info) => {
      const amount = info.getValue();
      const isNegative = amount < 0;

      return (
        <p
          className={cn(
            "text-xs text-right font-bold",
            isNegative ? "text-gray-900" : "text-secondary-green",
          )}
        >
          {isNegative
            ? `-${formatPrice(Math.abs(amount))}`
            : `+${formatPrice(amount)}`}
        </p>
      );
    },
  }),
];
