"use client";

import { useMemo, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  globalFilter?: string; // Filtro global opcional
  setGlobalFilter?: (value: string) => void; // Función opcional para cambiar el filtro global
};

const Table = <T extends { id: string | number }>({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter, // Actualiza el filtro (solo si se pasa)
    onSortingChange: setSorting, // Maneja los cambios de ordenamiento
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Habilita ordenamiento
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId); // Obtiene el valor
      // Convierte a cadena si el valor no es nulo o indefinido
      return String(value ?? "")
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  });



  return (
    <div className="overflow-x-auto custom-scrollbar bg-white lg:p-4">
      <table className="min-w-full md:divide-gray-200 md:border border-gray-300">
        <thead className="hidden md:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-4 py-2 text-left text-sm font-medium text-gray-900 ${header.id === "select" ? "" : "cursor-pointer"
                    } whitespace-nowrap`}
                  onClick={header.id === "select" ? undefined : header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : (
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.id !== "select" && header.id !== 'actions' && (
                          <span>
                            {{
                              asc: <ArrowUp size={12} className="text-gray-400" />, // Ícono de orden ascendente
                              desc: <ArrowDown size={12} className="text-gray-400" />, // Ícono de orden descendente
                            }[header.column.getIsSorted() as string] ?? (
                                <span className="text-gray-400"><ChevronsUpDown size={12} className="text-gray-400" /> </span> // Ícono por defecto
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-2 py-4">

        <div className="space-x-2">
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
        </div>
      </div>
    </div>
  );
};

export default Table;