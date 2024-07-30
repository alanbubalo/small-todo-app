import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import type { Todo } from "../types/todo";

export const TodoCard = ({ todo }: { todo: Todo }) => {
  dayjs.extend(localizedFormat);

  const stateClasses = {
    pending: "bg-zinc-400 text-zinc-950",
    in_progress: "bg-blue-400 text-blue-950",
    done: "bg-green-400 text-green-950",
  };

  return (
    <div className="w-full rounded-sm p-3 flex flex-row justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-3 items-center">
            <p>{todo.description}</p>
            <span
              className={`${stateClasses[todo.state]} px-3 text-sm rounded-full size-fit`}
            >
              {todo.state.replace("_", " ")}
            </span>
          </div>
          <p className="text-zinc-400 text-sm">
            {dayjs(todo.created_at).format("llll")}
          </p>
        </div>
      </div>
      <Link
        className="hover:text-zinc-300 size-fit flex items-center gap-1"
        to={`/${todo.id}`}
      >
        <MdEdit /> Edit
      </Link>
    </div>
  );
};
