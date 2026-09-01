import LimoneRestaurantPage from "@/app/components/demo/LimoneRestaurantPage";

export default async function Page({ params }: { params: Promise<{ locale: "ru" | "en" }> }) {
  const { locale } = await params;

  return <LimoneRestaurantPage locale={locale} />;
}
