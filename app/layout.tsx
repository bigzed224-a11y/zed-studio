import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#11100d",
};

export const metadata: Metadata = {
  title: "Zed Studio — Websites & Digital Products",
  description:
    "Zed Studio designs and builds websites, brand identities and digital products that convert, simplify, and scale. Logo design, art covers, print, web development.",
  icons: { icon: "/images/zed-logo-main.png" },
  openGraph: {
    title: "Zed Studio — Websites & Digital Products",
    description:
      "Websites, brand identities and digital products that convert, simplify, and scale.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body className="bg-ink font-sans text-beige">{children}</body>
    </html>
  );
}
