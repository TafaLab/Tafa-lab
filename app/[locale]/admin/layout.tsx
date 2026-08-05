import type {
  ReactNode,
} from "react";

import {
  hasLocale,
} from "next-intl";

import {
  setRequestLocale,
} from "next-intl/server";

import {
  notFound,
} from "next/navigation";

import AdminHeader from "@/app/components/admin/AdminHeader";
import AdminSidebar from "@/app/components/admin/AdminSidebar";

import {
  routing,
} from "@/i18n/routing";

type AdminLayoutProps = {
  children: ReactNode;

  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = await params;

  if (
    !hasLocale(
      routing.locales,
      locale,
    )
  ) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="admin-shell">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}