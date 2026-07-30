"use client";

import Link from "next/link";

import type { Cake } from "@/lib/cake-types";
import { formatPrice } from "@/lib/cake-builder/utils";

type Props = {
  cake: Cake;
};

export default function CakeCard({
  cake,
}: Props) {
  const variant =
    cake.defaultVariant ?? cake.variants[0] ?? null;

  return (
    <article className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/cakes/${cake.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-[#f7f3ef]">
          {cake.imageUrl ? (
            <img
              src={cake.imageUrl}
              alt={cake.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              draggable={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-black/40">
              Фотография пока не добавлена
            </div>
          )}

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {cake.isPopular && (
              <span className="rounded-full bg-[#6a4433] px-3 py-1 text-xs font-semibold text-white">
                Популярный
              </span>
            )}

            {cake.isNew && (
              <span className="rounded-full bg-[#2f9e44] px-3 py-1 text-xs font-semibold text-white">
                NEW
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-semibold">
            {cake.name}
          </h3>

          {cake.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/60">
              {cake.description}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="text-sm text-black/60">
            {variant
              ? `от ${variant.weightKg} кг`
              : "Вес уточняется"}
          </span>

          <div className="text-right">
            {variant?.oldPrice &&
              variant.oldPrice > variant.price && (
                <div className="text-sm text-black/40 line-through">
                  {formatPrice(variant.oldPrice)} ₸
                </div>
              )}

            <strong className="text-lg">
              {cake.minimumPrice > 0
                ? `от ${formatPrice(
                    cake.minimumPrice
                  )} ₸`
                : "Цена уточняется"}
            </strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/cakes/${cake.slug}`}
            className="rounded-full border border-[#6a4433] py-3 text-center font-semibold text-[#6a4433] transition hover:bg-[#f7f3ef]"
          >
            Подробнее
          </Link>

          <Link
            href="/builder"
            className="rounded-full bg-[#6a4433] py-3 text-center font-semibold text-white transition hover:opacity-90"
          >
            Изменить
          </Link>
        </div>
      </div>
    </article>
  );
}