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
        </nav>

        <div className="flex items-center gap-3">
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
