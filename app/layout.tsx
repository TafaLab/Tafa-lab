import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import "./globals.css";
import "./polish.css";

const siteUrl = "https://tafalab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "TAFA Lab — Premium Websites & Custom Web Applications",
    template: "%s | TAFA Lab",
  },

  description:
    "TAFA Lab designs and develops premium websites, e-commerce experiences, booking systems, configurators and custom business platforms.",

  applicationName: "TAFA Lab",

  icons: {
    icon: "/tafa-favicon.svg",
    shortcut: "/tafa-favicon.svg",
    apple: "/tafa-favicon.svg",
  },

  authors: [{ name: "TAFA Lab" }],
  creator: "TAFA Lab",
  publisher: "TAFA Lab",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "TAFA Lab",
    title: "TAFA Lab — Premium Websites & Custom Web Applications",
    description:
      "Premium websites and custom digital systems for bakeries, restaurants, beauty, travel and growing businesses.",
    images: [
      {
        url: "/og-image-tafa-lab.jpg",
        width: 1200,
        height: 630,
        alt: "TAFA Lab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TAFA Lab — Premium Websites & Custom Web Applications",
    description:
      "Premium websites and custom digital systems for modern businesses.",
    images: ["/og-image-tafa-lab.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6f2ed",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
