"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import StaticCakePreview from "@/app/components/cake-builder/StaticCakePreview";

import {
  cakeBases,
} from "@/lib/cake-builder/assets";

import {
  fillings,
  weights,
} from "@/lib/cake-builder/constants";

import type {
  DecorationInstance,
  Filling,
  InscriptionSettings,
} from "@/lib/cake-builder/types";

import { formatPrice } from "@/lib/cake-builder/utils";
import { supabase } from "@/lib/supabase";

type OrderData = {
  weight: number;
  filling: string;
  color: string;
  decorations: DecorationInstance[];
  inscription: InscriptionSettings;
  comment: string;
  price: number;
  currency?: "USD";
  readyCake?: { name: string; image: string };
};

const englishFillingLabels: Record<
  Filling,
  string
> = {
  snickers: "Snickers",
  "whoopie-pie": "Whoopie Pie",
  honey: "Honey Cake",
  "chocolate-banana":
    "Chocolate Banana",
  pistachio: "Pistachio",
  "milk-girl": "Milk Girl",
  "red-velvet": "Red Velvet",
};

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
  "red-velvet": "Red Velvet",
  black: "Black",
  gray: "Gray",
};

export default function CheckoutPage() {
  const router = useRouter();
  const locale = useLocale();

  const isEnglish = locale === "en";

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [order, setOrder] =
    useState<OrderData | null>(null);

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    customerPhone,
    setCustomerPhone,
  ] = useState("");

  const [
    customerEmail,
    setCustomerEmail,
  ] = useState("");

  const [
    customerMessenger,
    setCustomerMessenger,
  ] = useState("");

  const [
    deliveryType,
    setDeliveryType,
  ] = useState<
    "pickup" | "delivery"
  >("pickup");

  const [
    deliveryDate,
    setDeliveryDate,
  ] = useState("");

  const [
    deliveryTime,
    setDeliveryTime,
  ] = useState("");

  const [address, setAddress] =
    useState("");

  const [allergyNotes, setAllergyNotes] =
    useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const raw =
        sessionStorage.getItem(
          "milky-cake-order",
        );

      if (!raw) {
        router.replace(
          `/${locale}/builder`,
        );

        return;
      }

      try {
        const parsed =
          JSON.parse(raw) as OrderData;

        setOrder(parsed);
        setLoading(false);
      } catch {
        router.replace(
          `/${locale}/builder`,
        );
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [locale, router]);

  const selectedWeight =
    useMemo(() => {
      return weights.find(
        (item) =>
          item.value ===
          order?.weight,
      );
    }, [order]);

  const selectedFilling =
    useMemo(() => {
      return fillings.find(
        (item) =>
          item.value ===
          order?.filling,
      );
    }, [order]);

  const selectedCake =
    useMemo(() => {
      return cakeBases.find(
        (item) =>
          item.id ===
          order?.color,
      );
    }, [order]);

  const fillingName =
    selectedFilling
      ? isEnglish
        ? englishFillingLabels[
            selectedFilling.value
          ]
        : selectedFilling.label
      : "—";

  const cakeColorName =
    selectedCake
      ? isEnglish
        ? englishBaseNames[
            selectedCake.id
          ] ??
          selectedCake.name
        : selectedCake.name
      : "—";

  async function createOrder() {
    if (!order || saving) {
      return;
    }

    if (!customerName.trim()) {
      alert(
        isEnglish
          ? "Please enter your name."
          : "Введите имя.",
      );

      return;
    }

    if (!customerPhone.trim()) {
      alert(
        isEnglish
          ? "Please enter your phone number."
          : "Введите телефон.",
      );

      return;
    }

    if (
      deliveryType === "delivery" &&
      !address.trim()
    ) {
      alert(
        isEnglish
          ? "Please enter the delivery address."
          : "Введите адрес доставки.",
      );

      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("orders")
      .insert({
        customer_name:
          customerName.trim(),

        customer_phone:
          customerPhone.trim(),

        customer_email:
          customerEmail.trim() ||
          null,

        customer_messenger:
          customerMessenger.trim() ||
          null,

        delivery_type:
          deliveryType,

        delivery_date:
          deliveryDate || null,

        delivery_time:
          deliveryTime.trim() ||
          null,

        address:
          deliveryType === "delivery"
            ? address.trim()
            : null,

        weight:
          selectedWeight?.label ??
          "",

        filling:
          selectedFilling?.label ??
          "",

        cake_color: order.readyCake ? "READY_CAKE" : selectedCake?.id ?? order.color,

        decorations:
          order.decorations,

        inscription:
          order.inscription,

        customer_comment: [
          order.comment.trim(),
          allergyNotes.trim()
            ? `${isEnglish ? "Allergies and special requests" : "Аллергии и особые пожелания"}: ${allergyNotes.trim()}`
            : "",
        ].filter(Boolean).join("\n\n"),

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

    router.replace(
      `/${locale}/thank-you`,
    );
  }

  if (loading || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ef] px-6 text-[#342923]">
        <div className="rounded-3xl bg-white px-8 py-6 shadow-sm">
          {isEnglish
            ? "Loading your order..."
            : "Загрузка заказа..."}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ef] text-[#342923]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
          <Link
            href={`/${locale}/builder`}
            className="text-sm font-semibold text-[#6a4433]"
          >
            {isEnglish
              ? "← Back to Cake Builder"
              : "← Вернуться в конструктор"}
          </Link>

          <h1 className="text-2xl font-semibold md:text-3xl">
            {isEnglish
              ? "Checkout"
              : "Оформление заказа"}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link href={`/${locale}/bakery`} className="text-black/55">
              {isEnglish ? "Bakery home" : "Главная пекарни"}
            </Link>
            <Link href={`/${locale}/admin/orders`} className="font-semibold text-[#6a4433]">
              {isEnglish ? "Demo admin →" : "Демо-админка →"}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <section className="rounded-3xl bg-white p-5 shadow-sm md:p-7">
            <h2 className="mb-5 text-xl font-semibold md:text-2xl">
              {isEnglish
                ? "Contact Information"
                : "Контактные данные"}
            </h2>

            <div className="grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  {isEnglish
                    ? "Your Name"
                    : "Ваше имя"}
                </span>

                <input
                  value={
                    customerName
                  }
                  autoComplete="name"
                  onChange={(event) =>
                    setCustomerName(
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    isEnglish
                      ? "Enter your name"
                      : "Введите ваше имя"
                  }
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#6a4433]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  {isEnglish
                    ? "Phone Number"
                    : "Телефон"}
                </span>

                <input
                  type="tel"
                  value={
                    customerPhone
                  }
                  autoComplete="tel"
                  onChange={(event) =>
                    setCustomerPhone(
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    isEnglish
                      ? "Enter your phone number"
                      : "Введите номер телефона"
                  }
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#6a4433]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  E-mail
                </span>

                <input
                  type="email"
                  value={
                    customerEmail
                  }
                  autoComplete="email"
                  onChange={(event) =>
                    setCustomerEmail(
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    isEnglish
                      ? "E-mail (optional)"
                      : "E-mail (необязательно)"
                  }
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#6a4433]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  WhatsApp / Telegram
                </span>

                <input
                  value={
                    customerMessenger
                  }
                  onChange={(event) =>
                    setCustomerMessenger(
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    isEnglish
                      ? "Username or phone number"
                      : "Имя пользователя или номер телефона"
                  }
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#6a4433]"
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm md:p-7">
            <h2 className="mb-5 text-xl font-semibold md:text-2xl">
              {isEnglish
                ? "Order Collection"
                : "Получение заказа"}
            </h2>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeliveryType(
                    "pickup",
                  )
                }
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  deliveryType ===
                  "pickup"
                    ? "bg-[#6a4433] text-white"
                    : "bg-[#f2ece8] text-[#432e25]"
                }`}
              >
                {isEnglish
                  ? "Pickup"
                  : "Самовывоз"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setDeliveryType(
                    "delivery",
                  )
                }
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  deliveryType ===
                  "delivery"
                    ? "bg-[#6a4433] text-white"
                    : "bg-[#f2ece8] text-[#432e25]"
                }`}
              >
                {isEnglish
                  ? "Delivery"
                  : "Доставка"}
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  {isEnglish
                    ? "Date"
                    : "Дата"}
                </span>

                <input
                  type="date"
                  value={
                    deliveryDate
                  }
                  onChange={(event) =>
                    setDeliveryDate(
                      event.target
                        .value,
                    )
                  }
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#6a4433]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  {isEnglish
                    ? "Time"
                    : "Время"}
                </span>

                <input
                  value={
                    deliveryTime
                  }
                  onChange={(event) =>
                    setDeliveryTime(
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    isEnglish
                      ? "Example: 18:00"
                      : "Например: 18:00"
                  }
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#6a4433]"
                />
              </label>
            </div>

            {deliveryType ===
              "delivery" && (
              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-semibold">
                  {isEnglish
                    ? "Delivery Address"
                    : "Адрес доставки"}
                </span>

                <textarea
                  value={address}
                  onChange={(event) =>
                    setAddress(
                      event.target
                        .value,
                    )
                  }
                  rows={4}
                  placeholder={
                    isEnglish
                      ? "Enter the full delivery address"
                      : "Укажите полный адрес доставки"
                  }
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-[#6a4433]"
                />
              </label>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-xl font-semibold md:text-2xl">
              {isEnglish
                ? "Your Order"
                : "Ваш заказ"}
            </h2>

            {selectedCake && (
              <div className="mt-5 overflow-hidden rounded-2xl bg-[#f5f1ed]">
                {order.readyCake ? <div className="relative aspect-square overflow-hidden rounded-2xl"><Image src={order.readyCake.image} alt={order.readyCake.name} fill className="object-cover" sizes="420px" /></div> : <StaticCakePreview base={selectedCake} decorations={order.decorations} inscription={order.inscription} />}
              </div>
            )}

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-3">
                <span className="text-black/50">
                  {isEnglish
                    ? "Weight"
                    : "Вес"}
                </span>

                <strong className="text-right">
                  {selectedWeight?.label ??
                    "—"}
                </strong>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-3">
                <span className="text-black/50">
                  {isEnglish
                    ? "Filling"
                    : "Начинка"}
                </span>

                <strong className="text-right">
                  {fillingName}
                </strong>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-3">
                <span className="text-black/50">
                  {isEnglish
                    ? "Color"
                    : "Цвет"}
                </span>

                <strong className="text-right">
                  {cakeColorName}
                </strong>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-3">
                <span className="text-black/50">
                  {isEnglish
                    ? "Decorations"
                    : "Декор"}
                </span>

                <strong>
                  {
                    order.decorations
                      .length
                  }
                </strong>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-black/50">
                  {isEnglish
                    ? "Inscription"
                    : "Надпись"}
                </span>

                <strong className="max-w-[220px] text-right">
                  {order.inscription
                    .text
                    ? order
                        .inscription
                        .text
                    : isEnglish
                      ? "No inscription"
                      : "Без надписи"}
                </strong>
              </div>
            </div>

            {order.comment?.trim() && (
              <div className="mt-5 rounded-2xl border border-black/10 bg-[#fffaf7] p-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40">
                  {isEnglish
                    ? "Order Comment"
                    : "Комментарий к заказу"}
                </span>

                <p className="mt-2 text-sm leading-6 text-black/65">
                  {order.comment}
                </p>
              </div>
            )}

            <label className="mt-5 block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
                {isEnglish
                  ? "Allergies and special requests"
                  : "Аллергии и особые пожелания"}
              </span>
              <textarea
                value={allergyNotes}
                onChange={(event) => setAllergyNotes(event.target.value)}
                rows={4}
                placeholder={isEnglish
                  ? "For example: nut allergy, no lactose, delivery notes…"
                  : "Например: аллергия на орехи, без лактозы, пожелания по заказу…"}
                className="mt-3 w-full resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#6a4433] focus:ring-4 focus:ring-[#6a4433]/10"
              />
            </label>

            <div className="mt-6 rounded-2xl bg-[#f7f3ef] p-5">
              <span className="block text-sm text-black/50">
                {isEnglish
                  ? "Estimated Price"
                  : "Предварительная стоимость"}
              </span>

              <strong className="mt-2 block text-3xl">
                {order.currency === "USD" ? "$" : ""}{formatPrice(order.price)}{order.currency === "USD" ? "" : " ₸"}
              </strong>
            </div>

            <p className="mt-4 text-xs leading-5 text-black/45">
              {isEnglish
                ? "A manager will review the order and confirm the final design, availability and price."
                : "Менеджер проверит заказ и подтвердит финальный дизайн, доступность и окончательную стоимость."}
            </p>

            <button
              type="button"
              onClick={createOrder}
              disabled={saving}
              className="mt-6 flex w-full items-center justify-between rounded-full bg-[#6a4433] px-6 py-4 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {saving
                  ? isEnglish
                    ? "Submitting..."
                    : "Отправляем..."
                  : isEnglish
                    ? "Confirm Order"
                    : "Подтвердить заказ"}
              </span>

              <span aria-hidden="true">
                →
              </span>
            </button>
          </section>
        </aside>
      </div>
    </main>
  );
}