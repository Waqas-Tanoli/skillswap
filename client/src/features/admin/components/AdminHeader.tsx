import { ShieldCheck } from "lucide-react";

import { useAuthStore } from "../../../store/authStore";

export default function AdminHeader() {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <header className="border-b border-slate-200 bg-white px-8 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {user?.username}
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2">
          <ShieldCheck
            size={18}
            className="text-emerald-600"
          />

          <span className="text-sm font-semibold text-emerald-700">
            Administrator
          </span>
        </div>
      </div>
    </header>
  );
}