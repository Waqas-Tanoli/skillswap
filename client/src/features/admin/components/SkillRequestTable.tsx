import {
  Check,
  Clock,
  X,
} from "lucide-react";

import type {
  AdminSkillRequest,
} from "../types";

interface Props {
  requests: AdminSkillRequest[];

  loading: boolean;

  onApprove: (
    id: string
  ) => Promise<void>;

  onReject: (
    id: string
  ) => void;
}

export default function SkillRequestTable({
  requests,
  loading,
  onApprove,
  onReject,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10">
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <Clock className="mx-auto h-10 w-10 text-slate-300" />

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          No pending skill requests
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          New skill requests will appear
          here for review.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Skill
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Requested By
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Requested
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => {
              const requester =
                typeof request.requestedBy ===
                "string"
                  ? null
                  : request.requestedBy;

              return (
                <tr
                  key={request._id}
                  className="transition hover:bg-slate-50"
                >
                  {/* Skill */}

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {request.name}
                      </p>

                      {request.description && (
                        <p className="mt-1 max-w-md truncate text-sm text-slate-500">
                          {request.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Category */}

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {request.category}
                    </span>
                  </td>

                  {/* Requester */}

                  <td className="px-6 py-5">
                    {requester ? (
                      <div className="flex items-center gap-3">
                        {requester.avatar ? (
                          <img
                            src={requester.avatar}
                            alt={
                              requester.username
                            }
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                            {requester.username
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {
                              requester.username
                            }
                          </p>

                          {requester.email && (
                            <p className="text-xs text-slate-500">
                              {
                                requester.email
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">
                        Unknown user
                      </span>
                    )}
                  </td>

                  {/* Date */}

                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-500">
                      {new Date(
                        request.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onApprove(
                            request._id
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                      >
                        <Check size={16} />

                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onReject(
                            request._id
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <X size={16} />

                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}