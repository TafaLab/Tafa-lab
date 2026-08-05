import Link from "next/link";

import Card from "@/app/components/ui/Card";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import SectionTitle from "@/app/components/ui/SectionTitle";

type Locale = "ru" | "en";

type CakeItem = {
  image: string;
  title: string;
  category: string;
  price: string;
};

type PopularCakesText = {
  label: string;
  title: string;
  link: string;
  placeholder: string;
  favoriteLabel: string;
};

type PopularCakesProps = {
  locale: Locale;
  section: PopularCakesText;
  cakes: readonly CakeItem[];
};

export default function PopularCakes({
  locale,
  section,
  cakes,
}: PopularCakesProps) {
  return (
    <section className="popular-section">
      <Container>
        <SectionTitle
          label={
            <SectionLabel>
              {section.label}
            </SectionLabel>
          }
          title={section.title}
          aside={
            <Link
              href={`/${locale}/cakes`}
              className="catalog-link"
            >
              {section.link}
              <span>→</span>
            </Link>
          }
        />

        <div className="products-grid">
          {cakes.map((cake) => (
            <Card
              key={cake.title}
              className="product-card"
            >
              <div className="product-image">
                <img
                  src={cake.image}
                  alt={cake.title}
                  draggable={false}
                />

                <span className="product-placeholder">
                  {section.placeholder}
                </span>

                <button
                  type="button"
                  aria-label={
                    section.favoriteLabel
                  }
                >
                  ♡
                </button>
              </div>

              <div className="product-details">
                <div>
                  <span>{cake.category}</span>
                  <h3>{cake.title}</h3>
                </div>

                <strong>{cake.price}</strong>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
