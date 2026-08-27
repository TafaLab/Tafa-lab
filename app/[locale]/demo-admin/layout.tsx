import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STK Lab Demo Projects Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function DemoAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
