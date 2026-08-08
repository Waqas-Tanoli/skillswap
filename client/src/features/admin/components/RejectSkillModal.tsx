import { useState } from "react";
import {
  X,
  AlertTriangle,
} from "lucide-react";

interface Props {
  open: boolean;

  skillName?: string;

  loading: boolean;

  onClose: () => void;

  onConfirm: (
    reason: string
  ) => Promise<void>;
}

export default function RejectSkillModal({
  open,
  skillName,
  loading,
  onClose,
  onConfirm,
}: Props) {
  const [reason, setReason] =
    useState("");

  if (!open) {
    return null;
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const trimmedReason =
      reason.trim();

    if (!trimmedReason) {
      return;
    }

    await onConfirm(
      trimmedReason
    );

    setReason("");
  };

  const handleClose = () => {
    if (loading) return;

    setReason("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-2.5">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Reject Skill Request
              </h2>

              {skillName && (
                <p className="mt-1 text-sm text-slate-500">
                  {skillName}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Rejection reason
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              rows={4}
              placeholder="Explain why this skill request is being rejected..."
              className="w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              disabled={loading}
            />
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !reason.trim()
              }
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Rejecting..."
                : "Reject Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}