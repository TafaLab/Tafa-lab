import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tafa Lab Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function StkAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
