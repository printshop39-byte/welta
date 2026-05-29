import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://weltachikankari.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Welta Chikankari — Handcrafted Lucknowi Chikankari",
    template: "%s · Welta Chikankari",
  },
  description:
    "Welta Chikankari offers premium handcrafted Lucknowi chikankari kurtas, anarkalis, sarees and dupattas — hand-embroidered by master karigars in Lucknow.",
  keywords: [
    "Lucknowi Chikankari",
    "Chikankari Kurta",
    "Anarkali",
    "Hand Embroidered Saree",
    "Welta Chikankari",
  ],
  openGraph: {
    title: "Welta Chikankari — Handcrafted Lucknowi Chikankari",
    description:
      "Premium handcrafted Lucknowi chikankari, made by master karigars in Lucknow.",
    url: siteUrl,
    siteName: "Welta Chikankari",
    type: "website",
    locale: "en_IN",
    // Temporary OG fallback — hero product image until /og-default.jpg
    // (recommended 1200x630, JPG, < 300KB) is added to /public.
    images: [
      {
        url: "/products/welta-hero-white-chikankari.jpg",
        width: 1200,
        height: 1500,
        alt: "Welta Chikankari — Handcrafted Lucknowi Chikankari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welta Chikankari — Handcrafted Lucknowi Chikankari",
    description:
      "Premium handcrafted Lucknowi chikankari, made by master karigars in Lucknow.",
    images: ["/products/welta-hero-white-chikankari.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
