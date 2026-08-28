import Link from "next/link";

export default function FullPriceLink({ locale, dark = false }: { locale: "ru" | "en"; dark?: boolean }) {
  return (
    <div className="mx-auto mt-10 max-w-7xl">
      <Link
        href={`/${locale}/price`}
        className={`flex items-center justify-between gap-5 rounded-2xl border px-6 py-5 text-sm font-semibold transition hover:-translate-y-0.5 ${dark ? "border-white/20 bg-white/10 text-white" : "border-black/10 bg-[#f3eee8] text-[#211d19]"}`}
      >
        <span>{locale === "ru" ? "Полный прайс, состав пакетов и дополнительные модули" : "Full pricing, package details and optional modules"}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
