import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { TodoCard } from "../../components/TodoCard";
import { useTodoStore } from "../../store/todoStore";
import { Button } from "../../components/Button";
import { Search } from "../../components/Search";

export const TodoListScreen = () => {
  const { getFilteredTodoList } = useTodoStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") ?? "";
  const state = searchParams.get("state") ?? "all";

  const todoList = getFilteredTodoList(searchTerm, state);

  const search = (searchTerm: string, filterState: string) => {
    setSearchParams({
      search: searchTerm,
      state: filterState,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Link to="/create" className="size-fit">
        <Button>Create Todo</Button>
      </Link>
      <Search filterState={state} searchQuery={searchTerm} searchFn={search} />
      <div className="flex flex-col gap-2 divide-y divide-zinc-600">
        {todoList.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
