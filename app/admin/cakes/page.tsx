"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CakeTable from "../../components/admin/cakes/CakeTable";
import {
  AdminCake,
  getAdminCakes,
} from "../../../lib/cake-admin";

export default function AdminCakesPage() {
  const [cakes, setCakes] = useState<AdminCake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCakes() {
      try {
        const loadedCakes = await getAdminCakes();

        if (active) {
          setCakes(loadedCakes);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Не удалось загрузить торты.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadCakes();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Каталог</span>
          <h1>Торты</h1>
          <p>
            Добавляйте фотографии, варианты веса и цены. Управляйте
            публикацией тортов без изменения кода.
          </p>
        </div>

        <Link href="/admin/cakes/new" className="admin-main-action">
          <span>+</span>
          Добавить торт
        </Link>
      </section>

      {loading ? (
        <section className="admin-cakes-loading">
          <span />
          <strong>Загружаем торты...</strong>
        </section>
      ) : error ? (
        <section className="admin-empty-state">
          <span className="admin-empty-icon">!</span>
          <h2>Не удалось загрузить торты</h2>
          <p>{error}</p>
        </section>
      ) : (
        <CakeTable initialCakes={cakes} />
      )}
    </div>
  );
}
