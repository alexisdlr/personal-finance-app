"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "./search-input";
import { NavIcons } from "../shared/nav-icons";

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

const filterTriggerClassName =
  "flex h-9 w-9 shrink-0 items-center justify-center border-0 bg-transparent p-0 shadow-none outline-0 focus:ring-0 focus-visible:ring-0 " +
  "[&>span:first-child]:flex [&>span:first-child]:items-center [&>span:first-child]:justify-center md:[&>span:first-child]:hidden " +
  "[&>span:nth-child(2)]:!hidden md:[&>span:nth-child(2)]:!block md:[&>span:nth-child(2)]:min-w-0 md:[&>span:nth-child(2)]:flex-1 md:[&>span:nth-child(2)]:truncate " +
  "md:h-12.5 md:w-35 md:min-w-35 md:justify-between md:gap-2 md:border-2 md:bg-white md:px-3 md:py-1 md:text-xs md:text-gray-700";

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

      <div className="flex items-center md:mt-4 md:mb-2">
        <div className="flex items-center gap-4 md:gap-8">
          {/* SORT */}
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground whitespace-nowrap md:inline">
              Sort by
            </span>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger
                className={filterTriggerClassName}
                aria-label="Sort by"
              >
                <span>{NavIcons.sort}</span>
                <span>
                  <SelectValue
                    className="text-base text-primary"
                    placeholder="Latest"
                  />
                </span>
              </SelectTrigger>

              <SelectContent position="popper" side="bottom" sideOffset={4}>
                <SelectGroup>
                  <SelectLabel className="sr-only">Sort by</SelectLabel>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="atoz">A to Z</SelectItem>
                  <SelectItem value="ztoa">Z to A</SelectItem>
                  <SelectItem value="highest">Highest</SelectItem>
                  <SelectItem value="lowest">Lowest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* CATEGORY */}
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-gray-500 whitespace-nowrap md:inline">
              Category:
            </span>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                className={filterTriggerClassName}
                aria-label="Category"
              >
                <span>{NavIcons.filter}</span>
                <span>
                  <SelectValue
                    className="text-base text-primary"
                    placeholder="All transactions"
                  />
                </span>
              </SelectTrigger>

              <SelectContent position="popper" side="bottom" sideOffset={4}>
                <SelectGroup>
                  <SelectLabel className="sr-only">Category</SelectLabel>
                  <SelectItem value="all">All transactions</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
