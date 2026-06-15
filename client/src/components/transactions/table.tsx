"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import EmptyState from "../shared/empty-state";

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  isLoading?: boolean;
  skeletonRowCount?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
};

function TableSkeletonBody({
  columnCount,
  rowCount,
}: {
  columnCount: number;
  rowCount: number;
}) {
  return Array.from({ length: rowCount }).map((_, rowIndex) => (
    <tr key={rowIndex} className="animate-pulse">
      {Array.from({ length: columnCount }).map((_, colIndex) => (
        <td key={colIndex} className="px-4 py-4 whitespace-nowrap">
          {colIndex === 0 ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 shrink-0 animate-none rounded-full" />
              <Skeleton className="h-4 w-28 animate-none" />
            </div>
          ) : (
            <Skeleton
              className={cn(
                "h-4 animate-none",
                colIndex === columnCount - 1 ? "ml-auto w-16" : "mx-auto w-24",
              )}
            />
          )}
        </td>
      ))}
    </tr>
  ));
}

const Table = <T extends { id: string | number }>({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  isLoading = false,
  skeletonRowCount = 8,
  emptyTitle = "No data yet",
  emptyDescription = "There is nothing to display here at the moment.",
  emptyIcon,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: isLoading ? [] : data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value ?? "")
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  });

  const visibleColumnCount = table.getVisibleLeafColumns().length;
  const isEmpty = !isLoading && data.length === 0;

  return (
    <div className="overflow-x-auto custom-scrollbar bg-white lg:p-4">
      {isEmpty ? (
        <div className="py-12">
          <EmptyState
            icon={emptyIcon}
            title={emptyTitle}
            description={emptyDescription}
          />
        </div>
      ) : (
        <>
      <table className="min-w-full md:divide-gray-200 ">
        <thead className="hidden md:table-header-group bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-4 py-2 text-left text-sm font-medium text-gray-900 ${
                    header.id === "select" || isLoading ? "" : "cursor-pointer"
                  } whitespace-nowrap`}
                  onClick={
                    header.id === "select" || isLoading
                      ? undefined
                      : header.column.getToggleSortingHandler()
                  }
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {!isLoading &&
                        header.id !== "select" &&
                        header.id !== "actions" && (
                          <span>
                            {{
                              asc: (
                                <ArrowUp size={12} className="text-gray-400" />
                              ),
                              desc: (
                                <ArrowDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <span className="text-gray-400">
                                <ChevronsUpDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              </span>
                            )}
                          </span>
                        )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <TableSkeletonBody
              columnCount={visibleColumnCount}
              rowCount={skeletonRowCount}
            />
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 my-2">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          {isLoading ? (
            <>
              <Skeleton className="inline-block h-8 w-20 rounded-md" />
              <Skeleton className="inline-block h-8 w-14 rounded-md" />
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default Table;
