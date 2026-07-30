"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ef] px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e9f8ec] text-5xl">
          ✅
        </div>

        <h1 className="mt-8 text-4xl font-semibold text-[#342923]">
          Спасибо за заказ!
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-black/65">
          Мы получили вашу заявку.
          <br />
          В ближайшее время менеджер Milky Cake свяжется с вами,
          проверит оформление торта, уточнит детали и подтвердит
          окончательную стоимость.
        </p>

        <div className="mt-10 rounded-2xl bg-[#f7f3ef] p-6 text-left">

          <h2 className="mb-3 text-lg font-semibold">
            Что будет дальше?
          </h2>

          <ul className="space-y-3 text-black/70">
            <li>✔ Проверим оформление торта.</li>
            <li>✔ При необходимости предложим улучшения.</li>
            <li>✔ Подтвердим стоимость.</li>
            <li>✔ Согласуем дату и время.</li>
            <li>✔ Приготовим ваш торт.</li>
          </ul>

        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/"
            className="flex-1 rounded-full bg-[#6a4433] px-6 py-4 text-center font-semibold text-white transition hover:opacity-90"
          >
            На главную
          </Link>

          <Link
            href="/builder"
            className="flex-1 rounded-full border border-[#6a4433] px-6 py-4 text-center font-semibold text-[#6a4433] transition hover:bg-[#f7f3ef]"
          >
            Создать ещё один торт
          </Link>

        </div>

      </div>
    </main>
  );
}