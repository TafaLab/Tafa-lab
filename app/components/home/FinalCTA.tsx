import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";

type Locale = "ru" | "en";

type FinalCTAText = {
  label: string;
  title: string;
  description: string;
  button: string;
};

type FinalCTAProps = {
  locale: Locale;
  text: FinalCTAText;
};

export default function FinalCTA({
  locale,
  text,
}: FinalCTAProps) {
  return (
    <section className="final-section">
      <Container className="final-section-inner">
        <div>
          <SectionLabel>
            {text.label}
          </SectionLabel>

          <h2>{text.title}</h2>
          <p>{text.description}</p>
        </div>

        <Button
          href={`/${locale}/builder`}
          className="dark-button"
        >
          {text.button}
          <span>→</span>
        </Button>
      </Container>
    </section>
  );
}
