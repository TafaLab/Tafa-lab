import Link from "next/link";

import { supabase } from "@/lib/supabase";

const quickActions = [
  {
    href: "/admin/cakes/new",
    title: "Добавить новый торт",
    description: "Название, фотография, категории, веса и цены.",
    icon: "+",
  },
  {
    href: "/admin/cakes",
    title: "Управление тортами",
    description: "Редактирование, публикация и скрытие товаров.",
    icon: "◉",
  },
  {
    href: "/admin/orders",
    title: "Открыть заказы",
    description: "Просмотр новых заказов и изменение их статусов.",
    icon: "▤",
  },
  {
    href: "/admin/constructor",
    title: "Элементы конструктора",
    description: "Основы, декор, ягоды, цветы и другие PNG-слои.",
    icon: "✦",
  },
];

const statusLabels: Record<string, string> = {
  new: "Новый",
  confirmed: "Подтвержден",
  in_progress: "В работе",
  ready: "Готов",
  completed: "Выдан",
  cancelled: "Отменен",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getTodayRange() {
  const now = new Date();

  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  );

  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0,
  );

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

export default async function AdminDashboardPage() {
  const { start, end } = getTodayRange();

  const [
    ordersTodayResult,
    ordersInProgressResult,
    cakesResult,
    recentOrdersResult,
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("id, status, price, created_at")
      .gte("created_at", start)
      .lt("created_at", end),

    supabase
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "in_progress"),

    supabase
      .from("cakes")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("orders")
      .select(
        `
          id,
          order_number,
          customer_name,
          customer_phone,
          status,
          price,
          created_at
        `,
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(5),
  ]);

  const ordersToday = ordersTodayResult.data ?? [];
  const recentOrders = recentOrdersResult.data ?? [];

  const ordersTodayCount = ordersToday.length;
  const ordersInProgressCount =
    ordersInProgressResult.count ?? 0;
  const cakesCount = cakesResult.count ?? 0;

  const revenueToday = ordersToday
    .filter((order) =>
      ["ready", "completed"].includes(order.status),
    )
    .reduce((total, order) => {
      const price = Number(order.price ?? 0);

      return total + (Number.isFinite(price) ? price : 0);
    }, 0);

  const summaryCards = [
    {
      label: "Заказы сегодня",
      value: String(ordersTodayCount),
      description: "Новые заказы за текущий день",
      icon: "▤",
    },
    {
      label: "В работе",
      value: String(ordersInProgressCount),
      description: "Заказы, которые сейчас готовятся",
      icon: "◷",
    },
    {
      label: "Опубликовано тортов",
      value: String(cakesCount),
      description: "Торты, доступные клиентам",
      icon: "◉",
    },
    {
      label: "Выручка сегодня",
      value: `${formatMoney(revenueToday)} ₸`,
      description: "Готовые и завершённые заказы",
      icon: "↗",
    },
  ];

  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">
            Обзор бизнеса
          </span>

          <h1>Добро пожаловать в Milky Cake</h1>

          <p>
            Здесь собраны торты, заказы и все элементы
            конструктора.
          </p>
        </div>

        <Link
          href="/admin/cakes/new"
          className="admin-main-action"
        >
          <span>+</span>
          Добавить торт
        </Link>
      </section>

      <section className="admin-summary-grid">
        {summaryCards.map((card) => (
          <article
            className="admin-summary-card"
            key={card.label}
          >
            <div className="admin-summary-card-top">
              <span className="admin-summary-icon">
                {card.icon}
              </span>

              <span className="admin-summary-status">
                Сегодня
              </span>
            </div>

            <strong>{card.value}</strong>
            <h2>{card.label}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-eyebrow">
              Последние заявки
            </span>

            <h2>Последние заказы</h2>
          </div>

          <Link href="/admin/orders">
            Все заказы →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="rounded-3xl border border-black/5 bg-white p-8">
            Заказов пока нет.
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-black/5 bg-[#faf7f5] text-left">
                    <th className="px-6 py-4 text-sm font-semibold">
                      Заказ
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Клиент
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Дата
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Статус
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      Сумма
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-black/5 last:border-b-0 hover:bg-[#faf7f5]"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/orders?order=${order.id}`}
                          className="font-semibold"
                        >
                          №
                          {order.order_number ??
                            order.id
                              .slice(0, 8)
                              .toUpperCase()}
                        </Link>
                      </td>

                      <td className="px-6 py-4">
                        <strong className="block">
                          {order.customer_name ||
                            "Без имени"}
                        </strong>

                        <span className="mt-1 block text-sm text-black/45">
                          {order.customer_phone ||
                            "Телефон не указан"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-black/60">
                        {formatOrderDate(order.created_at)}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#f3e9e3] px-3 py-1 text-sm font-semibold">
                          {statusLabels[order.status] ??
                            order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right font-semibold">
                        {formatMoney(
                          Number(order.price ?? 0),
                        )}{" "}
                        ₸
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-eyebrow">
              Быстрый доступ
            </span>

            <h2>Что будем делать</h2>
          </div>
        </div>

        <div className="admin-action-grid">
          {quickActions.map((action) => (
            <Link
              href={action.href}
              className="admin-action-card"
              key={action.href}
            >
              <span className="admin-action-icon">
                {action.icon}
              </span>

              <div>
                <strong>{action.title}</strong>
                <p>{action.description}</p>
              </div>

              <span className="admin-action-arrow">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="admin-section admin-launch-section">
        <div>
          <span className="admin-eyebrow">
            Текущий этап
          </span>

          <h2>Подготовка к показу</h2>

          <p>
            Основной функционал каталога, конструктора и
            обработки заказов уже работает.
          </p>
        </div>

        <div className="admin-progress">
          <div className="admin-progress-heading">
            <strong>Готовность CRM</strong>
            <span>90%</span>
          </div>

          <div className="admin-progress-track">
            <span />
          </div>

          <small>
            Осталось проверить основные сценарии и мобильную
            версию.
          </small>
        </div>
      </section>
    </div>
  );
}