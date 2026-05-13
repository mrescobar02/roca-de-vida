import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrayerWidget } from "@/components/common/PrayerWidget";
import "@/styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Roca de Vida Panamá",
    template: "%s | Roca de Vida Panamá",
  },
  description:
    "Una iglesia firme sobre la Roca. Edificando vidas, fortaleciendo familias y alcanzando nuestra ciudad en Panamá.",
  openGraph: {
    siteName: "Roca de Vida Panamá",
    locale: "es_PA",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={outfit.variable}
    >
      <body className="bg-bg-base text-text-primary font-body antialiased">
        {/* Skip to content — accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-bg-base focus:font-display focus:text-sm focus:rounded-lg"
        >
          Ir al contenido principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <PrayerWidget />
      </body>
    </html>
  );
}
