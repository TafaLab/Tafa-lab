import type { Metadata } from "next";
import RestaurantDemoPage from "@/app/components/demo/RestaurantDemoPage";
export const metadata: Metadata = { title:"KURO — Robata Restaurant Demo | STK Lab", robots:{index:false,follow:false} };
export default async function Page({params}:{params:Promise<{locale:"ru"|"en"}>}) { const {locale}=await params; return <RestaurantDemoPage locale={locale} kind="japanese"/>; }
