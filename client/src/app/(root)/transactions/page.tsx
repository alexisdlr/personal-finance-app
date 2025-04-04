"use client"
import { MotionDiv } from "@/components/animated/motion-div";
import SearchInput from "@/components/search-input";
import Table from "@/components/table"
import { useGlobalState } from "@/store/global-store";
import { Transaction } from "@/types/global";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { useMemo, useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { setGlobal } from "next/dist/trace";
import { set } from "zod";
import { useReducer } from "react";
import { Filter, SortAsc } from "lucide-react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
}
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
    id: 'amount',
    header: () => <span className="text-xs text-gray-500">Amount</span>,
    cell: info => {
      const price = info.renderValue() || 0
      const isNegative = price < 0
      const formattedPrice = formatPrice(Math.abs(price))
      return (
        <p className={cn("text-xs text-gray-500 text-left font-bold", !isNegative && "text-secondary-green")}>
          {isNegative ? `-${formattedPrice}` : `+${formattedPrice}`}
        </p>
      )
    },

  }),

]

const mobileColumns = [
  columnHelper.accessor(row => row.name, {
    id: 'Name',
    cell: info => <div className="font-bold flex gap-2 items-center">
      <Image className="rounded-full" src={info.row.original.avatar} alt="ASS" width={30} height={30} />
      <span className="text-xs text.gray.500">{info.getValue()}</span>
    </div>,
  }),


  columnHelper.accessor('amount', {
    cell: info => <p className="text-xs text-gray-500 text-right">{info.renderValue()}</p>,

  })

]

// Define los posibles valores de acción
type FilterAction =
  | "latest"
  | "oldest"
  | "atoz"
  | "ztoa"
  | "highest"
  | "lowest";

// Define el estado de los filtros
type FilterState = {
  latest: boolean;
  oldest: boolean;
  aToZ: boolean;
  zToA: boolean;
  highest: boolean;
  lowest: boolean;
};

const TransacionsPage = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const { transactions } = useGlobalState()

  const category = transactions.map((transaction) => transaction.category)
  const uniqueCategories = [...new Set(category)]


  const filterReducer = (state: FilterState, action: FilterAction) => {
    return {
      latest: action === "latest",
      oldest: action === "oldest",
      aToZ: action === "atoz",
      zToA: action === "ztoa",
      highest: action === "highest",
      lowest: action === "lowest",
    };
  };

  const [filterValue, dispatchFilter] = useReducer(filterReducer, {
    latest: false,
    oldest: false,
    aToZ: false,
    zToA: false,
    highest: false,
    lowest: false,
  });

  const handleFilterChange = (value: string) => {
    const validActions: FilterAction[] = ["latest", "oldest", "atoz", "ztoa", "highest", "lowest"];

    if (validActions.includes(value as FilterAction)) {
      dispatchFilter(value as FilterAction);
    } else {
      console.error("Valor inválido para dispatchFilter:", value);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value)
  }


  const transactionsFiltered = useMemo(() => {
    let filtered = transactions;

    // Filtrar por categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.category === categoryFilter);
    }

    // Ordenar según el filtro seleccionado
    if (filterValue.latest) {
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filterValue.oldest) {
      filtered = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (filterValue.aToZ) {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterValue.zToA) {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    } else if (filterValue.highest) {
      filtered = [...filtered].sort((a, b) => b.amount - a.amount);
    } else if (filterValue.lowest) {
      filtered = [...filtered].sort((a, b) => a.amount - b.amount);
    }

    return filtered;
  }, [filterValue, transactions, categoryFilter]);

  return (
    <div className="w-full h-full pt-6 sm:px-6 px-3 lg:px-10 flex flex-col pb-24">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-grey-900 font-bold text-3xl mt-2 mb-4">Transactions</h1>
      </MotionDiv>

      <MotionDiv className="bg-white p-5 rounded-lg shadow-lg">
        <div className="p-0 lg:p-3 flex items-center justify-between gap-2 mb-2 md:mb-0">
          <SearchInput globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} placeholder="Search transactions..." />

          {/* FILTERS */}
          <div className="flex items-center justify-between md:mt-4 md:mb-2">
            <div className="flex items-center gap-2 w-full ">
              <span className="hidden md:block text-sm text-gray-500 min-w-14">Sort by:</span>
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="bg-white text-gray-700 px-2 py-1 rounded-md text-xs border-2" aria-label="Sort by">
                  <span className="!hidden md:!block">
                    <SelectValue placeholder="Select" />
                  </span>
                  <SortAsc className="md:hidden text-black" size={22} />
                </SelectTrigger>

                <SelectContent className="bg-white shadow-lg rounded-md">
                  <SelectItem value="latest" className="text-xs text-gray-700 px-2 py-1 hover:bg-gray-100">Latest</SelectItem>
                  <SelectItem value="oldest" className="text-xs text-gray-700 px-2 py-1 hover:bg-gray-100">Oldest</SelectItem>
                  <SelectItem value="atoz" className="text-xs text-gray-700 px-2 py-1 hover:bg-gray-100">A to Z</SelectItem>
                  <SelectItem value="ztoa" className="text-xs text-gray-700 px-2 py-1 hover:bg-gray-100">Z to A</SelectItem>
                  <SelectItem value="highest" className="text-xs text-gray-700 px-2 py-1 hover:bg-gray-100">Highest</SelectItem>
                  <SelectItem value="lowest" className="text-xs text-gray-700 px-2 py-1 hover:bg-gray-100">Lowest</SelectItem>
                </SelectContent>
              </Select>
              <span className="hidden md:block text-sm text-gray-500 min-w-14">Category: </span>
              <Select defaultValue="all" onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-white text-gray-700 px-2 py-1 rounded-md text-xs border-2" aria-label="Category">
                  <span className="!hidden md:!block">
                    <SelectValue placeholder="Select" />
                  </span>
                  <Filter className="md:hidden text-black" size={20} />
                </SelectTrigger>

                <SelectContent className="bg-white shadow-lg rounded-md">
                  <SelectItem value="all" className="text-xs text-gray-700 px-2 py-1 hover:bg-gray-100">All Transactions</SelectItem>
                  {
                    uniqueCategories.map((category, index) => (
                      <SelectItem key={index} value={category} className="text-xs text-gray-700 px-2 py-1 hover:bg-gray-100">{category}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* MOBILE TABLE */}
        <div className="block md:hidden overflow-x-auto">
          <Table data={transactionsFiltered} columns={mobileColumns} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        </div>
        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <Table data={transactionsFiltered} columns={columns} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        </div>
      </MotionDiv>
    </div>
  )
}

export default TransacionsPage