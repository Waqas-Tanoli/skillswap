interface Props {
  value:
    | "beginner"
    | "intermediate"
    | "advanced";

  onChange: (
    value:
      | "beginner"
      | "intermediate"
      | "advanced"
  ) => void;
}

export default function LevelSelect({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value as
            | "beginner"
            | "intermediate"
            | "advanced"
        )
      }
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500"
    >
      <option value="beginner">
        Beginner
      </option>

      <option value="intermediate">
        Intermediate
      </option>

      <option value="advanced">
        Advanced
      </option>
    </select>
  );
}