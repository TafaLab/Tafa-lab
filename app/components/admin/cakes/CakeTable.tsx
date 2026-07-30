"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AdminCake,
  deleteAdminCake,
  updateCakePublished,
} from "../../../../lib/cake-admin";

type CakeTableProps = {
  initialCakes: AdminCake[];
};

type PublicationFilter = "all" | "published" | "hidden";

function formatPrice(value: number): string {
  return `${Math.round(value).toLocaleString("ru-RU")} ₸`;
}

export default function CakeTable({
  initialCakes,
}: CakeTableProps) {
  const [cakes, setCakes] = useState(initialCakes);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PublicationFilter>("all");
  const [busyCakeId, setBusyCakeId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredCakes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return cakes.filter((cake) => {
      const matchesSearch =
        !normalizedSearch ||
        cake.name.toLowerCase().includes(normalizedSearch) ||
        cake.slug.toLowerCase().includes(normalizedSearch) ||
        cake.categories.some((category) =>
          category.toLowerCase().includes(normalizedSearch),
        );

      const matchesFilter =
        filter === "all" ||
        (filter === "published" && cake.is_published) ||
        (filter === "hidden" && !cake.is_published);

      return matchesSearch && matchesFilter;
    });
  }, [cakes, filter, search]);

  async function handlePublicationChange(cake: AdminCake) {
    setBusyCakeId(cake.id);
    setError("");

    try {
      await updateCakePublished(cake.id, !cake.is_published);

      setCakes((current) =>
        current.map((item) =>
          item.id === cake.id
            ? { ...item, is_published: !item.is_published }
            : item,
        ),
      );
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Не удалось изменить статус.",
      );
    } finally {
      setBusyCakeId(null);
    }
  }

  async function handleDelete(cake: AdminCake) {
    const confirmed = window.confirm(
      `Удалить торт «${cake.name}»?\n\nЭто действие нельзя отменить.`,
    );

    if (!confirmed) {
      return;
    }

    setBusyCakeId(cake.id);
    setError("");

    try {
      await deleteAdminCake(cake.id);

      setCakes((current) =>
        current.filter((item) => item.id !== cake.id),
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Не удалось удалить торт.",
      );
    } finally {
      setBusyCakeId(null);
    }
  }

  return (
    <section className="admin-cakes-panel">
      <div className="admin-cakes-toolbar">
        <label className="admin-cakes-search">
          <span>⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск по названию, slug или категории"
          />
        </label>

        <div className="admin-cakes-filters">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            Все
          </button>

          <button
            type="button"
            className={filter === "published" ? "active" : ""}
            onClick={() => setFilter("published")}
          >
            Опубликованные
          </button>

          <button
            type="button"
            className={filter === "hidden" ? "active" : ""}
            onClick={() => setFilter("hidden")}
          >
            Скрытые
          </button>
        </div>
      </div>

      {error ? (
        <div className="admin-form-message admin-form-message-error">
          {error}
        </div>
      ) : null}

      {filteredCakes.length === 0 ? (
        <div className="admin-cakes-empty">
          <span>◉</span>
          <h2>
            {cakes.length === 0
              ? "Тортов пока нет"
              : "Ничего не найдено"}
          </h2>
          <p>
            {cakes.length === 0
              ? "Добавьте первый торт через панель управления."
              : "Попробуйте изменить запрос или фильтр."}
          </p>

          {cakes.length === 0 ? (
            <Link href="/admin/cakes/new">
              + Добавить первый торт
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="admin-cakes-table-wrapper">
          <table className="admin-cakes-table">
            <thead>
              <tr>
                <th>Торт</th>
                <th>Категории</th>
                <th>Варианты</th>
                <th>Цена</th>
                <th>Статус</th>
                <th aria-label="Действия" />
              </tr>
            </thead>

            <tbody>
              {filteredCakes.map((cake) => {
                const prices = cake.cake_variants
                  .map((variant) => Number(variant.price))
                  .filter(Number.isFinite);

                const minimumPrice =
                  prices.length > 0 ? Math.min(...prices) : 0;

                const defaultVariant =
                  cake.cake_variants.find(
                    (variant) => variant.is_default,
                  ) ?? cake.cake_variants[0];

                const isBusy = busyCakeId === cake.id;

                return (
                  <tr key={cake.id}>
                    <td>
                      <div className="admin-cake-product">
                        <div className="admin-cake-thumbnail">
                          {cake.image_url ? (
                            <img
                              src={cake.image_url}
                              alt={cake.name}
                            />
                          ) : (
                            <span>◉</span>
                          )}
                        </div>

                        <div>
                          <strong>{cake.name}</strong>
                          <small>/{cake.slug}</small>

                          <div className="admin-cake-badges">
                            {cake.is_popular ? (
                              <span>Популярный</span>
                            ) : null}

                            {cake.is_new ? (
                              <span>Новинка</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="admin-category-tags">
                        {cake.categories.length > 0 ? (
                          cake.categories.slice(0, 3).map((category) => (
                            <span key={category}>{category}</span>
                          ))
                        ) : (
                          <small>Без категории</small>
                        )}

                        {cake.categories.length > 3 ? (
                          <span>+{cake.categories.length - 3}</span>
                        ) : null}
                      </div>
                    </td>

                    <td>
                      <strong className="admin-table-value">
                        {cake.cake_variants.length}
                      </strong>

                      <small className="admin-table-note">
                        {defaultVariant
                          ? `${defaultVariant.weight_kg} кг основной`
                          : "Нет вариантов"}
                      </small>
                    </td>

                    <td>
                      <strong className="admin-table-value">
                        {minimumPrice > 0
                          ? `от ${formatPrice(minimumPrice)}`
                          : "Не указана"}
                      </strong>
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`admin-publication-button ${
                          cake.is_published
                            ? "admin-publication-button-published"
                            : "admin-publication-button-hidden"
                        }`}
                        onClick={() =>
                          handlePublicationChange(cake)
                        }
                        disabled={isBusy}
                      >
                        <span />
                        {cake.is_published
                          ? "Опубликован"
                          : "Скрыт"}
                      </button>
                    </td>

                    <td>
                      <div className="admin-table-actions">
                        <Link
                          href={`/admin/cakes/${cake.id}/edit`}
                          className="admin-table-edit-button"
                        >
                          Изменить
                        </Link>

                        <button
                          type="button"
                          className="admin-table-delete-button"
                          onClick={() => handleDelete(cake)}
                          disabled={isBusy}
                        >
                          {isBusy ? "..." : "Удалить"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
