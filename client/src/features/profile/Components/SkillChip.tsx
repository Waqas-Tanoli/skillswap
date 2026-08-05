import { X } from "lucide-react";

interface Props {
  label: string;

  level?: string;

  onRemove: () => void;
}

export default function SkillChip({
  label,
  level,
  onRemove,
}: Props) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">

      <span className="font-medium">
        {label}
      </span>

      {level && (
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
          {level}
        </span>
      )}

      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-1 transition hover:bg-red-100 hover:text-red-600"
      >
        <X size={15} />
      </button>
    </div>
  );
}