import Image from "next/image";

import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";

type Locale = "ru" | "en";

type BuilderShowcaseText = {
  windowTitle: string;
  menu: readonly string[];
  preview: string;
  label: string;
  titleFirst: string;
  titleAccent: string;
  description: string;
  benefits: readonly string[];
  button: string;
};

type BuilderShowcaseProps = {
  locale: Locale;
  text: BuilderShowcaseText;
};

export default function BuilderShowcase({
  locale,
  text,
}: BuilderShowcaseProps) {
  return (
    <section className="builder-section">
      <Container className="builder-grid">
        <div className="builder-preview">
          <div className="builder-window">
            <div className="builder-window-header">
              <div className="window-controls">
                <span />
                <span />
                <span />
              </div>

              <small>{text.windowTitle}</small>
            </div>

            <div className="builder-window-body">
              <div className="builder-menu">
                {text.menu.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      index === 0 ? "active" : ""
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="builder-photo">
                <div className="builder-photo-image">
                  <Image
                    src="/images/hero-cake.jpg"
                    alt={
                      locale === "ru"
                        ? "Предпросмотр элегантного розового торта"
                        : "Preview of an elegant pink custom cake"
                    }
                    fill
                    sizes="(max-width: 900px) 70vw, 420px"
                  />
                </div>
                <span>{text.preview}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="builder-content">
          <SectionLabel>
            {text.label}
          </SectionLabel>

          <h2>
            {text.titleFirst}
            <br />
            <em>{text.titleAccent}</em>
          </h2>

          <p>{text.description}</p>

          <ul>
            {text.benefits.map((benefit) => (
              <li key={benefit}>
                <span>✓</span>
                {benefit}
              </li>
            ))}
          </ul>

          <Button
            href={`/${locale}/builder`}
          >
            {text.button}
            <span>→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
