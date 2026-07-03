import type { SwapStatus } from "../types";

type Props = {
  status: SwapStatus;
};

export default function SwapStatusBadge({
  status,
}: Props) {
  const styles = {
    pending:
      "bg-yellow-100 text-yellow-700",

    accepted:
      "bg-green-100 text-green-700",

    rejected:
      "bg-red-100 text-red-700",

    completed:
      "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}