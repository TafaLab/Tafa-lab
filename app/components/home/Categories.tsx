import Link from "next/link";

import Badge from "@/app/components/ui/Badge";
import Card from "@/app/components/ui/Card";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import SectionTitle from "@/app/components/ui/SectionTitle";

type Locale = "ru" | "en";

type Category = {
  icon: string;
  title: string;
  description: string;
  href: string;
  button: string;
  featured: boolean;
};

type CategoriesSectionText = {
  label: string;
  title: string;
  description: string;
  popular: string;
};

type CategoriesProps = {
  locale: Locale;
  section: CategoriesSectionText;
  items: readonly Category[];
};

export default function Categories({
  locale,
  section,
  items,
}: CategoriesProps) {
  return (
    <section className="categories-section">
      <Container>
        <SectionTitle
          label={
            <SectionLabel>
              {section.label}
            </SectionLabel>
          }
          title={section.title}
          description={section.description}
        />

        <div className="categories-grid">
          {items.map((item) => (
            <Card
              key={item.title}
              className={
                item.featured
                  ? "category-card category-card-featured"
                  : "category-card"
              }
            >
              {item.featured && (
                <Badge variant="accent">
                  {section.popular}
                </Badge>
              )}

              <div className="category-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <Link
                href={`/${locale}${item.href}`}
              >
                {item.button}
                <span>→</span>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
