import Link from "next/link";

import Container from "@/app/components/ui/Container";

type Locale = "ru" | "en";

type FooterText = {
  description: string;
  menuTitle: string;
  informationTitle: string;
  contactTitle: string;
  cakes: string;
  builder: string;
  food: string;
  gallery: string;
  about: string;
  contacts: string;
  schedule: string;
  copyright: string;
  slogan: string;
};

type FooterProps = {
  locale: Locale;
  text: FooterText;
};

export default function Footer({
  locale,
  text,
}: FooterProps) {
  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div className="footer-about">
          <Link
            href={`/${locale}/bakery`}
            className="brand footer-brand"
          >
            <span className="brand-logo">
              SB
            </span>

            <span className="brand-text">
              STK <strong>Bakery</strong>
            </span>
          </Link>

          <p>{text.description}</p>
        </div>

        <div className="footer-column">
          <strong>{text.menuTitle}</strong>

          <Link href={`/${locale}/cakes`}>
            {text.cakes}
          </Link>

          <Link href={`/${locale}/builder`}>
            {text.builder}
          </Link>

          <Link href={`/${locale}/food`}>
            {text.food}
          </Link>
        </div>

        <div className="footer-column">
          <strong>
            {text.informationTitle}
          </strong>

          <Link href={`/${locale}/gallery`}>
            {text.gallery}
          </Link>

          <Link href={`/${locale}/bakery`}>
            {text.about}
          </Link>

          <Link href={`/${locale}/contacts`}>
            {text.contacts}
          </Link>
        </div>

        <div className="footer-column">
          <strong>{text.contactTitle}</strong>

          <a
            href="tel:+77476818493"
            className="footer-phone"
          >
            +7 747 681 84 93
          </a>

          <span>{text.schedule}</span>
        </div>
      </Container>

      <Container className="footer-bottom">
        <span>{text.copyright}</span>
        <span>
          {text.slogan}
          {" · "}
          <Link href={`/${locale}`} className="underline decoration-current/30 underline-offset-4">
            {locale === "en"
              ? "Demo by STK Lab"
              : "Демо-проект STK Lab"}
          </Link>
        </span>
      </Container>
    </footer>
  );
}
