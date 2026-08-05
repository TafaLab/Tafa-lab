"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

export default function AdminHeader() {
  const currentLocale = useLocale();

  const locale: AdminLocale =
    currentLocale === "en"
      ? "en"
      : "ru";

  const text =
    adminMessages[locale].header;

  return (
    <header className="admin-header">
      <div>
        <span className="admin-header-caption">
          {text.caption}
        </span>

        <strong>{text.title}</strong>
      </div>

      <div className="admin-header-actions">
        <Link
          href={`/${locale}/cakes`}
          className="admin-header-secondary-button"
        >
          {text.catalog}
        </Link>

        <Link
          href={`/${locale}/admin/cakes/new`}
          className="admin-header-primary-button"
        >
          {text.addCake}
        </Link>
      </div>
    </header>
  );
}