"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  useLocale,
} from "next-intl";

import {
  usePathname,
} from "next/navigation";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

type NavigationItem = {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
};

function isNavigationItemActive(
  pathname: string,
  item: NavigationItem,
) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href ||
        pathname.startsWith(
          `${item.href}/`,
        );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const currentLocale = useLocale();

  const locale: AdminLocale =
    currentLocale === "en"
      ? "en"
      : "ru";

  const text =
    adminMessages[locale].sidebar;

  const [open, setOpen] =
    useState(false);

  const navigation =
    useMemo<NavigationItem[]>(
      () => [
        {
          href: `/${locale}/admin`,
          label: text.dashboard,
          icon: "⌂",
          exact: true,
        },
        {
          href: `/${locale}/admin/orders`,
          label: text.orders,
          icon: "▤",
        },
        {
          href: `/${locale}/admin/cakes`,
          label: text.cakes,
          icon: "◉",
        },
        {
          href: `/${locale}/admin/constructor`,
          label: text.constructor,
          icon: "✦",
        },
        {
          href: `/${locale}/admin/categories`,
          label: text.categories,
          icon: "▦",
        },
        {
          href: `/${locale}/admin/fillings`,
          label: text.fillings,
          icon: "◎",
        },
        {
          href: `/${locale}/admin/settings`,
          label: text.settings,
          icon: "⚙",
        },
      ],
      [
        locale,
        text.categories,
        text.constructor,
        text.dashboard,
        text.fillings,
        text.orders,
        text.cakes,
        text.settings,
      ],
    );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow =
      open ? "hidden" : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [open]);

  const otherLocale =
    locale === "ru"
      ? "en"
      : "ru";

  const localizedPathname =
    pathname.replace(
      /^\/(ru|en)/,
      `/${otherLocale}`,
    );

  return (
    <>
      <div className="admin-mobile-bar">
        <button
          type="button"
          className="admin-mobile-menu-button"
          onClick={() => setOpen(true)}
          aria-label={text.openMenu}
        >
          <span>☰</span>
          <strong>{text.menu}</strong>
        </button>

        <Link
          href={`/${locale}/admin`}
          className="admin-mobile-brand"
        >
          <span>STK</span>
          <strong>STK Bakery</strong>
        </Link>
      </div>

      {open && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label={text.closeMenu}
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      <aside
        className={`admin-sidebar ${
          open
            ? "admin-sidebar-open"
            : ""
        }`}
      >
        <div className="admin-sidebar-brand">
          <Link
            href={`/${locale}/admin`}
            className="admin-sidebar-logo"
          >
            STK
          </Link>

          <div>
            <strong>STK Bakery</strong>
            <span>{text.panel}</span>
          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() =>
              setOpen(false)
            }
            aria-label={text.closeMenu}
          >
            ×
          </button>
        </div>

        <nav
          className="admin-navigation"
          aria-label={
            text.navigationLabel
          }
        >
          {navigation.map((item) => {
            const active =
              isNavigationItemActive(
                pathname,
                item,
              );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-navigation-link ${
                  active
                    ? "admin-navigation-link-active"
                    : ""
                }`}
              >
                <span className="admin-navigation-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="mb-3 flex gap-2">
            <Link
              href={localizedPathname}
              className="admin-store-link"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          <Link
            href={`/${locale}`}
            className="admin-store-link"
          >
            <span>←</span>
            {text.returnToSite}
          </Link>

          <p>{text.crm}</p>
        </div>
      </aside>
    </>
  );
}