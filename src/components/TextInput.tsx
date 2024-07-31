import type { FieldError, UseFormRegister } from "react-hook-form";
import type { TodoSchemaType } from "../schemas/TodoSchema";

interface ITextInputProps {
  label: string;
  name: keyof TodoSchemaType;
  required?: boolean;
  defaultValue: string;
  errors?: FieldError;
  register: UseFormRegister<TodoSchemaType>;
}

export const TextInput = ({
  label,
  name,
  required,
  defaultValue,
  errors,
  register,
}: ITextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className={`${errors && "text-red-600"}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        className={`w-full border border-zinc-400 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md ${errors && "!bg-red-300/10 !text-red-600 !border-red-600"}`}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {errors?.message && (
        <p className="text-red-500 text-sm">{errors?.message}</p>
      )}
    </div>
  );
};
