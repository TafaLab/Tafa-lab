"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  const isEnglish =
    pathname === "/en" ||
    pathname.startsWith("/en/");

  const locale = isEnglish
    ? "en"
    : "ru";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f6] px-6 py-10 text-[#342923]">
      <div className="mx-auto w-full max-w-xl text-center">
        <span className="text-7xl">
          🎂
        </span>

        <h1 className="mt-7 text-5xl font-bold">
          404
        </h1>

        <h2 className="mt-5 text-3xl font-semibold">
          {isEnglish
            ? "Page Not Found"
            : "Страница не найдена"}
        </h2>

        <p className="mt-6 text-base leading-7 text-black/60 md:text-lg md:leading-8">
          {isEnglish
            ? "The page you are looking for does not exist or has been moved."
            : "Страница, которую вы ищете, не существует или была перемещена."}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}`}
            className="rounded-full bg-[#6a4433] px-8 py-4 font-semibold text-white transition hover:opacity-90"
          >
            {isEnglish
              ? "Back to Home"
              : "На главную"}
          </Link>

          <Link
            href={`/${locale}/cakes`}
            className="rounded-full border border-[#6a4433] px-8 py-4 font-semibold text-[#6a4433] transition hover:bg-[#f7f3ef]"
          >
            {isEnglish
              ? "View Cakes"
              : "Посмотреть торты"}
          </Link>
        </div>
      </div>
    </main>
  );
}