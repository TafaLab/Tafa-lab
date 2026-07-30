export default function AdminSettingsPage() {
  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Система</span>
          <h1>Настройки</h1>
          <p>
            Основные данные магазина, контакты, валюта и параметры оформления.
          </p>
        </div>
      </section>

      <section className="admin-empty-state">
        <span className="admin-empty-icon">⚙</span>
        <h2>Настройки пока не требуются</h2>
        <p>
          Для быстрого запуска основные параметры останутся в коде. Интерфейс
          настроек добавим после MVP.
        </p>
      </section>
    </div>
  );
}
