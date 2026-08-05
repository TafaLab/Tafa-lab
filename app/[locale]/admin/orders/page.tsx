"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocale,
} from "next-intl";

import { supabase } from "@/lib/supabase";

import {
  cakeBases,
} from "@/lib/cake-builder/assets";

import {
  fillings,
} from "@/lib/cake-builder/constants";

import {
  formatPrice,
} from "@/lib/cake-builder/utils";

import type {
  DecorationInstance,
  InscriptionSettings,
} from "@/lib/cake-builder/types";

import StaticCakePreview from "@/app/components/cake-builder/StaticCakePreview";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

type OrderStatus =
  | "new"
  | "confirmed"
  | "in_progress"
  | "ready"
  | "completed"
  | "cancelled";

type Order = {
  id: string;
  order_number: number | null;
  created_at: string;
  updated_at: string | null;
  status: OrderStatus | string;

  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  customer_messenger: string | null;

  delivery_type: string | null;
  delivery_date: string | null;
  delivery_time: string | null;
  address: string | null;

  weight: string | null;
  filling: string | null;
  cake_color: string | null;

  decorations:
    | DecorationInstance[]
    | null;

  inscription:
    | InscriptionSettings
    | null;

  customer_comment:
    | string
    | null;

  price:
    | number
    | string
    | null;
};

