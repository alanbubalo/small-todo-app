import type { ChangeHandler, FieldError } from "react-hook-form";
import { forwardRef } from "react";

interface ISelectProps {
  disabled: boolean;
  label: string;
  name: string;
  defaultValue: string;
  errors?: FieldError;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  (
    { disabled, label, name, defaultValue, errors, onChange, onBlur, children },
    ref
  ) => {
    return (
      <div
        className={`flex flex-col gap-1 ${disabled && "pointer-events-none opacity-65"}`}
      >
        <label>
          {label} <span className="text-red-500">*</span>
        </label>
        <select
          ref={ref}
          name={name}
          className="w-full border border-zinc-500 bg-zinc-200/10 text-zinc-50 focus:outline-none px-4 py-2 rounded-md h-10"
          defaultValue={defaultValue}
          tabIndex={!disabled ? 0 : -1}
          onChange={onChange}
          onBlur={onBlur}
        >
          {children}
        </select>
        {errors?.message && (
          <p className="text-red-500 text-sm">{errors?.message}</p>
        )}
      </div>
    );
  }
);
