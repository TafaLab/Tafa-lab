import Card from "@/app/components/ui/Card";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import SectionTitle from "@/app/components/ui/SectionTitle";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type ProcessSectionText = {
  label: string;
  title: string;
  link: string;
};

type ProcessProps = {
  section: ProcessSectionText;
  steps: readonly ProcessStep[];
};

export default function Process({
  section,
  steps,
}: ProcessProps) {
  return (
    <section className="process-section">
      <Container>
        <SectionTitle
          label={
            <SectionLabel>
              {section.label}
            </SectionLabel>
          }
          title={section.title}
          aside={
            <span className="catalog-link">
              {section.link}
            </span>
          }
        />

        <div className="process-grid">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="process-card"
            >
              <span className="process-number">
                {step.number}
              </span>

              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
