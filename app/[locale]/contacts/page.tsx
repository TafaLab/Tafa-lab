"use client";

import { useLocale } from "next-intl";

type Locale = "ru" | "en";

const whatsappNumber = "77471818493";
const displayPhone = "+7 747 181 84 93";
const email = "suyunova.talifa@gmail.com";

export default function ContactsPage() {
  const currentLocale = useLocale();

  const locale: Locale =
    currentLocale === "en" ? "en" : "ru";

  const isEnglish = locale === "en";

  const whatsappMessage = isEnglish
    ? "Hello! I would like to discuss a project with Tafa Lab."
    : "Здравствуйте! Хочу обсудить проект с Tafa Lab.";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#342923]">
      <header className="border-b border-black/10 bg-white/90">
        <nav aria-label={isEnglish ? "Main navigation" : "Основная навигация"} className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <a href={`/${locale}`} className="font-bold tracking-wide text-[#342923]">TAFA LAB</a>
          <div className="flex items-center gap-5 text-sm font-medium">
            <a href={`/${locale}/ai-agents`} className="text-[#342923]">{isEnglish ? "AI Agents" : "AI-агенты"}</a>
            <a href={`/${locale}/blog`} className="text-[#342923]">{isEnglish ? "Articles" : "Статьи"}</a>
            <a href={`/${isEnglish ? "ru" : "en"}/contacts`} lang={isEnglish ? "ru" : "en"} className="text-[#342923]">{isEnglish ? "RU" : "EN"}</a>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#ead7d5]/45 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#f1dfd4]/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-label">
              {isEnglish
                ? "We Are Here to Help"
                : "Мы всегда на связи"}
            </span>

            <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
              {isEnglish
                ? "Contact Tafa Lab"
                : "Связаться с Tafa Lab"}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/60 md:text-lg">
              {isEnglish
                ? "Have a website, app or automation project in mind? Tell us what you need, and we’ll discuss the next steps."
                : "Планируете сайт, приложение или автоматизацию? Расскажите о задаче — обсудим подход и следующие шаги."}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:mt-16 md:grid-cols-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[2rem] border border-black/10 bg-white p-7 text-[#342923] no-underline shadow-[0_18px_50px_rgba(72,45,34,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#c98f91]/50 hover:text-[#342923] hover:shadow-[0_24px_60px_rgba(72,45,34,0.12)] md:p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5e8e5] text-[#714739] transition group-hover:bg-[#714739] group-hover:text-white">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.6 9.6 0 0 1-4-.9L3 21l1.8-4.8A8.7 8.7 0 1 1 21 11.5Z" />
                  <path d="M8.3 8.2c.3 2.7 2.8 5.3 5.5 5.7" />
                  <path d="M8.2 8.2h1.5l.7 2-1.1 1" />
                  <path d="M13.8 13.9v-1.5l2-.7 1 1.1" />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                WhatsApp
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/55">
                {isEnglish
                  ? "A convenient way to discuss your project and ask questions."
                  : "Удобный способ обсудить проект и задать вопросы."}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#714739]">
                {displayPhone}

                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </a>

            <a
              href={`mailto:${email}`}
              className="group rounded-[2rem] border border-black/10 bg-white p-7 text-[#342923] no-underline shadow-[0_18px_50px_rgba(72,45,34,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#c98f91]/50 hover:text-[#342923] hover:shadow-[0_24px_60px_rgba(72,45,34,0.12)] md:p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5e8e5] text-[#714739] transition group-hover:bg-[#714739] group-hover:text-white">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                Email
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/55">
                {isEnglish
                  ? "Send us your project brief, references and questions."
                  : "Отправьте описание проекта, примеры и вопросы."}
              </p>

              <span className="mt-6 block break-all font-semibold text-[#714739]">
                {email}
              </span>
            </a>

            <div className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_18px_50px_rgba(72,45,34,0.07)] md:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5e8e5] text-[#714739]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                {isEnglish
                  ? "How to Reach Us"
                  : "Как с нами связаться"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/55">
                {isEnglish
                  ? "Send us a message or email; we will respond when available."
                  : "Напишите нам в мессенджер или на почту — ответим, когда будем на связи."}
              </p>

              <p className="mt-6 font-semibold text-[#714739]">{email}</p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] bg-[#684336] px-6 py-10 text-center text-white shadow-[0_24px_70px_rgba(72,45,34,0.18)] md:px-12 md:py-14">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              Tafa Lab
            </span>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {isEnglish
                ? "Let’s Create Something Special"
                : "Давайте создадим что-то особенное"}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              {isEnglish
                ? "Tell us about your goals, project scope and timeline. We’ll discuss a practical solution."
                : "Расскажите о целях, задачах и сроках проекта. Обсудим подходящее решение."}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 font-semibold !text-[#684336] no-underline transition hover:-translate-y-0.5 hover:bg-[#f8eeea] hover:!text-[#684336]"
            >
              {isEnglish
                ? "Message on WhatsApp"
                : "Написать в WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white px-6 py-8 text-center text-sm text-[#342923]/70">
        © Tafa Lab · <a href={`/${locale}`} className="underline">{isEnglish ? "Back to main site" : "На главную"}</a>
      </footer>
    </main>
  );
}