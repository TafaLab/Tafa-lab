"use client";

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
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value as CakeSortType
        )
      }
      className="h-14 rounded-2xl border border-black/10 bg-white px-5 text-sm outline-none transition focus:border-[#6a4433] focus:ring-2 focus:ring-[#6a4433]/10"
    >
      <option value="popular">
        Популярные
      </option>

      <option value="new">
        Новинки
      </option>

      <option value="priceAsc">
        Сначала дешевле
      </option>

      <option value="priceDesc">
        Сначала дороже
      </option>
    </select>
  );
}