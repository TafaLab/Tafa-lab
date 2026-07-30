"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
};

const navigation: NavigationItem[] = [
  { href: "/admin", label: "Главная", icon: "⌂", exact: true },
  { href: "/admin/orders", label: "Заказы", icon: "▤" },
  { href: "/admin/cakes", label: "Торты", icon: "◉" },
  { href: "/admin/constructor", label: "Конструктор", icon: "✦" },
  { href: "/admin/categories", label: "Категории", icon: "▦" },
  { href: "/admin/fillings", label: "Начинки", icon: "◎" },
  { href: "/admin/settings", label: "Настройки", icon: "⚙" },
];

function isNavigationItemActive(pathname: string, item: NavigationItem) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="admin-mobile-bar">
        <button
          type="button"
          className="admin-mobile-menu-button"
          onClick={() => setOpen(true)}
          aria-label="Открыть меню"
        >
          <span>☰</span>
          <strong>Меню</strong>
        </button>

        <Link href="/admin" className="admin-mobile-brand">
          <span>MC</span>
          <strong>Milky Cake</strong>
        </Link>
      </div>

      {open && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label="Закрыть меню"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${open ? "admin-sidebar-open" : ""}`}>
        <div className="admin-sidebar-brand">
          <Link href="/admin" className="admin-sidebar-logo">MC</Link>
          <div>
            <strong>Milky Cake</strong>
            <span>Панель управления</span>
          </div>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>

        <nav className="admin-navigation" aria-label="Админ-панель">
          {navigation.map((item) => {
            const active = isNavigationItemActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-navigation-link ${
                  active ? "admin-navigation-link-active" : ""
                }`}
              >
                <span className="admin-navigation-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-store-link">
            <span>←</span>
            Вернуться на сайт
          </Link>
          <p>Milky Cake CRM</p>
        </div>
      </aside>
    </>
  );
}
