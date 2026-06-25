import type {
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import type { ReactNode } from "react";

type AuthInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
};

export default function AuthInput<
  T extends FieldValues
>({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  icon,
}: AuthInputProps<T>) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`
            w-full h-12 rounded-xl
            border bg-white
            px-4
            ${icon ? "pl-11" : ""}
            text-slate-900
            placeholder:text-slate-400
            transition-all duration-200
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
            focus:border-blue-500
            ${
              error
                ? "border-red-400"
                : "border-slate-200"
            }
          `}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}