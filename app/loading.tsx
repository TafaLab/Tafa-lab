"use client";

import { usePathname } from "next/navigation";

export default function Loading() {
  const pathname = usePathname();

  const isEnglish =
    pathname === "/en" ||
    pathname.startsWith("/en/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f6] px-6">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-[#6a4433]/15 border-t-[#6a4433]" />

        <h2 className="mt-8 text-2xl font-semibold text-[#342923]">
          {isEnglish
            ? "Loading..."
            : "Загрузка..."}
        </h2>

        <p className="mt-3 text-black/55">
          {isEnglish
            ? "Preparing TAFA Bakery"
            : "Подготавливаем TAFA Bakery"}
        </p>
      </div>
    </main>
  );
}