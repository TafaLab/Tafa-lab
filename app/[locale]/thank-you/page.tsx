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
              We have received your request.
              <br />
              An STK Bakery manager will contact you shortly, review the cake
              design, clarify the details and confirm the final price.
            </>
          ) : (
            <>
              Мы получили вашу заявку.
              <br />
              В ближайшее время менеджер STK Bakery свяжется с вами, проверит
              оформление торта, уточнит детали и подтвердит окончательную
              стоимость.
            </>
          )}
        </p>

        <div className="mt-10 rounded-2xl bg-[#f7f3ef] p-6 text-left">
          <h2 className="mb-3 text-lg font-semibold">
            {isEnglish
              ? "What Happens Next?"
              : "Что будет дальше?"}
          </h2>

          <ul className="space-y-3 text-black/70">
            <li>
              ✔{" "}
              {isEnglish
                ? "We will review the cake design."
                : "Проверим оформление торта."}
            </li>

            <li>
              ✔{" "}
              {isEnglish
                ? "We may suggest improvements if needed."
                : "При необходимости предложим улучшения."}
            </li>

            <li>
              ✔{" "}
              {isEnglish
                ? "We will confirm the final price."
                : "Подтвердим стоимость."}
            </li>

            <li>
              ✔{" "}
              {isEnglish
                ? "We will confirm the date and time."
                : "Согласуем дату и время."}
            </li>

            <li>
              ✔{" "}
              {isEnglish
                ? "We will prepare your cake."
                : "Приготовим ваш торт."}
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