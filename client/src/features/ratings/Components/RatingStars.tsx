import { Star } from "lucide-react";

interface Props {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: number;
}

export default function RatingStars({
  value,
  onChange,
  readonly = false,
  size = 24,
}: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;

        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => {
              if (!readonly && onChange) {
                onChange(star);
              }
            }}
            className={`transition ${
              readonly
                ? "cursor-default"
                : "cursor-pointer hover:scale-110"
            }`}
            aria-label={`Rate ${star} out of 5`}
          >
            <Star
              size={size}
              className={
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              }
            />
          </button>
        );
      })}
    </div>
  );
}