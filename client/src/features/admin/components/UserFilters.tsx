import { Search, X } from "lucide-react";

interface Props {
  search: string;
  role: "all" | "user" | "admin";
  status: "all" | "active" | "banned";
  verification:
    | "all"
    | "verified"
    | "unverified";

  onSearchChange: (
    value: string
  ) => void;

  onRoleChange: (
    value: "all" | "user" | "admin"
  ) => void;

  onStatusChange: (
    value: "all" | "active" | "banned"
  ) => void;

  onVerificationChange: (
    value:
      | "all"
      | "verified"
      | "unverified"
  ) => void;

  onClear: () => void;
}

export default function UserFilters({
  search,
  role,
  status,
  verification,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onVerificationChange,
  onClear,
}: Props) {
  const hasFilters =
    search ||
    role !== "all" ||
    status !== "all" ||
    verification !== "all";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-4">
        {/* Search */}

        <div className="relative lg:col-span-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search users..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        {/* Role */}

        <select
          value={role}
          onChange={(e) =>
            onRoleChange(
              e.target.value as
                | "all"
                | "user"
                | "admin"
            )
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400"
        >
          <option value="all">
            All Roles
          </option>

          <option value="user">
            Users
          </option>

          <option value="admin">
            Admins
          </option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value as
                | "all"
                | "active"
                | "banned"
            )
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400"
        >
          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="banned">
            Banned
          </option>
        </select>

        {/* Verification */}

        <select
          value={verification}
          onChange={(e) =>
            onVerificationChange(
              e.target.value as
                | "all"
                | "verified"
                | "unverified"
            )
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-400"
        >
          <option value="all">
            All Verification
          </option>

          <option value="verified">
            Verified
          </option>

          <option value="unverified">
            Unverified
          </option>
        </select>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <X size={15} />

          Clear filters
        </button>
      )}
    </div>
  );
}