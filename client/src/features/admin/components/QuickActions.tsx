import { Link } from "react-router-dom";

import {
  Users,
  ClipboardList,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

const actions = [
  {
    title: "Manage Users",
    icon: Users,
    to: "/admin/users",
  },
  {
    title: "Skill Requests",
    icon: ClipboardList,
    to: "/admin/skill-requests",
  },
  {
    title: "Manage Skills",
    icon: GraduationCap,
    to: "/admin/skills",
  },
  {
    title: "Manage Swaps",
    icon: RefreshCw,
    to: "/admin/swaps",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition hover:border-slate-900 hover:bg-slate-50"
          >
            <div className="rounded-xl bg-slate-900 p-3 text-white">
              <action.icon size={20} />
            </div>

            <span className="font-medium">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}