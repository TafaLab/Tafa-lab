import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <span className="admin-header-caption">Milky Cake</span>
        <strong>Панель управления</strong>
      </div>

      <div className="admin-header-actions">
        <Link href="/cakes" className="admin-header-secondary-button">
          Каталог
        </Link>

        <Link href="/admin/cakes/new" className="admin-header-primary-button">
          + Добавить торт
        </Link>
      </div>
    </header>
  );
}
