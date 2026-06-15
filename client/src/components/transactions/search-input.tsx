import { Search } from "lucide-react";
import { Input } from "../ui/input";

type SearchInputProps = {
  globalFilter: string;
  placeholder?: string;
  setGlobalFilter: (value: string) => void;
};

const SearchInput = ({
  globalFilter,
  placeholder,
  setGlobalFilter,
}: SearchInputProps) => {
  return (
    <div className="relative w-full max-w-32 md:max-w-2xs">
      {/* Input de búsqueda */}
      <Input
        type="text"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder={placeholder || "Search..."}
        className=" w-full px-4 py-[22px] pr-10 outline-0 outline-offset-0 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition duration-200 text-sm mt-2"
      />
      <Search
        size={14}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default SearchInput;
