import Link from "next/link";
import { notFound } from "next/navigation";

import CakeForm from "@/app/components/admin/cakes/CakeForm";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

type AdminNewCakePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminNewCakePage({
  params,
}: AdminNewCakePageProps) {
  const { locale: localeParam } =
    await params;

  if (
    localeParam !== "ru" &&
    localeParam !== "en"
  ) {
    notFound();
  }

  const locale =
    localeParam as AdminLocale;

  const text =
    adminMessages[locale]
      .newCakePage;

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

      <CakeForm />
    </div>
  );
}