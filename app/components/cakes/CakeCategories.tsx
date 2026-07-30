"use client";

import { cakeCategories } from "@/lib/cake-types";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CakeCategories({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {cakeCategories.map((category) => {
        const active =
          value === category.value;

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
            {category.label}
          </button>
        );
      })}
    </div>
  );
}