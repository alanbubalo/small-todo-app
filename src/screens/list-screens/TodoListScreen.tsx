import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { TodoCard } from "../../components/TodoCard";
import { useTodoStore } from "../../store/todoStore";
import { Button } from "../../components/Button";
import { Search } from "../../components/Search";
import { getValidatedTodoListParams } from "../../utils/getValidatedTodoListParams";

export const TodoListScreen = () => {
  const { getFilteredTodoList } = useTodoStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const validatedSearchParams = getValidatedTodoListParams(searchParams);

  const todoList = getFilteredTodoList(
    validatedSearchParams.search,
    validatedSearchParams.state
  );

  const search = (search: string, state: string) => {
    setSearchParams({ search, state });
  };

  return (
    <div className="flex flex-col gap-4">
      <Link to="/create" className="size-fit">
        <Button>Create Todo</Button>
      </Link>
      <Search
        filterState={validatedSearchParams.state}
        searchQuery={validatedSearchParams.search}
        searchFn={search}
      />
      <div className="flex flex-col gap-2 divide-y divide-zinc-600">
        {todoList.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
