import type { ReactNode } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="admin-shell">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
