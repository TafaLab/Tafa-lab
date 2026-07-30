"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StaticCakePreview from "@/app/components/cake-builder/StaticCakePreview";
import { supabase } from "@/lib/supabase";
import {
  cakeBases,
  enabledDecorationAssets,
} from "@/lib/cake-builder/assets";
import {
  fillings,
  weights,
} from "@/lib/cake-builder/constants";
import { formatPrice } from "@/lib/cake-builder/utils";

import type {
  DecorationInstance,
  InscriptionSettings,
} from "@/lib/cake-builder/types";

type OrderData = {
  weight: number;
  filling: string;
  color: string;
  decorations: DecorationInstance[];
  inscription: InscriptionSettings;
  comment: string;
  price: number;
};

export default function CheckoutPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [order, setOrder] =
    useState<OrderData | null>(null);

  const [customerName, setCustomerName] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [customerMessenger, setCustomerMessenger] =
    useState("");

  const [deliveryType, setDeliveryType] =
    useState("pickup");

  const [deliveryDate, setDeliveryDate] =
    useState("");

  const [deliveryTime, setDeliveryTime] =
    useState("");

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    const raw =
      sessionStorage.getItem(
        "milky-cake-order",
      );

    if (!raw) {
      router.replace("/builder");
      return;
    }

    try {
      setOrder(JSON.parse(raw));
    } catch {
      router.replace("/builder");
      return;
    }

    setLoading(false);
  }, [router]);

  const weight = useMemo(() => {
    return weights.find(
      (x) => x.value === order?.weight,
    );
  }, [order]);

  const filling = useMemo(() => {
    return fillings.find(
      (x) => x.value === order?.filling,
    );
  }, [order]);

  const cake = useMemo(() => {
    return cakeBases.find(
      (x) => x.id === order?.color,
    );
  }, [order]);

  async function createOrder() {
    if (!order) return;

    if (!customerName.trim()) {
      alert("Введите имя");
      return;
    }

    if (!customerPhone.trim()) {
      alert("Введите телефон");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName,

        customer_phone: customerPhone,

        customer_email:
          customerEmail || null,

        customer_messenger:
          customerMessenger || null,

        delivery_type: deliveryType,

        delivery_date:
          deliveryDate || null,

        delivery_time:
          deliveryTime || null,

        address:
          deliveryType === "delivery"
            ? address
            : null,

        weight: weight?.label ?? "",

        filling:
          filling?.label ?? "",

       cake_color:
  cake?.id ?? order.color,

        decorations:
          order.decorations,

        inscription:
          order.inscription,

        customer_comment:
          order.comment,

        price: order.price,
      });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    sessionStorage.removeItem(
      "milky-cake-order",
    );

    router.replace("/thank-you");
  }

  if (loading || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ef]">
        Загрузка...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ef]">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/builder"
            className="font-semibold"
          >
            ← Вернуться в конструктор
          </Link>

          <h1 className="text-3xl font-semibold">
            Оформление заказа
          </h1>

        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_420px]">

              <div className="space-y-6">

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-semibold">
              Контактные данные
            </h2>

            <div className="grid gap-4">

              <input
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                placeholder="Ваше имя"
                className="rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#6a4433]"
              />

              <input
                value={customerPhone}
                onChange={(e) =>
                  setCustomerPhone(e.target.value)
                }
                placeholder="Телефон"
                className="rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#6a4433]"
              />

              <input
                value={customerEmail}
                onChange={(e) =>
                  setCustomerEmail(e.target.value)
                }
                placeholder="E-mail (необязательно)"
                className="rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#6a4433]"
              />

              <input
                value={customerMessenger}
                onChange={(e) =>
                  setCustomerMessenger(e.target.value)
                }
                placeholder="WhatsApp / Telegram"
                className="rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#6a4433]"
              />

            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-2xl font-semibold">
              Получение заказа
            </h2>

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setDeliveryType("pickup")
                }
                className={`rounded-full px-5 py-3 ${
                  deliveryType === "pickup"
                    ? "bg-[#6a4433] text-white"
                    : "bg-[#f2ece8]"
                }`}
              >
                Самовывоз
              </button>

              <button
                type="button"
                onClick={() =>
                  setDeliveryType("delivery")
                }
                className={`rounded-full px-5 py-3 ${
                  deliveryType === "delivery"
                    ? "bg-[#6a4433] text-white"
                    : "bg-[#f2ece8]"
                }`}
              >
                Доставка
              </button>

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <input
                type="date"
                value={deliveryDate}
                onChange={(e) =>
                  setDeliveryDate(e.target.value)
                }
                className="rounded-2xl border border-black/10 px-5 py-4"
              />

              <input
                value={deliveryTime}
                onChange={(e) =>
                  setDeliveryTime(e.target.value)
                }
                placeholder="Например 18:00"
                className="rounded-2xl border border-black/10 px-5 py-4"
              />

            </div>

            {deliveryType === "delivery" && (
              <textarea
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                rows={4}
                placeholder="Адрес доставки"
                className="mt-4 w-full rounded-2xl border border-black/10 px-5 py-4 resize-none"
              />
            )}

          </section>

        </div>

        <aside className="space-y-6">

          <section className="rounded-3xl bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-semibold">
              Ваш заказ
            </h2>
{cake && (
  <div className="mt-5">
    <StaticCakePreview
      base={cake}
      decorations={order.decorations}
      inscription={order.inscription}
    />
  </div>
)}

            <div className="mt-6 space-y-3 text-sm">

              <div className="flex justify-between">
                <span>Вес</span>
                <strong>{weight?.label}</strong>
              </div>

              <div className="flex justify-between">
                <span>Начинка</span>
                <strong>{filling?.label}</strong>
              </div>

              <div className="flex justify-between">
                <span>Цвет</span>
                <strong>{cake?.name}</strong>
              </div>

              <div className="flex justify-between">
                <span>Декор</span>
                <strong>
                  {order.decorations.length}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Надпись</span>
                <strong>
                  {order.inscription.text
                    ? "Есть"
                    : "Нет"}
                </strong>
              </div>

            </div>

            <div className="mt-6 rounded-2xl bg-[#f7f3ef] p-5">

              <div className="flex items-center justify-between">

                <span className="text-lg">
                  Предварительная стоимость
                </span>

                <strong className="text-3xl">
                  {formatPrice(order.price)} ₸
                </strong>

              </div>

            </div>

            <button
              type="button"
              onClick={createOrder}
              disabled={saving}
              className="mt-6 w-full rounded-full bg-[#6a4433] px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {saving
                ? "Сохранение..."
                : "Подтвердить заказ"}
            </button>

          </section>

        </aside>

      </div>

    </main>
  );
}
