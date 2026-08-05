"use client";

import { useLocale } from "next-intl";

import type { Cake } from "@/lib/cake-types";

import CakeCard from "./CakeCard";

type Props = {
  cakes: Cake[];
};

export default function CakesGrid({
  cakes,
}: Props) {
  const locale = useLocale();
  const isEnglish = locale === "en";

  if (cakes.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-black/15 bg-white p-16 text-center">
        <h3 className="text-2xl font-semibold">
          {isEnglish
            ? "No Cakes Found"
            : "Торты не найдены"}
        </h3>

        <p className="mt-3 text-black/60">
          {isEnglish
            ? "Try changing your search or selecting another category."
            : "Попробуйте изменить запрос или выбрать другую категорию."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {cakes.map((cake) => (
        <CakeCard
          key={cake.id}
          cake={cake}
        />
      ))}
    </div>
  );
}