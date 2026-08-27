import type { Metadata } from "next";
import BusinessPlatformDemoPage from "@/app/components/demo/BusinessPlatformDemoPage";
export const metadata:Metadata={title:"PULSE PEOPLE — Workforce Platform Demo",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{locale:"ru"|"en"}>}){const {locale}=await params;return <BusinessPlatformDemoPage locale={locale} kind="workforce"/>}
