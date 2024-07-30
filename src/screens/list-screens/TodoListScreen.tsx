import { Link } from "react-router-dom";
import { TodoCard } from "../../components/TodoCard";
import { useTodoStore } from "../../store/todoStore";
import { Button } from "../../components/Button";

export const TodoListScreen = () => {
  const { todoList } = useTodoStore();

  return (
    <div className="flex flex-col gap-4">
      <Link to="/create">
        <Button>Create Todo</Button>
      </Link>
      <div className="flex flex-col gap-2 divide-y divide-zinc-600">
        {todoList.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
