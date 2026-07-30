"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

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

  decorations: DecorationInstance[] | null;
  inscription: InscriptionSettings | null;

  customer_comment: string | null;
  price: number | string | null;
};

const statuses: {
  value: OrderStatus;
  label: string;
}[] = [
  { value: "new", label: "Новый" },
  {
    value: "confirmed",
    label: "Подтвержден",
  },
  {
    value: "in_progress",
    label: "В работе",
  },
  { value: "ready", label: "Готов" },
  { value: "completed", label: "Выдан" },
  { value: "cancelled", label: "Отменен" },
];

function getStatusLabel(status: string) {
  return (
    statuses.find(
      (item) => item.value === status,
    )?.label ?? status
  );
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDeliveryDate(value: string | null) {
  if (!value) {
    return "Не указана";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
  }).format(
    new Date(`${value}T00:00:00`),
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  async function loadOrders(
    preferredOrderId?: string,
  ) {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    const loadedOrders =
      (data ?? []) as Order[];

    setOrders(loadedOrders);

    setSelectedOrder((current) => {
      const targetId =
        preferredOrderId ?? current?.id;

      if (targetId) {
        const refreshed =
          loadedOrders.find(
            (order) =>
              order.id === targetId,
          );

        if (refreshed) {
          return refreshed;
        }
      }

      return loadedOrders[0] ?? null;
    });

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

    const { error } = await supabase
      .from("orders")
      .update({
        status: newStatus,
      })
      .eq("id", selectedOrder.id);

    if (error) {
      setErrorMessage(error.message);
      setUpdatingStatus(false);
      return;
    }

    await loadOrders(selectedOrder.id);
    setUpdatingStatus(false);
  }

  const selectedCake = useMemo(() => {
    if (!selectedOrder?.cake_color) {
      return cakeBases[0];
    }

    const normalized =
      selectedOrder.cake_color
        .trim()
        .toLocaleLowerCase("ru-RU");

    return (
      cakeBases.find(
        (cake) =>
          cake.id.toLocaleLowerCase() ===
            normalized ||
          cake.name
            .trim()
            .toLocaleLowerCase("ru-RU") ===
            normalized,
      ) ?? cakeBases[0]
    );
  }, [selectedOrder]);

  const fillingLabel = useMemo(() => {
    if (!selectedOrder?.filling) {
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

    return (
      filling?.label ??
      selectedOrder.filling
    );
  }, [selectedOrder]);

  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">
            Мини CRM
          </span>

          <h1>Заказы</h1>

          <p>
            Все заявки из конструктора
            Milky Cake.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadOrders()}
          className="rounded-full border border-black/10 bg-white px-5 py-3 font-semibold shadow-sm transition hover:bg-[#f7f3ef]"
        >
          Обновить
        </button>
      </section>

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          Ошибка: {errorMessage}
        </div>
      )}

      {loading ? (
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          Загрузка заказов...
        </section>
      ) : orders.length === 0 ? (
        <section className="admin-empty-state">
          <span className="admin-empty-icon">
            ▤
          </span>

          <h2>Заказов пока нет</h2>

          <p>
            Новый заказ появится здесь
            после оформления на сайте.
          </p>
        </section>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="border-b border-black/5 px-6 py-5">
              <h2 className="text-xl font-semibold">
                Все заказы
              </h2>

              <p className="mt-1 text-sm text-black/50">
                Найдено: {orders.length}
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
                          Заказ №
                          {order.order_number ??
                            order.id
                              .slice(0, 8)
                              .toUpperCase()}
                        </strong>

                        <span className="mt-1 block text-sm text-black/55">
                          {order.customer_name ||
                            "Без имени"}
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
                            "Телефон не указан"}
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
                        ₸
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
                    Карточка заказа
                  </span>

                  <h2 className="mt-1 text-3xl font-semibold">
                    Заказ №
                    {selectedOrder.order_number ??
                      selectedOrder.id
                        .slice(0, 8)
                        .toUpperCase()}
                  </h2>

                  <p className="mt-2 text-sm text-black/50">
                    Создан{" "}
                    {formatDate(
                      selectedOrder.created_at,
                    )}
                  </p>
                </div>

                <div className="min-w-[220px]">
                  <label className="mb-2 block text-sm font-semibold">
                    Статус
                  </label>

                  <select
                    value={
                      selectedOrder.status
                    }
                    disabled={updatingStatus}
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
                      Клиент
                    </h3>

                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-black/45">
                          Имя
                        </dt>
                        <dd className="mt-1 font-semibold">
                          {selectedOrder.customer_name ||
                            "—"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          Телефон
                        </dt>
                        <dd className="mt-1 font-semibold">
                          {selectedOrder.customer_phone ||
                            "—"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          E-mail
                        </dt>
                        <dd className="mt-1">
                          {selectedOrder.customer_email ||
                            "—"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          Мессенджер
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
                      Получение
                    </h3>

                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-black/45">
                          Способ
                        </dt>
                        <dd className="mt-1 font-semibold">
                          {selectedOrder.delivery_type ===
                          "delivery"
                            ? "Доставка"
                            : "Самовывоз"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          Дата
                        </dt>
                        <dd className="mt-1">
                          {formatDeliveryDate(
                            selectedOrder.delivery_date,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          Время
                        </dt>
                        <dd className="mt-1">
                          {selectedOrder.delivery_time ||
                            "Не указано"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          Адрес
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
                      Торт
                    </h3>

                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-black/45">
                          Вес
                        </dt>
                        <dd className="mt-1 font-semibold">
                          {selectedOrder.weight ||
                            "—"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          Начинка
                        </dt>
                        <dd className="mt-1 font-semibold">
                          {fillingLabel}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          Цвет
                        </dt>
                        <dd className="mt-1">
                          {selectedCake.name}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm text-black/45">
                          Декораций
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
                        Надпись
                      </span>

                      <p className="mt-1 font-semibold">
                        {selectedOrder.inscription
                          ?.text || "Нет"}
                      </p>
                    </div>

                    <div className="mt-6">
                      <span className="text-sm text-black/45">
                        Комментарий клиента
                      </span>

                      <p className="mt-2 whitespace-pre-wrap rounded-2xl bg-white p-4">
                        {selectedOrder.customer_comment ||
                          "Комментарий отсутствует"}
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
                        Стоимость
                      </span>

                      <strong className="mt-1 block text-3xl">
                        {formatPrice(
                          Number(
                            selectedOrder.price ??
                              0,
                          ),
                        )}{" "}
                        ₸
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
