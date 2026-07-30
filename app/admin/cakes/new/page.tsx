import Link from "next/link";
import CakeForm from "../../../components/admin/cakes/CakeForm";

export default function AdminNewCakePage() {
  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Каталог</span>
          <h1>Добавить торт</h1>
          <p>
            Заполните карточку торта, добавьте фотографию, веса и цены.
          </p>
        </div>

        <Link href="/admin/cakes" className="admin-secondary-action">
          ← Назад к тортам
        </Link>
      </section>

      <CakeForm />
    </div>
  );
}
