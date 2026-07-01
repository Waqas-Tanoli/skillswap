// layouts/DashboardLayout.tsx
import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Content */}
        <div className="p-6 lg:p-8">
        
          {/* Children */}
          {children}
        </div>
      </main>
    </div>
  );
}