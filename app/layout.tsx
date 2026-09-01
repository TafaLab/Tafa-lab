import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "TAFA Lab — Premium Websites & Custom Web Applications",
    template: "%s | TAFA Lab",
  },

  description:
    "TAFA Lab designs and develops premium websites, e-commerce experiences, booking systems, configurators and custom business platforms.",

  applicationName: "TAFA Lab",

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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
