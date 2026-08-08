import {
  Ban,

  ShieldCheck,
  UserCheck,
} from "lucide-react";

import type { AdminUser } from "../types";

import StatusBadge from "./StatusBadge";

interface Props {
  users: AdminUser[];
  loading: boolean;
  currentUserId?: string;

  onBanToggle: (
    id: string
  ) => Promise<void>;
}

export default function UserTable({
  users,
  loading,
  currentUserId,
  onBanToggle,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        </div>
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
                User
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Trust Score
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Verification
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const isCurrentUser =
                user._id === currentUserId;

              return (
                <tr
                  key={user._id}
                  className="transition hover:bg-slate-50"
                >
                  {/* User */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                          {user.username
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {user.username}
                        </p>

                        <p className="truncate text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={user.role}
                    />
                  </td>

                  {/* Trust */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-900"
                          style={{
                            width: `${Math.min(
                              Math.max(
                                user.trustScore,
                                0
                              ),
                              100
                            )}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {user.trustScore}
                      </span>
                    </div>
                  </td>

                  {/* Verification */}

                  <td className="px-6 py-4">
                    {user.isVerified ? (
                      <StatusBadge status="verified" />
                    ) : (
                      <StatusBadge status="unverified" />
                    )}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">
                    {user.isBanned ? (
                      <StatusBadge status="banned" />
                    ) : (
                      <StatusBadge status="active" />
                    )}
                  </td>

                  {/* Action */}

                  <td className="px-6 py-4 text-right">
                    {isCurrentUser ? (
                      <span className="text-xs text-slate-400">
                        Current account
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          onBanToggle(
                            user._id
                          )
                        }
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                          user.isBanned
                            ? "text-emerald-700 hover:bg-emerald-50"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        {user.isBanned ? (
                          <>
                            <UserCheck
                              size={16}
                            />

                            Unban
                          </>
                        ) : (
                          <>
                            <Ban size={16} />

                            Ban
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <ShieldCheck className="mb-3 h-8 w-8 text-slate-300" />

          <p className="font-medium text-slate-600">
            No users found
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Try changing your filters.
          </p>
        </div>
      )}
    </div>
  );
}