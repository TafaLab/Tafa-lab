import Link from "next/link";

import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";

import LanguageSwitcher from "./LanguageSwitcher";

type Locale = "ru" | "en";

type HeaderText = {
  cakes: string;
  builder: string;
  food: string;
  gallery: string;
  contacts: string;
  button: string;
};

type HeaderProps = {
  locale: Locale;
  text: HeaderText;
};

export default function Header({
  locale,
  text,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="border-b border-black/10 bg-[#4b2d26] px-4 py-2 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 text-center text-[11px] leading-4 sm:text-xs">
          <span className="text-white/65">
            {locale === "en"
              ? "A demonstration project by Tafa Lab"
              : "Демонстрационный проект Tafa Lab"}
          </span>
          <Link
            href={`/${locale}`}
            className="font-semibold text-white underline decoration-white/35 underline-offset-4"
          >
            {locale === "en"
              ? "Visit the main site →"
              : "Перейти на основной сайт →"}
          </Link>
          <span className="text-white/35">·</span>
          <Link
            href={`/${locale}/admin/orders`}
            className="font-semibold text-white underline decoration-white/35 underline-offset-4"
          >
            {locale === "en" ? "Demo admin →" : "Демо-админка →"}
          </Link>
        </div>
      </div>

      <Container className="header-inner">
        <Link
          href={`/${locale}/bakery`}
          className="brand"
        >
          <span className="brand-logo">
            STK
          </span>

          <span className="brand-text">
            STK <strong>Bakery</strong>
          </span>
        </Link>

        <nav className="desktop-nav">
          <Link href={`/${locale}/cakes`}>
            {text.cakes}
          </Link>

          <Link href={`/${locale}/builder`}>
            {text.builder}
          </Link>

          <Link href={`/${locale}/food`}>
            {text.food}
          </Link>

          <Link href={`/${locale}/gallery`}>
            {text.gallery}
          </Link>

          <Link href={`/${locale}/contacts`}>
            {text.contacts}
          </Link>

          <Link href={`/${locale}/price`}>
            {locale === "en" ? "Price" : "Цены"}
          </Link>

          <Link href={`/${locale}/checkout`}>
            {locale === "en" ? "Cart" : "Корзина"}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <details className="mobile-nav-menu">
            <summary aria-label={locale === "en" ? "Open navigation" : "Открыть меню"}>
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label={locale === "en" ? "Mobile navigation" : "Мобильная навигация"}>
              <Link href={`/${locale}/cakes`}>{text.cakes}</Link>
              <Link href={`/${locale}/builder`}>{text.builder}</Link>
              <Link href={`/${locale}/food`}>{text.food}</Link>
              <Link href={`/${locale}/gallery`}>{text.gallery}</Link>
              <Link href={`/${locale}/contacts`}>{text.contacts}</Link>
              <Link href={`/${locale}/price`}>{locale === "en" ? "Price" : "Цены"}</Link>
              <Link href={`/${locale}/checkout`}>{locale === "en" ? "🛒 Cart" : "🛒 Корзина"}</Link>
            </nav>
          </details>

          <LanguageSwitcher
            locale={locale}
          />

          <Button
            href={`/${locale}/builder`}
            className="header-button"
          >
            {text.button}
          </Button>
        </div>
      </Container>
    </header>
  );
}