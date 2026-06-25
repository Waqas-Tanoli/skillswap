import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
};

export default function AuthInput<T extends FieldValues>({
  label,
  type = "text",
  register,
  name,
  error,
}: Props<T>) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        {...register(name)}
        className="w-full p-2 border rounded"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}