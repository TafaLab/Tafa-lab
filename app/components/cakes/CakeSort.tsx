"use client";

import { useLocale } from "next-intl";

export type CakeSortType =
  | "popular"
  | "new"
  | "priceAsc"
  | "priceDesc";

type Props = {
  value: CakeSortType;
  onChange: (value: CakeSortType) => void;
};

export default function CakeSort({
  value,
  onChange,
}: Props) {
  const locale = useLocale();
  const isEnglish = locale === "en";

  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value as CakeSortType,
        )
      }
      aria-label={
        isEnglish
          ? "Sort cakes"
          : "Сортировка тортов"
      }
      className="h-14 rounded-2xl border border-black/10 bg-white px-5 text-sm outline-none transition focus:border-[#6a4433] focus:ring-2 focus:ring-[#6a4433]/10"
    >
      <option value="popular">
        {isEnglish
          ? "Most Popular"
          : "Популярные"}
      </option>

      <option value="new">
        {isEnglish
          ? "Newest"
          : "Новинки"}
      </option>

      <option value="priceAsc">
        {isEnglish
          ? "Price: Low to High"
          : "Сначала дешевле"}
      </option>

      <option value="priceDesc">
        {isEnglish
          ? "Price: High to Low"
          : "Сначала дороже"}
      </option>
    </select>
  );
}