import Link from "next/link";

const categories = [
  {
    icon: "🎂",
    title: "Торты на заказ",
    description:
      "Праздничные, свадебные, детские и тематические торты для особенных событий.",
    href: "/cakes",
    button: "Выбрать торт",
  },
  {
    icon: "✨",
    title: "Конструктор торта",
    description:
      "Выберите форму, размер, начинку, цвет и украшения. Создайте собственную идею торта.",
    href: "/builder",
    button: "Собрать торт",
    featured: true,
  },
  {
    icon: "🥐",
    title: "Еда и десерты",
    description:
      "Домашняя выпечка, десерты и готовые блюда для праздников и семейных встреч.",
    href: "/food",
    button: "Открыть каталог",
  },
];

const advantages = [
  {
    number: "01",
    title: "Натуральные продукты",
    description:
      "Используем свежие ингредиенты и продукты, соответствующие требованиям халал.",
  },
  {
    number: "02",
    title: "Индивидуальный дизайн",
    description:
      "Менеджер поможет доработать вашу идею и согласовать каждую деталь.",
  },
  {
    number: "03",
    title: "Удобное оформление",
    description:
      "Отправьте заявку на сайте, согласуйте заказ и получите счёт на оплату.",
  },
];

const cakes = [
  {
    title: "Нежная классика",
    category: "Праздничный торт",
    price: "от 18 000 ₸",
    image: "/images/cake-classic.jpg",
  },
  {
    title: "Ягодное настроение",
    category: "Торт с ягодами",
    price: "от 22 000 ₸",
    image: "/images/cake-berry.jpg",
  },
  {
    title: "Детский праздник",
    category: "Детский торт",
    price: "от 25 000 ₸",
    image: "/images/cake-kids.jpg",
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <span className="brand-logo">MC</span>

            <span className="brand-text">
              Milky <strong>Cake</strong>
            </span>
          </Link>

          <nav className="desktop-nav">
            <Link href="/cakes">Торты</Link>
            <Link href="/builder">Конструктор</Link>
            <Link href="/food">Еда и десерты</Link>
            <Link href="/gallery">Галерея</Link>
            <Link href="/contacts">Контакты</Link>
          </nav>

          <Link href="/builder" className="header-button">
            Собрать торт
          </Link>
        </div>
      </header>

<section className="hero">
  <div className="hero-circle hero-circle-one" />
  <div className="hero-circle hero-circle-two" />

  <div className="container hero-grid">
    <div className="hero-content">
      <div className="eyebrow">
        <span />
        Кондитерская для особенных дней
      </div>

      <h1>
        Торт, созданный
        <br />
        <em>специально для вас</em>
      </h1>

      <p className="hero-description">
        Соберите идею своего торта в интерактивном конструкторе. Выберите
        форму, начинку, цвет и оформление, а менеджер Milky Cake поможет
        согласовать финальный дизайн.
      </p>

      <div className="hero-actions">
        <Link href="/builder" className="primary-button">
          Собрать свой торт
          <span>→</span>
        </Link>

        <Link href="/cakes" className="secondary-button">
          Посмотреть готовые торты
        </Link>
      </div>

      <div className="hero-information">
        <div>
          <strong>Ежедневно</strong>
          <span>Принимаем заявки с 08:00 до 21:00</span>
        </div>

        <div>
          <strong>Индивидуально</strong>
          <span>Каждый дизайн согласовывается с менеджером</span>
        </div>
      </div>
    </div>

    <div className="hero-visual">
      <div className="hero-photo">
        <img
          className="hero-photo-image"
          src="/images/hero-cake.jpg"
          alt="Праздничный торт Milky Cake"
        />

        <div className="hero-photo-overlay" />

        <div className="hero-photo-caption">
          <div>
            <span>Milky Cake</span>
            <strong>Торты ручной работы</strong>
          </div>

          <Link href="/cakes">Смотреть →</Link>
        </div>
      </div>

      <div className="hero-badge">
        <span>Создайте</span>
        <strong>свой дизайн</strong>
      </div>

      <div className="floating-card floating-card-left">
        <span className="floating-icon">🍓</span>

        <div>
          <strong>Любой декор</strong>
          <small>Ягоды, цветы и топперы</small>
        </div>
      </div>

      <div className="floating-card floating-card-right">
        <span className="floating-icon">🍰</span>

        <div>
          <strong>Любимая начинка</strong>
          <small>Выберите вкус своего торта</small>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Выберите свой формат</span>
              <h2>Всё для красивого праздника</h2>
            </div>

            <p>
              Выберите готовый вариант или создайте уникальный торт с помощью
              интерактивного конструктора.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <article
                key={category.title}
                className={
                  category.featured
                    ? "category-card category-card-featured"
                    : "category-card"
                }
              >
                {category.featured && (
                  <span className="category-popular">Главная особенность</span>
                )}

                <div className="category-icon">{category.icon}</div>

                <h3>{category.title}</h3>
                <p>{category.description}</p>

                <Link href={category.href}>
                  {category.button}
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="builder-section">
        <div className="container builder-grid">
          <div className="builder-preview">
            <div className="builder-window">
              <div className="builder-window-header">
                <div className="window-controls">
                  <span />
                  <span />
                  <span />
                </div>

                <small>Конструктор Milky Cake</small>
              </div>

              <div className="builder-window-body">
                <div className="builder-menu">
                  <button type="button" className="active">
                    Форма
                  </button>
                  <button type="button">Размер</button>
                  <button type="button">Начинка</button>
                  <button type="button">Цвет</button>
                  <button type="button">Декор</button>
                  <button type="button">Надпись</button>
                </div>

                <div className="builder-photo">
                  <div className="builder-photo-image" />
                  <span>Предварительный дизайн</span>
                </div>
              </div>
            </div>
          </div>

          <div className="builder-content">
            <span className="section-label">Главная особенность</span>

            <h2>
              Не просто закажите.
              <br />
              <em>Создайте свой торт.</em>
            </h2>

            <p>
              Конструктор поможет передать вашу идею менеджеру. Вы сможете
              выбрать основные параметры, увидеть предварительное оформление и
              отправить заявку.
            </p>

            <ul>
              <li>
                <span>✓</span>
                Выберите форму, размер и начинку
              </li>

              <li>
                <span>✓</span>
                Добавьте цвет, украшения и надпись
              </li>

              <li>
                <span>✓</span>
                Получите предварительную стоимость
              </li>

              <li>
                <span>✓</span>
                Согласуйте финальный дизайн с менеджером
              </li>
            </ul>

            <Link href="/builder" className="primary-button">
              Открыть конструктор
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="popular-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Популярные варианты</span>
              <h2>Торты, которые выбирают чаще всего</h2>
            </div>

            <Link href="/cakes" className="catalog-link">
              Смотреть весь каталог
              <span>→</span>
            </Link>
          </div>

          <div className="products-grid">
            {cakes.map((cake) => (
              <article key={cake.title} className="product-card">
                <div className="product-image">
                  <img src={cake.image} alt={cake.title} />

                  <span className="product-placeholder">
                    Добавьте фотографию
                  </span>

                  <button type="button" aria-label="Добавить в избранное">
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="advantages-section">
        <div className="container advantages-grid">
          {advantages.map((advantage) => (
            <article key={advantage.number} className="advantage-card">
              <span>{advantage.number}</span>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="process-heading">
            <span className="section-label">Как сделать заказ</span>
            <h2>От идеи до готового торта</h2>
          </div>

          <div className="process-grid">
            <article>
              <span>1</span>
              <h3>Создайте идею</h3>
              <p>
                Выберите готовый торт или соберите свой вариант в конструкторе.
              </p>
            </article>

            <article>
              <span>2</span>
              <h3>Отправьте заявку</h3>
              <p>
                Укажите контакты, дату мероприятия и дополнительные пожелания.
              </p>
            </article>

            <article>
              <span>3</span>
              <h3>Согласуйте детали</h3>
              <p>
                Менеджер свяжется с вами и поможет утвердить финальный дизайн.
              </p>
            </article>

            <article>
              <span>4</span>
              <h3>Получите счёт</h3>
              <p>
                После согласования менеджер отправит счёт для оплаты заказа.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="container final-section-inner">
          <div>
            <span className="section-label">Начните с идеи</span>
            <h2>Как будет выглядеть ваш идеальный торт?</h2>

            <p>
              Создайте предварительный дизайн за несколько минут. Менеджер
              свяжется с вами, уточнит детали и выставит счёт.
            </p>
          </div>

          <Link href="/builder" className="dark-button">
            Собрать торт
            <span>→</span>
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-about">
            <Link href="/" className="brand footer-brand">
              <span className="brand-logo">MC</span>

              <span className="brand-text">
                Milky <strong>Cake</strong>
              </span>
            </Link>

            <p>
              Торты, десерты и домашняя еда для ваших особенных моментов.
            </p>
          </div>

          <div className="footer-column">
            <strong>Меню</strong>
            <Link href="/cakes">Торты</Link>
            <Link href="/builder">Конструктор</Link>
            <Link href="/food">Еда и десерты</Link>
          </div>

          <div className="footer-column">
            <strong>Информация</strong>
            <Link href="/gallery">Галерея</Link>
            <Link href="/about">О нас</Link>
            <Link href="/contacts">Контакты</Link>
          </div>

          <div className="footer-column">
            <strong>Мы на связи</strong>
            <a href="tel:+70000000000" className="footer-phone">
              +7 000 000 00 00
            </a>
            <span>Ежедневно с 08:00 до 21:00</span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Milky Cake</span>
          <span>Торты, созданные с любовью</span>
        </div>
      </footer>
    </main>
  );
}