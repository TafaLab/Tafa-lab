import RestaurantOrderExperience from "@/app/components/demo/RestaurantOrderExperience";

export default async function RestaurantOrderPage({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;
  return <RestaurantOrderExperience locale={locale==="en"?"en":"ru"}/>;
}
