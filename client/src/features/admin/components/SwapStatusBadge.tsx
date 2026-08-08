import type { SwapStatus } from "../types";

interface Props {
  status: SwapStatus;
}

export default function SwapStatusBadge({
  status,
}: Props) {
  const config = {
    pending: {
      label: "Pending",
      className:
        "bg-amber-100 text-amber-700",
    },

    accepted: {
      label: "Accepted",
      className:
        "bg-blue-100 text-blue-700",
    },

    rejected: {
      label: "Rejected",
      className:
        "bg-red-100 text-red-700",
    },

    completed: {
      label: "Completed",
      className:
        "bg-emerald-100 text-emerald-700",
    },
  };

  const current = config[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${current.className}`}
    >
      {current.label}
    </span>
  );
}