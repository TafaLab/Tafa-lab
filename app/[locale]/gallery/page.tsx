"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";

import { enMessages } from "@/messages/en";
import { ruMessages } from "@/messages/ru";

type Locale = "ru" | "en";

const galleryImages = [
  {
    src: "/images/gallery/cake-01.webp",
    altRu: "Работа STK Bakery",
    altEn: "STK Bakery creation",
  },
  {
    src: "/images/gallery/cake-02.webp",
    altRu: "Работа STK Bakery",
    altEn: "STK Bakery creation",
  },
  {
    src: "/images/gallery/cake-03.webp",
    altRu: "Авторский торт STK Bakery",
    altEn: "Custom cake by STK Bakery",
  },
  {
    src: "/images/gallery/cake-04.webp",
    altRu: "Авторский торт STK Bakery",
    altEn: "Custom cake by STK Bakery",
  },
  {
    src: "/images/gallery/cake-05.webp",
    altRu: "Авторский торт STK Bakery",
    altEn: "Custom cake by STK Bakery",
  },
  {
    src: "/images/gallery/cake-06.webp",
    altRu: "Работа STK Bakery",
    altEn: "STK Bakery creation",
  },
  {
    src: "/images/gallery/cake-07.webp",
    altRu: "Работа STK Bakery",
    altEn: "STK Bakery creation",
  },
  {
    src: "/images/gallery/cake-08.webp",
    altRu: "Авторская работа STK Bakery",
    altEn: "Custom creation by STK Bakery",
  },
  {
    src: "/images/gallery/cake-09.webp",
    altRu: "Авторская работа STK Bakery",
    altEn: "Custom creation by STK Bakery",
  },
  {
    src: "/images/gallery/cake-10.webp",
    altRu: "Торт ручной работы STK Bakery",
    altEn: "Handcrafted cake by STK Bakery",
  },
  {
    src: "/images/gallery/cake-11.webp",
    altRu: "Торт ручной работы STK Bakery",
    altEn: "Handcrafted cake by STK Bakery",
  },
  {
    src: "/images/gallery/cake-12.webp",
    altRu: "Праздничный торт STK Bakery",
    altEn: "Celebration cake by STK Bakery",
  },
  {
    src: "/images/gallery/cake-13.webp",
    altRu: "Праздничный торт STK Bakery",
    altEn: "Celebration cake by STK Bakery",
  },
  {
    src: "/images/gallery/cake-14.webp",
    altRu: "Работа кондитеров STK Bakery",
    altEn: "STK Bakery confectionery creation",
  },
];

export default function GalleryPage() {
  const currentLocale = useLocale();

  const locale: Locale =
    currentLocale === "en" ? "en" : "ru";

  const isEnglish = locale === "en";

  const text = isEnglish
    ? enMessages
    : ruMessages;

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#342923]">
      <Header
        locale={locale}
        text={text.nav}
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#ead7d5]/45 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-96 h-96 w-96 rounded-full bg-[#f1dfd4]/55 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-label">
              {isEnglish
                ? "Made with Care"
                : "Создано с заботой"}
            </span>

            <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
              {isEnglish
                ? "Our Gallery"
                : "Наша галерея"}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/60 md:text-lg">
              {isEnglish
                ? "Discover a selection of our cakes, desserts and bakery creations made for special moments."
                : "Посмотрите подборку наших тортов, десертов и других работ, созданных для особенных моментов."}
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-5 md:mt-16">
            {galleryImages.map((image, index) => (
              <figure
                key={image.src}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#eee4df] shadow-[0_18px_50px_rgba(72,45,34,0.08)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
              >
                <Image
                  src={image.src}
                  alt={
                    isEnglish
                      ? image.altEn
                      : image.altRu
                  }
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-50 transition duration-500 group-hover:opacity-75" />

                <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#4b342a] opacity-0 shadow-sm backdrop-blur-md transition duration-300 group-hover:opacity-100">
                  STK Bakery
                </div>
              </figure>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] bg-[#684336] px-6 py-10 text-center text-white shadow-[0_24px_70px_rgba(72,45,34,0.18)] md:mt-16 md:px-12 md:py-14">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              STK Bakery
            </span>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {isEnglish
                ? "Create Your Own Cake"
                : "Создайте свой торт"}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              {isEnglish
                ? "Choose the flavors, colors and decorations to create a cake made especially for your celebration."
                : "Выберите вкус, цвет и украшения, чтобы создать торт специально для вашего праздника."}
            </p>

            <Link
              href={`/${locale}/builder`}
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 font-semibold text-[#684336] no-underline transition hover:-translate-y-0.5 hover:bg-[#f8eeea]"
              style={{ color: "#684336" }}
            >
              {isEnglish
                ? "Open Cake Builder"
                : "Открыть конструктор"}
            </Link>
          </div>
        </div>
      </section>

      <Footer
        locale={locale}
        text={text.footer}
      />
    </main>
  );
}
