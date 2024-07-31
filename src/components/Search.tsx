import { useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface ISearchProps {
  searchQuery: string;
  filterState: string;
  searchFn: (searchTerm: string, filterState: string) => void;
}

export const Search = ({
  searchQuery,
  filterState,
  searchFn,
}: ISearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSearch = () => {
    searchFn(inputRef.current?.value ?? "", selectRef.current?.value ?? "");
  };

  const debouncedOnChange = useDebounce(handleSearch, 500);

  return (
    <div className="flex gap-3 items-stretch">
      <input
        ref={inputRef}
        type="text"
        className="w-full border border-zinc-500 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md"
        onChange={debouncedOnChange}
        defaultValue={searchQuery}
        placeholder="Search..."
      />
      <select
        ref={selectRef}
        className="w-56 border border-zinc-500 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md"
        onChange={handleSearch}
        defaultValue={filterState}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};
