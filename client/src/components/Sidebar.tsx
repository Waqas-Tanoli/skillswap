// components/Sidebar.tsx - Cleaner version with proper typing
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/api";
import { useAuthStore } from "../store/authStore";
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
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

// Type for NavLink className function
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logoutLocal = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logoutLocal();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  // Helper function for nav link classes
  const getNavLinkClass = ({ isActive }: NavLinkClassNameProps) =>
    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    } ${isCollapsed ? "justify-center" : ""}`;

  const getIconClass = ({ isActive }: NavLinkClassNameProps) =>
    `h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`;

  return (
    <aside
      className={`relative flex h-screen flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-slate-50 transition-all duration-200"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3 text-slate-600" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-slate-600" />
        )}
      </button>

    

      {/* User Info */}
      <div className={`border-b border-slate-100 px-6 py-5 transition-all duration-300 ${
        isCollapsed ? "px-4" : "px-6"
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-sm font-semibold text-white">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-slate-900">
                {user?.username || "User"}
              </h2>
              <p className="truncate text-xs text-slate-500">
                {user?.email || "user@email.com"}
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
                  <link.icon className={getIconClass({ isActive })} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{link.name}</span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 hidden group-hover:block">
                      <div className="rounded-lg bg-slate-900 px-2 py-1 text-xs font-medium text-white whitespace-nowrap">
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
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="space-y-1">
            {bottomLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={getNavLinkClass}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={getIconClass({ isActive })} />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{link.name}</span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 hidden group-hover:block">
                        <div className="rounded-lg bg-slate-900 px-2 py-1 text-xs font-medium text-white whitespace-nowrap">
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
          className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-2 hidden group-hover:block">
              <div className="rounded-lg bg-slate-900 px-2 py-1 text-xs font-medium text-white whitespace-nowrap">
                Logout
              </div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}