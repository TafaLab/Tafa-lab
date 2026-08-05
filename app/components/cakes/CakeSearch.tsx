"use client";

import { useLocale } from "next-intl";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CakeSearch({
  value,
  onChange,
}: Props) {
  const locale = useLocale();
  const isEnglish = locale === "en";

  return (
    <div className="relative w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={
          isEnglish
            ? "Search cakes..."
            : "Поиск торта..."
        }
        aria-label={
          isEnglish
            ? "Search cakes"
            : "Поиск торта"
        }
        className="h-14 w-full rounded-2xl border border-black/10 bg-white pl-14 pr-5 text-sm outline-none transition focus:border-[#6a4433] focus:ring-2 focus:ring-[#6a4433]/10"
      />
    </div>
  );
}