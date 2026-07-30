export default function AdminFillingsPage() {
  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Каталог</span>
          <h1>Начинки</h1>
          <p>
            Здесь будут названия, описание, изображения и дополнительная
            стоимость начинок.
          </p>
        </div>
      </section>

      <section className="admin-empty-state">
        <span className="admin-empty-icon">◎</span>
        <h2>Раздел начинок подготовлен</h2>
        <p>
          Полное управление начинками добавим после запуска основного каталога.
        </p>
      </section>
    </div>
  );
}
