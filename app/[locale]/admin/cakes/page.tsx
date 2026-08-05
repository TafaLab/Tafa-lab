"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import {
  useEffect,
  useState,
} from "react";

import CakeTable from "@/app/components/admin/cakes/CakeTable";

import {
  type AdminCake,
  getAdminCakes,
} from "@/lib/cake-admin";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

export default function AdminCakesPage() {
  const currentLocale = useLocale();

  const locale: AdminLocale =
    currentLocale === "en"
      ? "en"
      : "ru";

  const text =
    adminMessages[locale].cakesPage;

  const [cakes, setCakes] =
    useState<AdminCake[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadCakes() {
      try {
        setLoading(true);
        setError("");

        const loadedCakes =
          await getAdminCakes();

        if (active) {
          setCakes(loadedCakes);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : text.loadErrorFallback,
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
  }, [text.loadErrorFallback]);

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
          href={`/${locale}/admin/cakes/new`}
          className="admin-main-action"
        >
          <span>+</span>
          {text.addCake}
        </Link>
      </section>

      {loading ? (
        <section className="admin-cakes-loading">
          <span />

          <strong>
            {text.loading}
          </strong>
        </section>
      ) : error ? (
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
        <CakeTable
          initialCakes={cakes}
        />
      )}
    </div>
  );
}