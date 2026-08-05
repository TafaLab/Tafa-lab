"use client";

import { useLocale } from "next-intl";

import { cakeCategories } from "@/lib/cake-types";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const englishCategoryLabels: Record<
  string,
  string
> = {
  all: "All",

  kids: "Kids",

  girls: "Girls",

  boys: "Boys",

  babies: "Babies",

  women: "Women",

  men: "Men",

  birthday: "Birthday",

  "gender-party":
    "Gender Reveal",

  bento: "Bento Cakes",

  tiered:
    "Tiered Cakes",

  "promo-9990":
    "From 9,990 ₸",

  "promo-10990":
    "From 10,990 ₸",

  popular: "Popular",

  new: "New",
};

export default function CakeCategories({
  value,
  onChange,
}: Props) {
  const locale = useLocale();

  const isEnglish =
    locale === "en";

  return (
    <div className="flex flex-wrap gap-3">
      {cakeCategories.map((category) => {
        const active =
          value === category.value;

        const label = isEnglish
          ? englishCategoryLabels[
              category.value
            ] ?? category.label
          : category.label;

        return (
          <button
            key={category.value}
            type="button"
            onClick={() =>
              onChange(category.value)
            }
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              active
                ? "bg-[#6a4433] text-white shadow-lg"
                : "border border-black/10 bg-white hover:bg-[#f7f3ef]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}