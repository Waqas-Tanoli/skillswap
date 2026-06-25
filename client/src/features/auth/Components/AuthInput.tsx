import React from "react";
import type { UseFormRegister } from "react-hook-form";
import  type { RegisterForm } from "../types/auth.types";

interface AuthInputProps {
  label: string;
  name: keyof RegisterForm;
  type?: string;
  register: UseFormRegister<RegisterForm>;
  error?: string;
  icon?: React.ReactNode;
  placeholder?: string;
}

export default function AuthInput({
  label,
  name,
  type = "text",
  register,
  error,
  icon,
  placeholder,
}: AuthInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-200
            ${icon ? "pl-10" : ""}
            ${error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
              : "border-slate-200 focus:border-slate-400 focus:ring-slate-200 hover:border-slate-300"
            }
            focus:outline-none focus:ring-4 bg-white
            placeholder:text-slate-400 text-slate-700
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
}