import Card from "@/app/components/ui/Card";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import SectionTitle from "@/app/components/ui/SectionTitle";

type Advantage = {
  number: string;
  title: string;
  description: string;
};

type AdvantagesText = {
  label: string;
  title: string;
  link: string;
};

type AdvantagesProps = {
  section: AdvantagesText;
  items: readonly Advantage[];
};

export default function Advantages({
  section,
  items,
}: AdvantagesProps) {
  return (
    <section className="advantages-section">
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

        <div className="advantages-grid">
          {items.map((item) => (
            <Card
              key={item.number}
              className="advantage-card"
            >
              <span className="advantage-number">
                {item.number}
              </span>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
