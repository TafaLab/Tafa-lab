import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";

type Locale = "ru" | "en";

type HeroText = {
  eyebrow: string;
  titleFirst: string;
  titleAccent: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
  dailyTitle: string;
  dailyText: string;
  individualTitle: string;
  individualText: string;
  photoLabel: string;
  photoTitle: string;
  photoLink: string;
  badgeFirst: string;
  badgeSecond: string;
  decorTitle: string;
  decorText: string;
  fillingTitle: string;
  fillingText: string;
  imageAlt: string;
};

type HeroProps = {
  locale: Locale;
  text: HeroText;
};

export default function Hero({
  locale,
  text,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-circle hero-circle-one" />
      <div className="hero-circle hero-circle-two" />

      <Container className="hero-grid">
        <div className="hero-content">
          <div className="eyebrow">
            <span />
            {text.eyebrow}
          </div>

          <h1>
            {text.titleFirst}
            <br />
            <em>{text.titleAccent}</em>
          </h1>

          <p className="hero-description">
            {text.description}
          </p>

          <div className="hero-actions">
            <Button
              href={`/${locale}/builder`}
            >
              {text.primaryButton}
              <span>→</span>
            </Button>

            <Button
              href={`/${locale}/cakes`}
              variant="secondary"
            >
              {text.secondaryButton}
            </Button>
          </div>

          <div className="hero-information">
            <div>
              <strong>
                {text.dailyTitle}
              </strong>
              <span>{text.dailyText}</span>
            </div>

            <div>
              <strong>
                {text.individualTitle}
              </strong>
              <span>
                {text.individualText}
              </span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo">
            <img
              className="hero-photo-image"
              src="/images/hero-cake.jpg"
              alt={text.imageAlt}
              draggable={false}
            />

            <div className="hero-photo-overlay" />

            <div className="hero-photo-caption">
              <div>
                <span>{text.photoLabel}</span>
                <strong>{text.photoTitle}</strong>
              </div>

              <Button
                href={`/${locale}/cakes`}
                variant="secondary"
              >
                {text.photoLink} →
              </Button>
            </div>
          </div>

          <div className="hero-badge">
            <span>{text.badgeFirst}</span>
            <strong>{text.badgeSecond}</strong>
          </div>

          <div className="floating-card floating-card-left">
            <span className="floating-icon">
              🍓
            </span>

            <div>
              <strong>{text.decorTitle}</strong>
              <small>{text.decorText}</small>
            </div>
          </div>

          <div className="floating-card floating-card-right">
            <span className="floating-icon">
              🍰
            </span>

            <div>
              <strong>
                {text.fillingTitle}
              </strong>
              <small>
                {text.fillingText}
              </small>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
