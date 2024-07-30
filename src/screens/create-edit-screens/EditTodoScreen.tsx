import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { TodoForm } from "../../forms/TodoForm";
import { useTodoStore } from "../../store/todoStore";

export const EditTodoScreen = () => {
  const params = useParams();
  const { updateTodo, getTodoById, deleteTodo } = useTodoStore();

  const todo = getTodoById(params.todoId);

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Link
        className="hover:text-zinc-300 size-fit flex items-center gap-1"
        to="/"
      >
        <IoArrowBackOutline /> Back to home
      </Link>
      <TodoForm
        initData={todo}
        onSubmit={(newTodo) => updateTodo(newTodo, todo?.id)}
        onDelete={deleteTodo}
      />
    </div>
  );
};
