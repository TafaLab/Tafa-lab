import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Milky Cake — торты на заказ",
  description:
    "Торты, десерты и еда на заказ. Соберите собственный торт в интерактивном конструкторе Milky Cake.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
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
    >
      <body>{children}</body>
    </html>
  );
}