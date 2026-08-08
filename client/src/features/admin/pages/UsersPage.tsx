import { useEffect, useMemo, useState } from "react";
import { Users, UserX } from "lucide-react";
import { toast } from "react-toastify";

import AdminLayout from "../../../layouts/AdminLayout";

import { useAdminStore } from "../../../store/adminStore";
import { useAuthStore } from "../../../store/authStore";

import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";

export default function UsersPage() {
  const {
    users,
    loading,
    fetchUsers,
    banOrUnbanUser,
  } = useAdminStore();

  const currentUser = useAuthStore(
    (state) => state.user
  );

  const [search, setSearch] =
    useState("");

  const [role, setRole] = useState<
    "all" | "user" | "admin"
  >("all");

  const [status, setStatus] = useState<
    "all" | "active" | "banned"
  >("all");

  const [verification, setVerification] =
    useState<
      "all" | "verified" | "unverified"
    >("all");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        user.username
          .toLowerCase()
          .includes(normalizedSearch) ||
        user.email
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesRole =
        role === "all" ||
        user.role === role;

      const matchesStatus =
        status === "all" ||
        (status === "banned" &&
          user.isBanned) ||
        (status === "active" &&
          !user.isBanned);

      const matchesVerification =
        verification === "all" ||
        (verification === "verified" &&
          user.isVerified) ||
        (verification ===
          "unverified" &&
          !user.isVerified);

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesVerification
      );
    });
  }, [
    users,
    search,
    role,
    status,
    verification,
  ]);

  const handleBanToggle = async (
    id: string
  ) => {
    const user = users.find(
      (item) => item._id === id
    );

    if (!user) return;

    try {
      await banOrUnbanUser(id);

      toast.success(
        user.isBanned
          ? "User unbanned successfully"
          : "User banned successfully"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update user status"
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setRole("all");
    setStatus("all");
    setVerification("all");
  };

  const bannedCount = users.filter(
    (user) => user.isBanned
  ).length;

  const verifiedCount = users.filter(
    (user) => user.isVerified
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Users
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage SkillSwap users and
              account status.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <Users
                size={18}
                className="text-blue-600"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Total Users
                </p>

                <p className="font-semibold text-slate-900">
                  {users.length}
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex">
              <UserX
                size={18}
                className="text-red-500"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Banned
                </p>

                <p className="font-semibold text-slate-900">
                  {bannedCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}

        <UserFilters
          search={search}
          role={role}
          status={status}
          verification={verification}
          onSearchChange={setSearch}
          onRoleChange={setRole}
          onStatusChange={setStatus}
          onVerificationChange={
            setVerification
          }
          onClear={clearFilters}
        />

        {/* Summary */}

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>
            Showing{" "}
            <strong className="text-slate-900">
              {filteredUsers.length}
            </strong>{" "}
            of{" "}
            <strong className="text-slate-900">
              {users.length}
            </strong>{" "}
            users
          </span>

          <span className="hidden text-slate-300 sm:inline">
            •
          </span>

          <span>
            {verifiedCount} verified
          </span>
        </div>

        {/* Table */}

        <UserTable
          users={filteredUsers}
          loading={loading}
          currentUserId={currentUser?.id}
          onBanToggle={handleBanToggle}
        />
      </div>
    </AdminLayout>
  );
}