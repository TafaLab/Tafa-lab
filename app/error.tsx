"use client";

import { usePathname } from "next/navigation";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  reset,
}: ErrorPageProps) {
  const pathname = usePathname();

  const isEnglish =
    pathname === "/en" ||
    pathname.startsWith("/en/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f6] px-6 py-10 text-[#342923]">
      <div className="w-full max-w-xl rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm md:p-10">
        <span
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e9e2] text-4xl"
          aria-hidden="true"
        >
          !
        </span>

        <h1 className="mt-7 text-3xl font-semibold md:text-4xl">
          {isEnglish
            ? "Something Went Wrong"
            : "Что-то пошло не так"}
        </h1>

        <p className="mt-5 text-base leading-7 text-black/60">
          {isEnglish
            ? "We could not open this page. Please try again."
            : "Не удалось открыть эту страницу. Попробуйте ещё раз."}
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-full bg-[#6a4433] px-8 py-4 font-semibold text-white transition hover:opacity-90"
        >
          {isEnglish
            ? "Try Again"
            : "Попробовать снова"}
        </button>
      </div>
    </main>
  );
}