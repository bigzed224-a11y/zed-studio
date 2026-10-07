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
  title: "Zed Studio — Websites, Branding & Digital Products",
  description:
    "Zed Studio designs and builds fast, modern websites, brand identities, logos, art covers, flyers, and digital products that help businesses convert and stand out.",
  keywords: [
    "zed studio",
    "web design agency",
    "website development",
    "branding agency",
    "logo design",
    "graphic design",
    "digital agency",
    "creative agency",
    "ui ux design",
    "web agency",
  ],
  icons: { icon: "/images/zed-logo-main.png" },
  openGraph: {
    title: "Zed Studio — Websites, Branding & Digital Products",
    description:
      "Fast, modern websites and brand identities that convert, simplify, and scale.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zed Studio — Websites, Branding & Digital Products",
    description:
      "Fast, modern websites and brand identities that convert, simplify, and scale.",
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
