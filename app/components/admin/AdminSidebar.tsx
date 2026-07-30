"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
};

const navigation: NavigationItem[] = [
  {
    href: "/admin",
    label: "Главная",
    icon: "⌂",
    exact: true,
  },
  {
    href: "/admin/orders",
    label: "Заказы",
    icon: "▤",
  },
  {
    href: "/admin/cakes",
    label: "Торты",
    icon: "◉",
  },
  {
    href: "/admin/constructor",
    label: "Конструктор",
    icon: "✦",
  },
  {
    href: "/admin/categories",
    label: "Категории",
    icon: "▦",
  },
  {
    href: "/admin/fillings",
    label: "Начинки",
    icon: "◎",
  },
  {
    href: "/admin/settings",
    label: "Настройки",
    icon: "⚙",
  },
];

function isNavigationItemActive(
  pathname: string,
  item: NavigationItem,
): boolean {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <Link href="/admin" className="admin-sidebar-logo">
          MC
        </Link>

        <div>
          <strong>Milky Cake</strong>
          <span>Панель управления</span>
        </div>
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
  );
}
