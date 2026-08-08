import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";

import { useState } from "react";

const links = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Skill Requests",
    path: "/admin/skill-requests",
    icon: ClipboardList,
  },
  {
    name: "Skills",
    path: "/admin/skills",
    icon: GraduationCap,
  },
  {
    name: "Swaps",
    path: "/admin/swaps",
    icon: RefreshCw,
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Collapse */}

      <button
        onClick={() =>
          setCollapsed(!collapsed)
        }
        className="absolute -right-3 top-20 z-20 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow"
      >
        {collapsed ? (
          <ChevronRight size={14} />
        ) : (
          <ChevronLeft size={14} />
        )}
      </button>

      {/* Logo */}

      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900">
          {collapsed
            ? "SS"
            : "SkillSwap Admin"}
        </h2>
      </div>

      {/* Links */}

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <link.icon size={20} />

            {!collapsed && (
              <span>{link.name}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}

      <div className="border-t border-slate-200 p-4">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100"
        >
          <Settings size={20} />

          {!collapsed && (
            <span>Settings</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
}