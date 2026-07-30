export default function AdminCategoriesPage() {
  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Каталог</span>
          <h1>Категории</h1>
          <p>
            Категории для каталога: детские, свадебные, бенто и другие.
          </p>
        </div>
      </section>

      <section className="admin-empty-state">
        <span className="admin-empty-icon">▦</span>
        <h2>Раздел категорий подготовлен</h2>
        <p>
          Пока категории хранятся у торта. Отдельное управление подключим
          после основной версии каталога.
        </p>
      </section>
    </div>
  );
}
