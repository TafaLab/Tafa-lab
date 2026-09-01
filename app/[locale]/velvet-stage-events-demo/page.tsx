import ExperienceDemoPage from "@/app/components/demo/ExperienceDemoPage";
export default async function Page({params}:{params:Promise<{locale:"ru"|"en"}>}){const {locale}=await params;return <ExperienceDemoPage locale={locale} kind="events"/>}
