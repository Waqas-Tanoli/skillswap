import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { logoutUser } from "../features/auth/api";

import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";

import {
  LayoutDashboard,
  User,
  Users,
  RefreshCw,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

import { toast } from "react-toastify";

type NavLinkClassNameProps = {
  isActive: boolean;
};

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Matches",
    path: "/matches",
    icon: Users,
  },
  {
    name: "Swaps",
    path: "/swaps",
    icon: RefreshCw,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: MessageCircle,
  },
];

const bottomLinks = [
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    name: "Help",
    path: "/help",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const navigate = useNavigate();

  const user =
    useAuthStore(
      (state) => state.user
    );

  const logoutLocal =
    useAuthStore(
      (state) => state.logout
    );

  const unreadCount =
    useNotificationStore(
      (state) =>
        state.unreadCount
    );

  const fetchNotifications =
    useNotificationStore(
      (state) =>
        state.fetchNotifications
    );

  const clearNotifications =
    useNotificationStore(
      (state) =>
        state.clearNotifications
    );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleLogout =
    async () => {
      try {
        await logoutUser();

        clearNotifications();

        await logoutLocal();

        toast.success(
          "Logged out successfully"
        );

        navigate("/login");
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to logout"
        );
      }
    };

  const getNavLinkClass = ({
    isActive,
  }: NavLinkClassNameProps) =>
    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    } ${isCollapsed ? "justify-center" : ""}`;

  const getIconClass = ({
    isActive,
  }: NavLinkClassNameProps) =>
    `h-5 w-5 shrink-0 ${
      isActive
        ? "text-white"
        : "text-slate-400"
    }`;
      return (
    <aside
      className={`relative flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Collapse Button */}
      <button
        onClick={() =>
          setIsCollapsed(!isCollapsed)
        }
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition hover:bg-slate-50"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3 text-slate-600" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-slate-600" />
        )}
      </button>

      {/* User */}
      <div
        className={`border-b border-slate-100 py-5 transition-all ${
          isCollapsed ? "px-4" : "px-6"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 font-semibold text-white">
            {user?.username?.[0]?.toUpperCase() ??
              "U"}
          </div>

          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-slate-900">
                {user?.username}
              </h2>

              <p className="truncate text-xs text-slate-500">
                {user?.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={getNavLinkClass}
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <link.icon
                      className={getIconClass({
                        isActive,
                      })}
                    />

                    {link.path ===
                      "/notifications" &&
                      unreadCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                          {unreadCount > 99
                            ? "99+"
                            : unreadCount}
                        </span>
                      )}
                  </div>

                  {!isCollapsed && (
                    <span
                      className={`text-sm font-medium ${
                        link.path ===
                          "/notifications" &&
                        unreadCount > 0
                          ? "text-blue-600"
                          : ""
                      }`}
                    >
                      {link.name}
                    </span>
                  )}

                  {isCollapsed && (
                    <div className="absolute left-full ml-3 hidden group-hover:block">
                      <div className="rounded-lg bg-slate-900 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                        {link.name}
                      </div>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="mt-8 border-t border-slate-100 pt-5">
          <div className="space-y-1">
            {bottomLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={getNavLinkClass}
              >
                {({ isActive }) => (
                  <>
                    <link.icon
                      className={getIconClass({
                        isActive,
                      })}
                    />

                    {!isCollapsed && (
                      <span className="text-sm font-medium">
                        {link.name}
                      </span>
                    )}

                    {isCollapsed && (
                      <div className="absolute left-full ml-3 hidden group-hover:block">
                        <div className="rounded-lg bg-slate-900 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                          {link.name}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-100 p-3">
        <button
          onClick={handleLogout}
          className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-red-600 transition hover:bg-red-50 hover:text-red-700 ${
            isCollapsed
              ? "justify-center"
              : ""
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0" />

          {!isCollapsed && (
            <span className="text-sm font-medium">
              Logout
            </span>
          )}

          {isCollapsed && (
            <div className="absolute left-full ml-3 hidden group-hover:block">
              <div className="rounded-lg bg-slate-900 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                Logout
              </div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}