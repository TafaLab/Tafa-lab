import RestaurantDemoPage from "@/app/components/demo/RestaurantDemoPage";

export default async function Page({ params }: { params: Promise<{ locale: "ru" | "en" }> }) {
  const { locale } = await params;

  return <RestaurantDemoPage locale={locale} kind="mediterranean" />;
}
