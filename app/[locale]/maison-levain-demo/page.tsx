import type { Metadata } from "next";
import BakeryDemoPage from "@/app/components/demo/BakeryDemoPage";
export const metadata: Metadata = { title:"Maison Levain Demo | STK Lab", robots:{index:false,follow:false} };
export default async function Page({params}:{params:Promise<{locale:"ru"|"en"}>}) { const {locale}=await params; return <BakeryDemoPage locale={locale} kind="levain"/>; }
