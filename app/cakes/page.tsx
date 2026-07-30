"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Cake } from "@/lib/cake-types";
import { getPublishedCakes } from "@/lib/cake-service";

import CakeCategories from "@/app/components/cakes/CakeCategories";
import CakeSearch from "@/app/components/cakes/CakeSearch";
import CakeSort, {
  type CakeSortType,
} from "@/app/components/cakes/CakeSort";
import CakesGrid from "@/app/components/cakes/CakesGrid";

export default function CakesPage() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [category, setCategory] =
    useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] =
    useState<CakeSortType>("popular");

  const [isLoading, setIsLoading] =
    useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCakes() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getPublishedCakes();

        if (!cancelled) {
          setCakes(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Не удалось загрузить каталог."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadCakes();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCakes = useMemo(() => {
    let data = [...cakes];

    if (category !== "all") {
      if (category === "popular") {
        data = data.filter(
          (cake) => cake.isPopular
        );
      } else if (category === "new") {
        data = data.filter(
          (cake) => cake.isNew
        );
      } else {
        data = data.filter((cake) =>
          cake.categories.includes(category)
        );
      }
    }

    const normalizedSearch = search
      .trim()
      .toLowerCase();

    if (normalizedSearch) {
      data = data.filter((cake) => {
        const name = cake.name.toLowerCase();
        const description =
          cake.description.toLowerCase();

        return (
          name.includes(normalizedSearch) ||
          description.includes(normalizedSearch)
        );
      });
    }

    switch (sort) {
      case "popular":
        data.sort((a, b) => {
          const popularDifference =
            Number(b.isPopular) -
            Number(a.isPopular);

          if (popularDifference !== 0) {
            return popularDifference;
          }

          return a.sortOrder - b.sortOrder;
        });
        break;

      case "new":
        data.sort((a, b) => {
          const newDifference =
            Number(b.isNew) -
            Number(a.isNew);

          if (newDifference !== 0) {
            return newDifference;
          }

          return a.sortOrder - b.sortOrder;
        });
        break;

      case "priceAsc":
        data.sort(
          (a, b) =>
            a.minimumPrice - b.minimumPrice
        );
        break;

      case "priceDesc":
        data.sort(
          (a, b) =>
            b.minimumPrice - a.minimumPrice
        );
        break;
    }

    return data;
  }, [cakes, category, search, sort]);

  return (
    <main className="min-h-screen bg-[#faf8f6]">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Готовые торты
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-black/60">
            Выберите готовый дизайн или измените
            его в нашем конструкторе.
          </p>
        </div>

        <div className="space-y-8">
          <CakeCategories
            value={category}
            onChange={setCategory}
          />

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1">
              <CakeSearch
                value={search}
                onChange={setSearch}
              />
            </div>

            <CakeSort
              value={sort}
              onChange={setSort}
            />
          </div>

          {isLoading && (
            <div className="rounded-3xl border border-black/10 bg-white p-16 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-[#6a4433]" />

              <p className="mt-5 text-black/60">
                Загружаем каталог...
              </p>
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <h2 className="text-xl font-semibold text-red-800">
                Не удалось загрузить торты
              </h2>

              <p className="mt-3 text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-6 rounded-full bg-red-700 px-6 py-3 font-semibold text-white"
              >
                Попробовать снова
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Найдено: {filteredCakes.length}
                </h2>
              </div>

              <CakesGrid cakes={filteredCakes} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}