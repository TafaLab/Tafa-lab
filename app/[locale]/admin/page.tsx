import Link from "next/link";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

type AdminDashboardPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

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

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { locale: localeParam } =
    await params;

  if (
    localeParam !== "ru" &&
    localeParam !== "en"
  ) {
    notFound();
  }

  const locale =
    localeParam as AdminLocale;

  const text =
    adminMessages[locale];

  const intlLocale =
    locale === "en"
      ? "en-US"
      : "ru-RU";

  function formatMoney(value: number) {
    return new Intl.NumberFormat(
      intlLocale,
      {
        maximumFractionDigits: 0,
      },
    ).format(value);
  }

  function formatOrderDate(
    value: string,
  ) {
    return new Intl.DateTimeFormat(
      intlLocale,
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    ).format(new Date(value));
  }

  const statusLabels: Record<
    string,
    string
  > = {
    new: text.orders.statuses.new,
    confirmed:
      text.orders.statuses.confirmed,
    in_progress:
      text.orders.statuses.in_progress,
    ready: text.orders.statuses.ready,
    completed:
      text.orders.statuses.completed,
    cancelled:
      text.orders.statuses.cancelled,
  };

  const quickActions = [
    {
      href: `/${locale}/admin/cakes/new`,
      title:
        text.dashboard.quickActions
          .addCake.title,
      description:
        text.dashboard.quickActions
          .addCake.description,
      icon: "+",
    },
    {
      href: `/${locale}/admin/cakes`,
      title:
        text.dashboard.quickActions
          .manageCakes.title,
      description:
        text.dashboard.quickActions
          .manageCakes.description,
      icon: "◉",
    },
    {
      href: `/${locale}/admin/orders`,
      title:
        text.dashboard.quickActions
          .openOrders.title,
      description:
        text.dashboard.quickActions
          .openOrders.description,
      icon: "▤",
    },
    {
      href: `/${locale}/admin/constructor`,
      title:
        text.dashboard.quickActions
          .constructor.title,
      description:
        text.dashboard.quickActions
          .constructor.description,
      icon: "✦",
    },
  ];

  const { start, end } =
    getTodayRange();

  const [
    ordersTodayResult,
    ordersInProgressResult,
    cakesResult,
    recentOrdersResult,
  ] = await Promise.all([
    supabase
      .from("orders")
      .select(
        "id, status, price, created_at",
      )
      .gte("created_at", start)
      .lt("created_at", end),

    supabase
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "status",
        "in_progress",
      ),

    supabase
      .from("cakes")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "is_published",
        true,
      ),

    supabase
      .from("orders")
      .select(`
        id,
        order_number,
        customer_name,
        customer_phone,
        status,
        price,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(5),
  ]);

  const ordersToday =
    ordersTodayResult.data ?? [];

  const recentOrders =
    recentOrdersResult.data ?? [];

  const ordersTodayCount =
    ordersToday.length;

  const ordersInProgressCount =
    ordersInProgressResult.count ?? 0;

  const cakesCount =
    cakesResult.count ?? 0;

  const revenueToday =
    ordersToday
      .filter((order) =>
        [
          "ready",
          "completed",
        ].includes(order.status),
      )
      .reduce(
        (total, order) => {
          const price = Number(
            order.price ?? 0,
          );

          return (
            total +
            (Number.isFinite(price)
              ? price
              : 0)
          );
        },
        0,
      );

  const summaryCards = [
    {
      label:
        text.dashboard.summary
          .ordersToday,
      value:
        String(ordersTodayCount),
      description:
        text.dashboard.summary
          .ordersTodayDescription,
      icon: "▤",
    },
    {
      label:
        text.dashboard.summary
          .inProgress,
      value:
        String(
          ordersInProgressCount,
        ),
      description:
        text.dashboard.summary
          .inProgressDescription,
      icon: "◷",
    },
    {
      label:
        text.dashboard.summary
          .publishedCakes,
      value: String(cakesCount),
      description:
        text.dashboard.summary
          .publishedCakesDescription,
      icon: "◉",
    },
    {
      label:
        text.dashboard.summary
          .revenueToday,
      value: `${formatMoney(
        revenueToday,
      )} ${text.common.currency}`,
      description:
        text.dashboard.summary
          .revenueTodayDescription,
      icon: "↗",
    },
  ];

  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">
            {text.dashboard.eyebrow}
          </span>

          <h1>
            {text.dashboard.title}
          </h1>

          <p>
            {text.dashboard.description}
          </p>
        </div>

        <Link
          href={`/${locale}/admin/cakes/new`}
          className="admin-main-action"
        >
          <span>+</span>
          {text.dashboard.addCake}
        </Link>
      </section>

      <section className="admin-summary-grid">
        {summaryCards.map(
          (card) => (
            <article
              className="admin-summary-card"
              key={card.label}
            >
              <div className="admin-summary-card-top">
                <span className="admin-summary-icon">
                  {card.icon}
                </span>

                <span className="admin-summary-status">
                  {text.common.today}
                </span>
              </div>

              <strong>
                {card.value}
              </strong>

              <h2>{card.label}</h2>

              <p>
                {card.description}
              </p>
            </article>
          ),
        )}
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-eyebrow">
              {
                text.dashboard
                  .recentOrders
                  .eyebrow
              }
            </span>

            <h2>
              {
                text.dashboard
                  .recentOrders.title
              }
            </h2>
          </div>

          <Link
            href={`/${locale}/admin/orders`}
          >
            {
              text.dashboard
                .recentOrders
                .allOrders
            }
          </Link>
        </div>

        {recentOrders.length ===
        0 ? (
          <div className="rounded-3xl border border-black/5 bg-white p-8">
            {
              text.dashboard
                .recentOrders.empty
            }
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-black/5 bg-[#faf7f5] text-left">
                    <th className="px-6 py-4 text-sm font-semibold">
                      {
                        text.dashboard
                          .recentOrders
                          .order
                      }
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      {
                        text.dashboard
                          .recentOrders
                          .customer
                      }
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      {
                        text.dashboard
                          .recentOrders
                          .date
                      }
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      {
                        text.dashboard
                          .recentOrders
                          .status
                      }
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      {
                        text.dashboard
                          .recentOrders
                          .amount
                      }
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map(
                    (order) => (
                      <tr
                        key={order.id}
                        className="border-b border-black/5 last:border-b-0 hover:bg-[#faf7f5]"
                      >
                        <td className="px-6 py-4">
                          <Link
                            href={`/${locale}/admin/orders?order=${order.id}`}
                            className="font-semibold"
                          >
                            {locale ===
                            "en"
                              ? "#"
                              : "№"}

                            {order.order_number ??
                              order.id
                                .slice(
                                  0,
                                  8,
                                )
                                .toUpperCase()}
                          </Link>
                        </td>

                        <td className="px-6 py-4">
                          <strong className="block">
                            {order.customer_name ||
                              text.common
                                .noName}
                          </strong>

                          <span className="mt-1 block text-sm text-black/45">
                            {order.customer_phone ||
                              text
                                .dashboard
                                .recentOrders
                                .phoneMissing}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-black/60">
                          {formatOrderDate(
                            order.created_at,
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-[#f3e9e3] px-3 py-1 text-sm font-semibold">
                            {statusLabels[
                              order
                                .status
                            ] ??
                              order.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right font-semibold">
                          {formatMoney(
                            Number(
                              order.price ??
                                0,
                            ),
                          )}{" "}
                          {
                            text.common
                              .currency
                          }
                        </td>
                      </tr>
                    ),
                  )}
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
              {
                text.dashboard
                  .quickActions
                  .eyebrow
              }
            </span>

            <h2>
              {
                text.dashboard
                  .quickActions.title
              }
            </h2>
          </div>
        </div>

        <div className="admin-action-grid">
          {quickActions.map(
            (action) => (
              <Link
                href={action.href}
                className="admin-action-card"
                key={action.href}
              >
                <span className="admin-action-icon">
                  {action.icon}
                </span>

                <div>
                  <strong>
                    {action.title}
                  </strong>

                  <p>
                    {
                      action.description
                    }
                  </p>
                </div>

                <span className="admin-action-arrow">
                  →
                </span>
              </Link>
            ),
          )}
        </div>
      </section>

      <section className="admin-section admin-launch-section">
        <div>
          <span className="admin-eyebrow">
            {
              text.dashboard.progress
                .eyebrow
            }
          </span>

          <h2>
            {
              text.dashboard.progress
                .title
            }
          </h2>

          <p>
            {
              text.dashboard.progress
                .description
            }
          </p>
        </div>

        <div className="admin-progress">
          <div className="admin-progress-heading">
            <strong>
              {
                text.dashboard
                  .progress
                  .readiness
              }
            </strong>

            <span>90%</span>
          </div>

          <div className="admin-progress-track">
            <span />
          </div>

          <small>
            {
              text.dashboard.progress
                .note
            }
          </small>
        </div>
      </section>
    </div>
  );
}