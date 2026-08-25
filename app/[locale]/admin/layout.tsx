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
          <div className="mb-5 rounded-2xl border border-[#a67b65]/20 bg-[#fff8f2] px-4 py-3 text-sm leading-6 text-[#6a4433]">
            <strong className="mr-2 uppercase tracking-[0.12em]">
              Demo
            </strong>
            {locale === "en"
              ? "This is a public demo admin panel. Test orders and changes are visible to other visitors."
              : "Это открытая демо-админка. Тестовые заказы и изменения видны другим посетителям."}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
