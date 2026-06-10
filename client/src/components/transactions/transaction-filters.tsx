"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SortAsc } from "lucide-react";
import SearchInput from "./search-input";

export type SortOption =
  | "latest"
  | "oldest"
  | "atoz"
  | "ztoa"
  | "highest"
  | "lowest";

type TransactionFiltersProps = {
  search: string;
  setSearch: (value: string) => void;

  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;

  category: string;
  setCategory: (value: string) => void;

  categories: string[];
};

export default function TransactionFilters({
  search,
  setSearch,
  sortBy,
  setSortBy,
  category,
  setCategory,
  categories,
}: TransactionFiltersProps) {
  return (
    <div className="p-0 lg:p-3 flex items-center justify-between gap-2 mb-2 md:mb-0">
      <SearchInput
        globalFilter={search}
        setGlobalFilter={setSearch}
        placeholder="Search transactions..."
      />

      <div className="flex items-center justify-between md:mt-4 md:mb-2">
        <div className="flex items-center gap-2 w-full">
          {/* SORT */}
          <span className="hidden md:block text-sm text-gray-500 min-w-14">
            Sort by:
          </span>

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger
              className="bg-white text-gray-700 px-2 py-1 rounded-md text-xs border-2"
              aria-label="Sort by"
            >
              <span className="hidden md:block">
                <SelectValue />
              </span>

              <SortAsc className="md:hidden text-black" size={22} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="atoz">A to Z</SelectItem>
              <SelectItem value="ztoa">Z to A</SelectItem>
              <SelectItem value="highest">Highest</SelectItem>
              <SelectItem value="lowest">Lowest</SelectItem>
            </SelectContent>
          </Select>

          {/* CATEGORY */}
          <span className="hidden md:block text-sm text-gray-500 min-w-14">
            Category:
          </span>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              className="bg-white text-gray-700 px-2 py-1 rounded-md text-xs border-2"
              aria-label="Category"
            >
              <span className="hidden md:block">
                <SelectValue />
              </span>

              <Filter className="md:hidden text-black" size={20} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>

              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
