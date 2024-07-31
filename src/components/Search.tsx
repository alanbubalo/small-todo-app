import { useRef } from "react";
import { debounce } from "throttle-debounce";
import { TextInput } from "./TextInput";
import { Select } from "./Select";

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

  return (
    <div className="flex gap-3 items-stretch">
      <TextInput
        ref={inputRef}
        name="search"
        onChange={debounce(500, handleSearch)}
        defaultValue={searchQuery}
        placeholder="Search..."
      />
      <Select
        ref={selectRef}
        name="state"
        className="w-56"
        onChange={handleSearch}
        defaultValue={filterState}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In progress</option>
        <option value="done">Done</option>
      </Select>
    </div>
  );
};
