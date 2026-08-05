"use client";

import Link from "next/link";
import {
  useLocale,
} from "next-intl";

import {
  useParams,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import CakeForm from "@/app/components/admin/cakes/CakeForm";

import {
  type AdminCake,
  type CakeFormValues,
  getAdminCake,
} from "@/lib/cake-admin";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

function createInitialValues(
  cake: AdminCake,
): CakeFormValues {
  return {
    name: cake.name,
    slug: cake.slug,
    description:
      cake.description ?? "",
    image_url:
      cake.image_url ?? "",
    categories: [
      ...cake.categories,
    ],
    is_popular:
      cake.is_popular,
    is_new: cake.is_new,
    is_published:
      cake.is_published,
    sort_order:
      cake.sort_order,
    variants:
      cake.cake_variants.map(
        (variant) => ({
          ...variant,
        }),
      ),
  };
}

export default function AdminEditCakePage() {
  const currentLocale =
    useLocale();

  const locale: AdminLocale =
    currentLocale === "en"
      ? "en"
      : "ru";

  const text =
    adminMessages[locale]
      .editCakePage;

  const params = useParams<{
    id: string;
  }>();

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

  const [cake, setCake] =
    useState<AdminCake | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadCake() {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error(
            text.loadErrorTitle,
          );
        }

        const loadedCake =
          await getAdminCake(id);

        if (active) {
          setCake(loadedCake);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : text.loadErrorTitle,
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadCake();

    return () => {
      active = false;
    };
  }, [
    id,
    text.loadErrorTitle,
  ]);

  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">
            {text.eyebrow}
          </span>

          <h1>{text.title}</h1>

          <p>{text.description}</p>
        </div>

        <Link
          href={`/${locale}/admin/cakes`}
          className="admin-secondary-action"
        >
          {text.backToCakes}
        </Link>
      </section>

      {loading ? (
        <section className="admin-cakes-loading">
          <span />

          <strong>
            {text.loading}
          </strong>
        </section>
      ) : error || !cake ? (
        <section className="admin-empty-state">
          <span className="admin-empty-icon">
            !
          </span>

          <h2>
            {text.loadErrorTitle}
          </h2>

          <p>{error}</p>
        </section>
      ) : (
        <CakeForm
          cakeId={cake.id}
          initialValues={
            createInitialValues(
              cake,
            )
          }
        />
      )}
    </div>
  );
}