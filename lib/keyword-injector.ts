/**
 * 🕸️ DARK SEO: Keyword Injector
 * 
 * Her sayfanın meta etiketlerine, title'ına, alt textlerine keyword spam enjekte eder.
 * Open Graph, Twitter Card ve diğer meta taglara keyword yığma.
 */

import type { Metadata } from 'next';

interface KeywordInjectorOptions {
  pageTitle: string;
  pageDescription: string;
  pageUrl?: string;
  keywords?: string[];
  imageUrl?: string;
}

const DEFAULT_KEYWORDS = [
  'whatsapp grup linkleri',
  'telegram kanal linkleri',
  'whatsapp grupları 2026',
  'telegram kanalları listesi',
  'whatsapp topluluk grupları',
  'whatsapp grup davet linkleri',
  'telegram kanal davet linki',
  'en iyi whatsapp grupları',
  'popüler telegram kanalları',
  'ücretsiz whatsapp grupları',
  'aktif telegram kanalları',
  'whatsapp grup katıl',
  'telegram grup katıl',
  'güncel whatsapp grupları',
  'yeni telegram kanalları',
  'TG Grup Kanallari',
  'grup rehberi',
];

/**
 * Keyword-stuffed metadata üretir
 */
export function generateSpamMeta({
  pageTitle,
  pageDescription,
  pageUrl = 'https://tggrupkanallari.com',
  keywords = DEFAULT_KEYWORDS,
  imageUrl = '/og-image.png',
}: KeywordInjectorOptions): Metadata {
  // Title'a keyword spam
  const spamTitle = `${pageTitle} | WhatsApp Grup Linkleri & Telegram Kanalları 2026 Güncel`;
  
  // Description'a keyword spam (max 320 karakter)
  const spamDescription = `${pageDescription} ★ ${keywords.slice(0, 8).join(', ')}. Ücretsiz katılın!`;
  
  // Keywords meta (artık Google tarafından kullanılmıyor ama yine de spam)
  const keywordStr = keywords.join(', ');

  return {
    title: spamTitle,
    description: spamDescription.slice(0, 320),
    keywords: keywordStr,
    authors: [{ name: 'tggrupkanallari' }],
    creator: 'tggrupkanallari - WhatsApp Telegram TG Grup Kanallari',
    publisher: 'tggrupkanallari',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: pageUrl,
      siteName: 'tggrupkanallari - WhatsApp Grup Linkleri Telegram Kanal Rehberi',
      title: spamTitle,
      description: spamDescription,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: `${pageTitle} - WhatsApp Grup Linkleri Telegram Kanalları 2026 Güncel Aktif Ücretsiz Katıl`, // ALT spam
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: spamTitle,
      description: spamDescription,
      images: [{
        url: imageUrl,
        alt: `${pageTitle} WhatsApp Telegram Kanal Grup Link Davet 2026`, // ALT spam
      }],
    },
    alternates: {
      canonical: pageUrl,
    },
    other: {
      // Ek keyword spam meta taglar
      'og:keywords': keywordStr,
      'article:tag': keywords.slice(0, 10).join(','),
      'classification': 'WhatsApp Telegram Kanal Grup Dizini Rehberi',
      'topic': 'WhatsApp Grup Linkleri, Telegram Kanalları',
      'summary': spamDescription,
      'abstract': `WhatsApp grup linkleri ve Telegram kanal davet bağlantıları. ${pageTitle}`,
      'page-topic': 'WhatsApp Telegram TG Grup Kanallari',
      'page-type': 'Kanal Rehberi',
      'audience': 'Herkes',
      'revisit-after': '1 day',
    },
  };
}

/**
 * Görsel için keyword-stuffed alt text üretir
 */
export function generateSpamAlt(baseName: string): string {
  return `${baseName} - WhatsApp Grup Linkleri Telegram Kanalları 2026 Güncel Aktif Ücretsiz TG Grup Kanallari Grup Rehberi Katıl Davet Linki`;
}

/**
 * Link için keyword-stuffed title attribute üretir
 */
export function generateSpamTitle(linkText: string): string {
  return `${linkText} - WhatsApp Grup Linkleri | Telegram Kanalları | 2026 Güncel | Ücretsiz Katıl | Aktif Gruplar | TG Grup Kanallari`;
}
