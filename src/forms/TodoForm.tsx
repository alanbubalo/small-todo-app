import { useNavigate } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import type { Todo } from "../types/todo";
import { TodoSchema, type TodoSchemaType } from "../schemas/TodoSchema";

interface ITodoFormProps {
  initData?: Todo;
  onSubmit: (data: Todo) => void;
  onDelete?: (id: string) => void;
}

export const TodoForm = ({ initData, onSubmit, onDelete }: ITodoFormProps) => {
  const navigate = useNavigate();

  const isEdit = !!onDelete;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoSchemaType>({
    resolver: zodResolver(TodoSchema),
  });

  const onFormSubmit: SubmitHandler<TodoSchemaType> = (data) => {
    const todo = {
      ...(initData ?? {}),
      ...data,
    } as Todo;

    onSubmit(todo);
    navigate("/");
  };

  const handleDelete = () => {
    onDelete?.(initData?.id ?? "");
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col h-full gap-5"
    >
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label>
            Description <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            className="w-full bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md"
            defaultValue={initData?.description ?? ""}
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-rose-500 text-sm">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div
          className={`flex flex-col gap-1 flex-1 ${!isEdit && "pointer-events-none opacity-65"}`}
        >
          <label>
            State <span className="text-rose-500">*</span>
          </label>
          <select
            className="w-full bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md h-10"
            defaultValue={initData?.state ?? "pending"}
            {...register("state")}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
          {errors.state?.message && (
            <p className="text-rose-500 text-sm">{errors.state?.message}</p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
        {isEdit && (
          <Button
            className="bg-rose-500 hover:bg-rose-600 w-fit disabled:hover:bg-rose-400/75 disabled:bg-rose-400/75 flex items-center gap-1"
            onClick={handleDelete}
            disabled={initData?.state !== "done"}
          >
            <FaTrashAlt /> Delete
          </Button>
        )}
      </div>
    </form>
  );
};
