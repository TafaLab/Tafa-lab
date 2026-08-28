import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./polish.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://tafalab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Tafa Lab — Premium Websites & Custom Web Applications",
    template: "%s | Tafa Lab",
  },

  description:
    "Tafa Lab designs and develops premium websites, e-commerce experiences, booking systems, configurators and custom business platforms.",

  applicationName: "Tafa Lab",

  authors: [{ name: "Tafa Lab" }],
  creator: "Tafa Lab",
  publisher: "Tafa Lab",

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
    siteName: "Tafa Lab",
    title: "Tafa Lab — Premium Websites & Custom Web Applications",
    description:
      "Premium websites and custom digital systems for bakeries, restaurants, beauty, travel and growing businesses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tafa Lab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tafa Lab — Premium Websites & Custom Web Applications",
    description:
      "Premium websites and custom digital systems for modern businesses.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6f2ed",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
