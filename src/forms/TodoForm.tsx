import { useNavigate } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import type { Todo } from "../types/todo";
import { TodoSchema, type TodoSchemaType } from "../schemas/TodoSchema";
import { StatePicker } from "../components/StatePicker";
import { TextInput } from "../components/TextInput";

interface ITodoFormProps {
  initData?: Todo;
  onSubmit: (data: TodoSchemaType) => void;
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
    onSubmit(data);
    navigate("/");
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(initData?.id ?? "");
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col h-full gap-5"
    >
      <div className="grid grid-cols-2 gap-3">
        <TextInput
          label="Description"
          name="description"
          required
          defaultValue={initData?.description ?? ""}
          errors={errors.description}
          register={register}
        />
        <StatePicker
          defaultValue={initData?.state ?? "pending"}
          isEdit={isEdit}
          errors={errors.state}
          register={register}
        />
        <TextInput
          label="Created by"
          name="created_by"
          required
          defaultValue={initData?.created_by ?? ""}
          errors={errors.created_by}
          register={register}
        />
        <TextInput
          label="Assigned to"
          name="assigned_to"
          required
          defaultValue={initData?.assigned_to ?? ""}
          errors={errors.assigned_to}
          register={register}
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
        {isEdit && (
          <Button
            className="bg-red-500 hover:bg-red-600 w-fit disabled:hover:bg-red-400/75 disabled:bg-red-400/75 flex items-center gap-1"
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
