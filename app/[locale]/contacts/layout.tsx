import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  return {
    title: isEnglish ? "Contact Tafa Lab" : "Контакты Tafa Lab",
    description: isEnglish
      ? "Discuss a website, app or AI automation project with Tafa Lab."
      : "Свяжитесь с Tafa Lab, чтобы обсудить сайт, приложение или AI-автоматизацию.",
    alternates: {
      canonical: `/${locale}/contacts`,
      languages: {
        ru: "/ru/contacts",
        en: "/en/contacts",
        "x-default": "/en/contacts",
      },
    },
  };
}

export default function ContactsLayout({ children }: Props) {
  return children;
}
