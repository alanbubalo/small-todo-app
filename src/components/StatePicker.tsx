import type { FieldError, UseFormRegister } from "react-hook-form";
import type { TTodoState } from "../enums/todoState";
import type { TodoSchemaType } from "../schemas/TodoSchema";

interface IStatePickerProps {
  isEdit: boolean;
  defaultValue: TTodoState;
  errors?: FieldError;
  register: UseFormRegister<TodoSchemaType>;
}

export const StatePicker = ({
  isEdit,
  defaultValue,
  errors,
  register,
}: IStatePickerProps) => {
  return (
    <div
      className={`flex flex-col gap-1 ${!isEdit && "pointer-events-none opacity-65"}`}
    >
      <label>
        State <span className="text-red-500">*</span>
      </label>
      <select
        className="w-full border border-zinc-300 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md h-10"
        defaultValue={defaultValue}
        {...register("state")}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In progress</option>
        <option value="done">Done</option>
      </select>
      {errors?.message && (
        <p className="text-red-500 text-sm">{errors?.message}</p>
      )}
    </div>
  );
};
