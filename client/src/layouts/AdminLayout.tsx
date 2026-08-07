import type { ReactNode } from "react";
import AdminSidebar from "../features/admin/components/AdminSideBar";
import AdminHeader from "../features/admin/components/AdminHeader";



interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}