import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  ClipboardList,
} from "lucide-react";

import { toast } from "react-toastify";

import AdminLayout from "../../../layouts/AdminLayout";

import { useAdminStore } from "../../../store/adminStore";

import SkillRequestTable from "../components/SkillRequestTable";

import RejectSkillModal from "../components/RejectSkillModal";

export default function SkillRequestsPage() {
  const {
    skillRequests,
    skillRequestsLoading,
    fetchSkillRequests,
    approveSkillRequest,
    rejectSkillRequest,
  } = useAdminStore();

  const [search, setSearch] =
    useState("");

  const [rejectingId, setRejectingId] =
    useState<string | null>(null);

  const [rejectLoading, setRejectLoading] =
    useState(false);

  useEffect(() => {
    fetchSkillRequests();
  }, [fetchSkillRequests]);

  const filteredRequests =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return skillRequests;
      }

      return skillRequests.filter(
        (request) => {
          const requester =
            typeof request.requestedBy ===
            "string"
              ? ""
              : request.requestedBy
                  .username;

          return (
            request.name
              .toLowerCase()
              .includes(query) ||
            request.category
              .toLowerCase()
              .includes(query) ||
            requester
              .toLowerCase()
              .includes(query)
          );
        }
      );
    }, [skillRequests, search]);

  const rejectingRequest =
    skillRequests.find(
      (request) =>
        request._id === rejectingId
    );

  const handleApprove = async (
    id: string
  ) => {
    const request =
      skillRequests.find(
        (item) => item._id === id
      );

    try {
      await approveSkillRequest(id);

      toast.success(
        request
          ? `"${request.name}" approved successfully`
          : "Skill request approved"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to approve skill request"
      );
    }
  };

  const handleReject = async (
    reason: string
  ) => {
    if (!rejectingId) return;

    try {
      setRejectLoading(true);

      const request =
        skillRequests.find(
          (item) =>
            item._id === rejectingId
        );

      await rejectSkillRequest(
        rejectingId,
        reason
      );

      toast.success(
        request
          ? `"${request.name}" rejected`
          : "Skill request rejected"
      );

      setRejectingId(null);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to reject skill request"
      );
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-100 p-3">
                <ClipboardList className="h-6 w-6 text-violet-600" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Skill Requests
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Review and manage new
                  skill submissions.
                </p>
              </div>
            </div>
          </div>

          {/* Pending count */}

          <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Pending Requests
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {skillRequests.length}
            </p>
          </div>
        </div>

        {/* Search */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search skill requests..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>
        </div>

        {/* Results */}

        <div className="text-sm text-slate-500">
          Showing{" "}
          <strong className="text-slate-900">
            {filteredRequests.length}
          </strong>{" "}
          pending request
          {filteredRequests.length === 1
            ? ""
            : "s"}
        </div>

        <SkillRequestTable
          requests={filteredRequests}
          loading={
            skillRequestsLoading
          }
          onApprove={handleApprove}
          onReject={setRejectingId}
        />
      </div>

      {/* Reject Modal */}

      <RejectSkillModal
        open={Boolean(rejectingId)}
        skillName={
          rejectingRequest?.name
        }
        loading={rejectLoading}
        onClose={() =>
          setRejectingId(null)
        }
        onConfirm={handleReject}
      />
    </AdminLayout>
  );
}