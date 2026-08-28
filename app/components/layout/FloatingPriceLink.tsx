"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingPriceLink({ locale }: { locale: string }) {
  const pathname = usePathname();

  if (pathname.endsWith("/price")) return null;

  return (
    <Link
      href={`/${locale}/price`}
      className="floating-price-link"
      style={{ color: "#ffffff" }}
    >
      {locale === "ru" ? "Общий прайс" : "Full price"} →
    </Link>
  );
}
