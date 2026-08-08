import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  subtitle?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color,
  subtitle,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}