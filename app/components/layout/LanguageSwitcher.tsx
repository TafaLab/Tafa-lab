"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Locale = "ru" | "en";

type LanguageSwitcherProps = {
  locale: Locale;
};

export default function LanguageSwitcher({
  locale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getLocalizedPath(targetLocale: Locale) {
    const pathParts = pathname.split("/");

    if (
      pathParts[1] === "ru" ||
      pathParts[1] === "en"
    ) {
      pathParts[1] = targetLocale;

      return pathParts.join("/") || `/${targetLocale}`;
    }

    return `/${targetLocale}${pathname}`;
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/75 p-1">
      <Link
        href={getLocalizedPath("ru")}
        aria-label="Русская версия"
        className={`inline-flex h-8 min-w-[38px] items-center justify-center rounded-full px-2.5 text-xs font-bold no-underline transition ${
          locale === "ru"
            ? "bg-[#4b2d26] text-white"
            : "bg-transparent text-[#4b342a] hover:bg-[#f3e9e2]"
        }`}
      >
        RU
      </Link>

      <Link
        href={getLocalizedPath("en")}
        aria-label="English version"
        className={`inline-flex h-8 min-w-[38px] items-center justify-center rounded-full px-2.5 text-xs font-bold no-underline transition ${
          locale === "en"
            ? "bg-[#4b2d26] text-white"
            : "bg-transparent text-[#4b342a] hover:bg-[#f3e9e2]"
        }`}
      >
        EN
      </Link>
    </div>
  );
}