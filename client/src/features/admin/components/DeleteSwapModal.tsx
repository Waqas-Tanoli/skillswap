import type { AdminSwap } from "../types";

interface Props {
  swap: AdminSwap | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteSwapModal({
  swap,
  loading,
  onClose,
  onConfirm,
}: Props) {
  if (!swap) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-900">
          Delete Swap Request
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Are you sure you want to delete the swap
          request between{" "}
          <strong>
            {swap.sender.username}
          </strong>{" "}
          and{" "}
          <strong>
            {swap.receiver.username}
          </strong>
          ?
        </p>

        <p className="mt-2 text-xs text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete Swap"}
          </button>
        </div>
      </div>
    </div>
  );
}