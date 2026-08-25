"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function ThankYouPage() {
  const locale = useLocale();
  const isEnglish = locale === "en";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ef] px-6 py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm md:p-10">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e9f8ec] text-5xl">
          ✅
        </div>

        <h1 className="mt-8 text-3xl font-semibold text-[#342923] md:text-4xl">
          {isEnglish
            ? "Thank You for Your Order!"
            : "Спасибо за заказ!"}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-black/65 md:text-lg md:leading-8">
          {isEnglish ? (
            <>
              Your test order has been created.
              <br />
              You can now open the demo admin panel and see how the order
              appears to the bakery team.
            </>
          ) : (
            <>
              Ваш тестовый заказ создан.
              <br />
              Теперь можно открыть демо-админку и увидеть, как заказ
              отображается со стороны кондитерской.
            </>
          )}
        </p>

        <Link
          href={`/${locale}/admin/orders`}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#6a4433] px-6 py-4 text-center font-semibold text-white transition hover:opacity-90"
        >
          {isEnglish
            ? "View My Order in the Admin Panel →"
            : "Посмотреть мой заказ в админ-панели →"}
        </Link>

        <div className="mt-10 rounded-2xl bg-[#f7f3ef] p-6 text-left">
          <h2 className="mb-3 text-lg font-semibold">
            {isEnglish
              ? "How the Demo Works"
              : "Как работает демо"}
          </h2>

          <ul className="space-y-3 text-black/70">
            <li>
              ✔{" "}
              {isEnglish
                ? "Open the public demo admin panel."
                : "Откройте открытую демо-админку."}
            </li>

            <li>
              ✔{" "}
              {isEnglish
                ? "Your newest test order appears first."
                : "Ваш новый тестовый заказ будет первым в списке."}
            </li>

            <li>
              ✔{" "}
              {isEnglish
                ? "Open it and review the cake design and order details."
                : "Откройте его и посмотрите дизайн торта и детали заказа."}
            </li>

            <li>
              ✔{" "}
              {isEnglish
                ? "Try changing its status like a bakery manager."
                : "Попробуйте изменить статус как менеджер кондитерской."}
            </li>

            <li>
              ✔{" "}
              {isEnglish
                ? "This is a demonstration; no real cake will be produced."
                : "Это демонстрация — настоящий торт не будет изготовлен."}
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={`/${locale}`}
            className="flex-1 rounded-full bg-[#6a4433] px-6 py-4 text-center font-semibold text-white transition hover:opacity-90"
          >
            {isEnglish ? "Back to Home" : "На главную"}
          </Link>

          <Link
            href={`/${locale}/builder`}
            className="flex-1 rounded-full border border-[#6a4433] px-6 py-4 text-center font-semibold text-[#6a4433] transition hover:bg-[#f7f3ef]"
          >
            {isEnglish
              ? "Create Another Cake"
              : "Создать ещё один торт"}
          </Link>
        </div>
      </div>
    </main>
  );
}
