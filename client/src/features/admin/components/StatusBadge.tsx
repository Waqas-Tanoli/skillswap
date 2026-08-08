interface Props {
  status:
    | "active"
    | "banned"
    | "verified"
    | "unverified"
    | "admin"
    | "user";
}

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    active:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    banned:
      "bg-red-50 text-red-700 border-red-200",

    verified:
      "bg-blue-50 text-blue-700 border-blue-200",

    unverified:
      "bg-slate-50 text-slate-600 border-slate-200",

    admin:
      "bg-violet-50 text-violet-700 border-violet-200",

    user:
      "bg-slate-50 text-slate-600 border-slate-200",
  };

  const labels = {
    active: "Active",
    banned: "Banned",
    verified: "Verified",
    unverified: "Unverified",
    admin: "Admin",
    user: "User",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}