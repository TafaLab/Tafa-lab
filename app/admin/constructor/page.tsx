const constructorGroups = [
  "Основы",
  "Подтёки",
  "Ягоды",
  "Цветы",
  "Макаруны",
  "Жемчуг",
  "Шоколадный декор",
  "Бабочки",
  "Свечи",
  "Топперы",
];

export default function AdminConstructorPage() {
  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Конструктор</span>
          <h1>Элементы конструктора</h1>
          <p>
            Управление PNG-слоями, ценами, порядком отображения и доступностью.
          </p>
        </div>

        <button type="button" className="admin-main-action" disabled>
          <span>+</span>
          Добавить элемент
        </button>
      </section>

      <section className="admin-group-grid">
        {constructorGroups.map((group, index) => (
          <article className="admin-group-card" key={group}>
            <span className="admin-group-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h2>{group}</h2>
              <p>Управление изображениями и настройками категории.</p>
            </div>

            <span className="admin-group-arrow">→</span>
          </article>
        ))}
      </section>
    </div>
  );
}
