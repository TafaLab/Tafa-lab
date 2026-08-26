"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";

import type {
  Cake,
  CakeVariant,
} from "@/lib/cake-types";

import { getCakeBySlug } from "@/lib/cake-service";

import { formatUsdFromKzt } from "@/lib/currency";

import { enMessages } from "@/messages/en";
import { ruMessages } from "@/messages/ru";

type Locale = "ru" | "en";

export default function CakeDetailsPage() {
  const params = useParams<{
    slug: string;
  }>();

  const currentLocale = useLocale();

  const locale: Locale =
    currentLocale === "en"
      ? "en"
      : "ru";

  const isEnglish =
    locale === "en";

  const text =
    isEnglish
      ? enMessages
      : ruMessages;

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : "";

  const [cake, setCake] =
    useState<Cake | null>(null);

  const [
    selectedVariantId,
    setSelectedVariantId,
  ] = useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCake() {
      if (!slug) {
        if (!cancelled) {
          setError(
            isEnglish
              ? "The cake could not be found."
              : "Не удалось найти торт.",
          );

          setIsLoading(false);
        }

        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const result =
          await getCakeBySlug(slug);

        if (cancelled) {
          return;
        }

        if (!result) {
          setCake(null);

          setError(
            isEnglish
              ? "This cake is no longer available."
              : "Этот торт больше недоступен.",
          );

          return;
        }

        setCake(result);

        setSelectedVariantId(
          result.defaultVariant?.id ??
            result.variants[0]?.id ??
            null,
        );
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : isEnglish
                ? "Could not load this cake."
                : "Не удалось загрузить торт.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadCake();

    return () => {
      cancelled = true;
    };
  }, [
    slug,
    isEnglish,
  ]);

  const selectedVariant =
    useMemo<CakeVariant | null>(() => {
      if (!cake) {
        return null;
      }

      return (
        cake.variants.find(
          (variant) =>
            variant.id ===
            selectedVariantId,
        ) ??
        cake.defaultVariant ??
        cake.variants[0] ??
        null
      );
    }, [
      cake,
      selectedVariantId,
    ]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#faf8f6] text-[#342923]">
        <Header
          locale={locale}
          text={text.nav}
        />

        <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 py-20">
          <div className="rounded-3xl border border-black/10 bg-white px-10 py-8 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-[#6a4433]" />

            <p className="mt-5 text-black/60">
              {isEnglish
                ? "Loading cake..."
                : "Загружаем торт..."}
            </p>
          </div>
        </section>

        <Footer
          locale={locale}
          text={text.footer}
        />
      </main>
    );
  }

  if (error || !cake) {
    return (
      <main className="min-h-screen bg-[#faf8f6] text-[#342923]">
        <Header
          locale={locale}
          text={text.nav}
        />

        <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 py-20">
          <div className="w-full max-w-xl rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm md:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f3e9e2] text-3xl">
              🎂
            </span>

            <h1 className="mt-6 text-3xl font-semibold">
              {isEnglish
                ? "Cake Not Found"
                : "Торт не найден"}
            </h1>

            <p className="mt-4 leading-7 text-black/60">
              {error ??
                (isEnglish
                  ? "This cake is unavailable."
                  : "Этот торт недоступен.")}
            </p>

            <Link
              href={`/${locale}/cakes`}
              className="mt-8 inline-flex rounded-full bg-[#6a4433] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              {isEnglish
                ? "Back to Catalog"
                : "Вернуться в каталог"}
            </Link>
          </div>
        </section>

        <Footer
          locale={locale}
          text={text.footer}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#342923]">
      <Header
        locale={locale}
        text={text.nav}
      />

      <section className="border-b border-black/10 bg-[#f2e8e1]">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link
            href={`/${locale}/cakes`}
            className="text-sm font-semibold text-[#6a4433]"
          >
            {isEnglish
              ? "← Back to Cakes"
              : "← Назад к тортам"}
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.8fr)] lg:items-start">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="relative aspect-square bg-[#f7f3ef]">
            {cake.imageUrl ? (
              <img
                src={cake.imageUrl}
                alt={cake.name}
                className="h-full w-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-8 text-center text-black/40">
                {isEnglish
                  ? "Photo not added yet"
                  : "Фотография пока не добавлена"}
              </div>
            )}

            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              {cake.isPopular && (
                <span className="rounded-full bg-[#6a4433] px-4 py-2 text-xs font-semibold text-white">
                  {isEnglish
                    ? "Popular"
                    : "Популярный"}
                </span>
              )}

              {cake.isNew && (
                <span className="rounded-full bg-[#2f9e44] px-4 py-2 text-xs font-semibold text-white">
                  {isEnglish
                    ? "NEW"
                    : "НОВИНКА"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6250]">
            {isEnglish
              ? "STK Bakery Collection"
              : "Коллекция STK Bakery"}
          </span>

          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {cake.name}
          </h1>

          {cake.description && (
            <p className="mt-5 text-base leading-7 text-black/60">
              {cake.description}
            </p>
          )}

          {cake.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {cake.categories.map(
                (category) => (
                  <span
                    key={category}
                    className="rounded-full border border-black/10 bg-[#f7f3ef] px-4 py-2 text-xs font-semibold text-black/60"
                  >
                    {category}
                  </span>
                ),
              )}
            </div>
          )}

          <div className="mt-8 border-t border-black/10 pt-7">
            <h2 className="text-lg font-semibold">
              {isEnglish
                ? "Choose Weight"
                : "Выберите вес"}
            </h2>

            {cake.variants.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {cake.variants.map(
                  (variant) => {
                    const active =
                      selectedVariant?.id ===
                      variant.id;

                    return (
                      <button
                        type="button"
                        key={variant.id}
                        onClick={() =>
                          setSelectedVariantId(
                            variant.id,
                          )
                        }
                        className={`rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-[#6a4433] bg-[#f3e9e2] ring-2 ring-[#6a4433]/10"
                            : "border-black/10 bg-white hover:border-[#6a4433]/30"
                        }`}
                      >
                        <strong className="block text-lg">
                          {variant.weightKg}{" "}
                          {isEnglish
                            ? "kg"
                            : "кг"}
                        </strong>

                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-semibold text-[#6a4433]">
                            {formatUsdFromKzt(variant.price)}
                          </span>

                          {variant.oldPrice &&
                            variant.oldPrice >
                              variant.price && (
                              <span className="text-sm text-black/35 line-through">
                                {formatUsdFromKzt(variant.oldPrice)}
                              </span>
                            )}
                        </div>
                      </button>
                    );
                  },
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm text-black/50">
                {isEnglish
                  ? "Weight and price will be confirmed by a manager."
                  : "Вес и стоимость уточнит менеджер."}
              </p>
            )}
          </div>

          <div className="mt-8 rounded-2xl bg-[#f7f3ef] p-5">
            <span className="text-sm text-black/50">
              {isEnglish
                ? "Selected Price"
                : "Выбранная стоимость"}
            </span>

            <strong className="mt-2 block text-3xl">
              {selectedVariant
                ? formatUsdFromKzt(selectedVariant.price)
                : cake.minimumPrice > 0
                  ? isEnglish
                    ? `from ${formatUsdFromKzt(cake.minimumPrice)}`
                    : `от ${formatUsdFromKzt(cake.minimumPrice)}`
                  : isEnglish
                    ? "To be confirmed"
                    : "Уточняется"}
            </strong>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/${locale}/builder`}
              className="rounded-full bg-[#6a4433] px-6 py-4 text-center font-semibold text-white transition hover:opacity-90"
            >
              {isEnglish
                ? "Customize This Cake"
                : "Изменить этот торт"}
            </Link>

            <Link
              href={`/${locale}/cakes`}
              className="rounded-full border border-[#6a4433] px-6 py-4 text-center font-semibold text-[#6a4433] transition hover:bg-[#f7f3ef]"
            >
              {isEnglish
                ? "View More Cakes"
                : "Посмотреть другие"}
            </Link>
          </div>

          <p className="mt-5 text-xs leading-5 text-black/45">
            {isEnglish
              ? "The displayed price is preliminary. A manager will confirm the final design, decorations and total price."
              : "Указанная стоимость предварительная. Менеджер подтвердит финальный дизайн, декор и итоговую цену."}
          </p>
        </div>
      </section>

      <Footer
        locale={locale}
        text={text.footer}
      />
    </main>
  );
}
