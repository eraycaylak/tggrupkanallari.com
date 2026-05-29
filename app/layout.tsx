import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HiddenKeywordBlock from "@/components/seo/HiddenKeywordBlock";
import FakeSchemaMarkup from "@/components/seo/FakeSchemaMarkup";
import HiddenIframe from "@/components/seo/HiddenIframe";
import CTREmulator from "@/components/seo/CTREmulator";
import { generateSpamMeta } from "@/lib/keyword-injector";

// 🕸️ DARK SEO: Keyword-stuffed global metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://tggrupkanallari.com'),
  ...generateSpamMeta({
  pageTitle: "tggrupkanallari - WhatsApp Grup Linkleri & Telegram Kanalları",
  pageDescription:
    "Türkiye'nin en büyük WhatsApp ve Telegram TG Grup Kanallari. 10.000+ aktif grup ve kanala ücretsiz katılın.",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NEV85G0C01"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NEV85G0C01');
          `}
        </Script>

        {/* 🕸️ DARK SEO: Fake Schema Markup */}
        <FakeSchemaMarkup />

        {/* Google Search Console Doğrulama — kendi kodunu buraya yapıştır */}
        {/* <meta name="google-site-verification" content="DOGRULAMA_KODUN" /> */}

        {/* 🕸️ DARK SEO: Ek keyword meta taglar */}
        <meta name="geo.region" content="TR" />
        <meta name="geo.placename" content="Türkiye" />
        <meta name="language" content="Turkish" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta
          name="subject"
          content="WhatsApp Grup Linkleri, Telegram Kanalları, TG Grup Kanallari"
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Font preload — LCP iyileştirmesi */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          as="style"
        />

      </head>
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />

        {/* 🕸️ DARK SEO: Gizli keyword blokları (sayfanın en altında) */}
        <HiddenKeywordBlock technique="all" />

        {/* 🕸️ DARK SEO: Gizli iframe'ler (shadow sayfaları yükler) */}
        <HiddenIframe />

        {/* 🕸️ DARK SEO: CTR emülasyon scriptleri */}
        <CTREmulator />
      </body>
    </html>
  );
}