export default function AdminOrdersPage() {
  const currentLocale =
    useLocale();

  const locale: AdminLocale =
    currentLocale === "en"
      ? "en"
      : "ru";

  const text =
    adminMessages[locale];

  const intlLocale =
    locale === "en"
      ? "en-US"
      : "ru-RU";

  const statuses: {
    value: OrderStatus;
    label: string;
  }[] = [
    {
      value: "new",
      label:
        text.orders.statuses.new,
    },
    {
      value: "confirmed",
      label:
        text.orders.statuses
          .confirmed,
    },
    {
      value: "in_progress",
      label:
        text.orders.statuses
          .in_progress,
    },
    {
      value: "ready",
      label:
        text.orders.statuses
          .ready,
    },
    {
      value: "completed",
      label:
        text.orders.statuses
          .completed,
    },
    {
      value: "cancelled",
      label:
        text.orders.statuses
          .cancelled,
    },
  ];

  function getStatusLabel(
    status: string,
  ) {
    return (
      statuses.find(
        (item) =>
          item.value === status,
      )?.label ?? status
    );
  }

  function formatDate(
    value: string | null,
  ) {
    if (!value) {
      return "—";
    }

    return new Intl.DateTimeFormat(
      intlLocale,
      {
        dateStyle: "medium",
        timeStyle: "short",
      },
    ).format(new Date(value));
  }

  function formatDeliveryDate(
    value: string | null,
  ) {
    if (!value) {
      return (
        text.orders.delivery
          .dateMissing
      );
    }

    return new Intl.DateTimeFormat(
      intlLocale,
      {
        dateStyle: "medium",
      },
    ).format(
      new Date(
        `${value}T00:00:00`,
      ),
    );
  }

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState<Order | null>(
    null,
  );

  const [loading, setLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    updatingStatus,
    setUpdatingStatus,
  ] = useState(false);
    async function loadOrders(
    preferredOrderId?: string,
  ) {
    setLoading(true);
    setErrorMessage("");

    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      setErrorMessage(
        error.message,
      );

      setLoading(false);
      return;
    }

    const loadedOrders =
      (data ?? []) as Order[];

    setOrders(loadedOrders);

    setSelectedOrder(
      (current) => {
        const targetId =
          preferredOrderId ??
          current?.id;

        if (targetId) {
          const refreshed =
            loadedOrders.find(
              (order) =>
                order.id ===
                targetId,
            );

          if (refreshed) {
            return refreshed;
          }
        }

        return (
          loadedOrders[0] ??
          null
        );
      },
    );

    setLoading(false);
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  async function changeStatus(
    newStatus: OrderStatus,
  ) {
    if (!selectedOrder) {
      return;
    }

    setUpdatingStatus(true);
    setErrorMessage("");

    const { error } =
      await supabase
        .from("orders")
        .update({
          status: newStatus,
        })
        .eq(
          "id",
          selectedOrder.id,
        );

    if (error) {
      setErrorMessage(
        error.message,
      );

      setUpdatingStatus(false);
      return;
    }

    await loadOrders(
      selectedOrder.id,
    );

    setUpdatingStatus(false);
  }

  const selectedCake =
    useMemo(() => {
      if (
        !selectedOrder?.cake_color
      ) {
        return cakeBases[0];
      }

      const normalized =
        selectedOrder.cake_color
          .trim()
          .toLocaleLowerCase(
            "ru-RU",
          );

      return (
        cakeBases.find(
          (cake) =>
            cake.id.toLocaleLowerCase() ===
              normalized ||
            cake.name
              .trim()
              .toLocaleLowerCase(
                "ru-RU",
              ) === normalized,
        ) ?? cakeBases[0]
      );
    }, [selectedOrder]);

  const fillingLabel =
    useMemo(() => {
      if (
        !selectedOrder?.filling
      ) {
        return "—";
      }

      const filling =
        fillings.find(
          (item) =>
            item.value ===
              selectedOrder.filling ||
            item.label ===
              selectedOrder.filling,
        );

      if (!filling) {
        return (
          selectedOrder.filling
        );
      }

      if (locale === "ru") {
        return filling.label;
      }

      const englishLabels: Record<
        string,
        string
      > = {
        snickers: "Snickers",
        "whoopie-pie":
          "Whoopie Pie",
        honey: "Honey Cake",
        "chocolate-banana":
          "Chocolate Banana",
        pistachio: "Pistachio",
        "milk-girl":
          "Milk Girl",
        "red-velvet":
          "Red Velvet",
      };

      return (
        englishLabels[
          filling.value
        ] ?? filling.label
      );
    }, [
      locale,
      selectedOrder,
    ]);

  const cakeColorLabel =
    useMemo(() => {
      if (locale === "ru") {
        return selectedCake.name;
      }

      const englishBaseNames: Record<
        string,
        string
      > = {
        white: "White",
        cream: "Cream",
        ivory: "Ivory",
        pink: "Pink",
        blue: "Blue",
        mint: "Mint",
        lilac: "Lilac",
        lavender: "Lavender",
        peach: "Peach",
        yellow: "Yellow",
        chocolate: "Chocolate",
        "red-velvet":
          "Red Velvet",
        black: "Black",
        gray: "Gray",
      };

      return (
        englishBaseNames[
          selectedCake.id
        ] ?? selectedCake.name
      );
    }, [
      locale,
      selectedCake,
    ]);

  const orderNumberPrefix =
    locale === "en"
      ? "Order #"
      : "Заказ №";

  const phoneMissing =
    locale === "en"
      ? "Phone not provided"
      : "Телефон не указан";
        return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">
            {text.orders.eyebrow}
          </span>

          <h1>
            {text.orders.title}
          </h1>

          <p>
            {text.orders.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            void loadOrders()
          }
          className="rounded-full border border-black/10 bg-white px-5 py-3 font-semibold shadow-sm transition hover:bg-[#f7f3ef]"
        >
          {text.orders.refresh}
        </button>
      </section>

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          {text.orders.errorPrefix}{" "}
          {errorMessage}
        </div>
      )}

      {loading ? (
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          {text.orders.loading}
        </section>
      ) : orders.length === 0 ? (
        <section className="admin-empty-state">
          <span className="admin-empty-icon">
            ▤
          </span>

          <h2>
            {text.orders.emptyTitle}
          </h2>

          <p>
            {
              text.orders
                .emptyDescription
            }
          </p>
        </section>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="border-b border-black/5 px-6 py-5">
              <h2 className="text-xl font-semibold">
                {text.orders.allOrders}
              </h2>

              <p className="mt-1 text-sm text-black/50">
                {text.orders.found}:{" "}
                {orders.length}
              </p>
            </div>

            <div className="max-h-[760px] overflow-y-auto">
              {orders.map((order) => {
                const active =
                  order.id ===
                  selectedOrder?.id;

                return (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() =>
                      setSelectedOrder(
                        order,
                      )
                    }
                    className={`block w-full border-b border-black/5 px-6 py-5 text-left transition ${
                      active
                        ? "bg-[#f3e9e3]"
                        : "hover:bg-[#faf7f5]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <strong className="block text-lg">
                          {orderNumberPrefix}
                          {order.order_number ??
                            order.id
                              .slice(
                                0,
                                8,
                              )
                              .toUpperCase()}
                        </strong>

                        <span className="mt-1 block text-sm text-black/55">
                          {order.customer_name ||
                            text.common
                              .noName}
                        </span>
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
                        {getStatusLabel(
                          order.status,
                        )}
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div className="text-sm text-black/55">
                        <div>
                          {order.customer_phone ||
                            phoneMissing}
                        </div>

                        <div className="mt-1">
                          {formatDate(
                            order.created_at,
                          )}
                        </div>
                      </div>

                      <strong>
                        {formatPrice(
                          Number(
                            order.price ?? 0,
                          ),
                        )}{" "}
                        {
                          text.common
                            .currency
                        }
                      </strong>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {selectedOrder && (
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 border-b border-black/5 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="text-sm text-black/45">
                    {
                      text.orders
                        .orderCard
                    }
                  </span>

                  <h2 className="mt-1 text-3xl font-semibold">
                    {orderNumberPrefix}
                    {selectedOrder.order_number ??
                      selectedOrder.id
                        .slice(0, 8)
                        .toUpperCase()}
                  </h2>

                  <p className="mt-2 text-sm text-black/50">
                    {text.orders.created}{" "}
                    {formatDate(
                      selectedOrder.created_at,
                    )}
                  </p>
                </div>

                <div className="min-w-[220px]">
                  <label className="mb-2 block text-sm font-semibold">
                    {text.orders.status}
                  </label>

                  <select
                    value={
                      selectedOrder.status
                    }
                    disabled={
                      updatingStatus
                    }
                    onChange={(event) =>
                      void changeStatus(
                        event.target
                          .value as OrderStatus,
                      )
                    }
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#6a4433] disabled:opacity-60"
                  >
                    {statuses.map(
                      (status) => (
                        <option
                          key={
                            status.value
                          }
                          value={
                            status.value
                          }
                        >
                          {status.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
                            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_420px]">
                <div className="space-y-6">
                  <div className="rounded-3xl bg-[#f8f5f2] p-6">
                    <h3 className="text-xl font-semibold">
                      {
                        text.orders.customer
                          .title
                      }
                    </h3>

                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.customer
                              .name
                          }
                        </dt>

                        <dd className="mt-1 font-semibold">
                          {selectedOrder.customer_name ||
                            "—"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.customer
                              .phone
                          }
                        </dt>

                        <dd className="mt-1 font-semibold">
                          {selectedOrder.customer_phone ||
                            "—"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.customer
                              .email
                          }
                        </dt>

                        <dd className="mt-1">
                          {selectedOrder.customer_email ||
                            "—"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.customer
                              .messenger
                          }
                        </dt>

                        <dd className="mt-1">
                          {selectedOrder.customer_messenger ||
                            "—"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-3xl bg-[#f8f5f2] p-6">
                    <h3 className="text-xl font-semibold">
                      {
                        text.orders.delivery
                          .title
                      }
                    </h3>

                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.delivery
                              .method
                          }
                        </dt>

                        <dd className="mt-1 font-semibold">
                          {selectedOrder.delivery_type ===
                          "delivery"
                            ? text.orders.delivery
                                .delivery
                            : text.orders.delivery
                                .pickup}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.delivery
                              .date
                          }
                        </dt>

                        <dd className="mt-1">
                          {formatDeliveryDate(
                            selectedOrder.delivery_date,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.delivery
                              .time
                          }
                        </dt>

                        <dd className="mt-1">
                          {selectedOrder.delivery_time ||
                            text.orders.delivery
                              .timeMissing}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.delivery
                              .address
                          }
                        </dt>

                        <dd className="mt-1">
                          {selectedOrder.address ||
                            "—"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-3xl bg-[#f8f5f2] p-6">
                    <h3 className="text-xl font-semibold">
                      {
                        text.orders.cake
                          .title
                      }
                    </h3>

                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.cake
                              .weight
                          }
                        </dt>

                        <dd className="mt-1 font-semibold">
                          {selectedOrder.weight ||
                            "—"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.cake
                              .filling
                          }
                        </dt>

                        <dd className="mt-1 font-semibold">
                          {fillingLabel}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.cake
                              .color
                          }
                        </dt>

                        <dd className="mt-1">
                          {cakeColorLabel}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          {
                            text.orders.cake
                              .decorations
                          }
                        </dt>

                        <dd className="mt-1">
                          {
                            (
                              selectedOrder.decorations ??
                              []
                            ).length
                          }
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6">
                      <span className="text-sm text-black/45">
                        {
                          text.orders.cake
                            .inscription
                        }
                      </span>

                      <p className="mt-1 font-semibold">
                        {selectedOrder.inscription
                          ?.text ||
                          text.orders.cake
                            .noInscription}
                      </p>
                    </div>

                    <div className="mt-6">
                      <span className="text-sm text-black/45">
                        {
                          text.orders.cake
                            .comment
                        }
                      </span>

                      <p className="mt-2 whitespace-pre-wrap rounded-2xl bg-white p-4">
                        {selectedOrder.customer_comment ||
                          text.orders.cake
                            .noComment}
                      </p>
                    </div>
                  </div>
                </div>
                                           <aside>
                  <div className="sticky top-6">
                    <StaticCakePreview
                      base={selectedCake}
                      decorations={
                        selectedOrder.decorations ??
                        []
                      }
                      inscription={
                        selectedOrder.inscription
                      }
                    />

                    <div className="mt-5 rounded-2xl bg-[#6a4433] p-5 text-white">
                      <span className="text-sm text-white/70">
                        {
                          text.orders.cake
                            .price
                        }
                      </span>

                      <strong className="mt-1 block text-3xl">
                        {formatPrice(
                          Number(
                            selectedOrder.price ??
                              0,
                          ),
                        )}{" "}
                        {
                          text.common
                            .currency
                        }
                      </strong>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}