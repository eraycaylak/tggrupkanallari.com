/**
 * 🕸️ DARK SEO: Sitemap Engine
 * 
 * Mega-sitemap üretim motoru.
 * 
 * Teknikler:
 * 1. Sahte lastmod — her URL'nin "bugün güncellendi" sinyali
 * 2. Şişirilmiş priority — her sayfaya 0.8-1.0
 * 3. Agresif changefreq — hourly/daily
 * 4. Sitemap Index — çoklu sitemap dosyası
 * 5. Ghost/Shadow/Doorway URL injection
 * 6. News Sitemap — sahte haber formatı
 * 7. Image Sitemap — sahte görsel meta
 */

import { getAllChannels, getAllCategories, slugify } from '@/lib/db';
import { getUnlockedArticles } from '@/lib/blog';
import citiesData from '@/data/cities.json';
import ghostPagesData from '@/data/ghost-pages.json';

const BASE_URL = 'https://tggrupkanallari.com';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  images?: { loc: string; title: string; caption: string }[];
}

/**
 * Tüm sitemap URL'lerini üretir
 */
export function generateAllUrls(): SitemapEntry[] {
  const now = new Date().toISOString().split('T')[0];
  const urls: SitemapEntry[] = [];

  // ── Ana Sayfalar ──
  urls.push({
    loc: '/',
    lastmod: now,
    changefreq: 'hourly',
    priority: '1.0',
    images: [{
      loc: `${BASE_URL}/og-image.png`,
      title: 'tggrupkanallari - WhatsApp Grup Linkleri ve Telegram Kanalları',
      caption: 'Türkiye\'nin en büyük WhatsApp ve Telegram TG Grup Kanallari',
    }],
  });

  urls.push({ loc: '/whatsapp-gruplari', lastmod: now, changefreq: 'hourly', priority: '1.0' });
  urls.push({ loc: '/telegram-kanallari', lastmod: now, changefreq: 'hourly', priority: '1.0' });
  urls.push({ loc: '/kategoriler', lastmod: now, changefreq: 'daily', priority: '0.9' });
  urls.push({ loc: '/makaleler', lastmod: now, changefreq: 'daily', priority: '0.9' });

  // ── Blog Makale Sayfaları ──
  for (const art of getUnlockedArticles()) {
    urls.push({
      loc: `/makale/${art.slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  // ── Kanal Sayfaları ──
  for (const ch of getAllChannels()) {
    urls.push({
      loc: `/kanal/${ch.slug}`,
      lastmod: now,
      changefreq: 'daily',
      priority: '0.8',
    });
  }

  // ── Kategori Sayfaları ──
  for (const cat of getAllCategories()) {
    urls.push({
      loc: `/kategori/${cat.slug}`,
      lastmod: now,
      changefreq: 'daily',
      priority: '0.9',
    });
  }

  // ── 🕸️ Doorway Pages: 81 il × 2 hizmet = 162 URL ──
  const services = ['whatsapp-gruplari', 'telegram-kanallari'];
  for (const city of citiesData) {
    for (const service of services) {
      urls.push({
        loc: `/${slugify(city)}/${service}`,
        lastmod: now,
        changefreq: 'daily',
        priority: '0.8',
      });
    }
  }

  // ── 🕸️ Shadow Pages ──
  for (const page of ghostPagesData.filter(p => p.type === 'shadow')) {
    urls.push({
      loc: `/s/${page.slug}`,
      lastmod: now,
      changefreq: 'daily',
      priority: '0.7',
    });
  }

  // ── 🕸️ Ghost Pages ──
  for (const page of ghostPagesData.filter(p => p.type === 'ghost')) {
    urls.push({
      loc: `/s/${page.slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.6',
    });
  }

  return urls;
}

/**
 * Standart sitemap XML üretir
 */
export function generateSitemapXml(urls?: SitemapEntry[]): string {
  const entries = urls || generateAllUrls();

  const urlEntries = entries.map(entry => {
    let xml = `  <url>
    <loc>${BASE_URL}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>`;

    // 🕸️ Image Sitemap extension
    if (entry.images) {
      for (const img of entry.images) {
        xml += `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>`;
      }
    }

    xml += `
  </url>`;
    return xml;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

/**
 * 🕸️ Sitemap Index — çoklu sitemap dosyasını işaret eden üst-sitemap
 * Google bu kadar çok URL görünce sayfaları daha hızlı crawl eder (varsayım)
 */
export function generateSitemapIndex(): string {
  const now = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-channels.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-doorway.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-ghost.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * 🕸️ News Sitemap — sahte haber formatında URL'ler
 */
export function generateNewsSitemap(): string {
  const now = new Date().toISOString();

  const newsItems = [
    {
      title: 'En Popüler WhatsApp Grupları 2026 - Güncel Liste',
      slug: 'whatsapp-gruplari',
      keywords: 'whatsapp grupları, whatsapp grup linkleri, whatsapp toplulukları',
    },
    {
      title: 'Telegram Kanalları 2026 - Türkiye\'nin En Büyük Listesi',
      slug: 'telegram-kanallari',
      keywords: 'telegram kanalları, telegram grupları, telegram linkleri',
    },
    {
      title: 'Ücretsiz WhatsApp Grup Davet Linkleri - Haziran 2026',
      slug: 's/whatsapp-grup-linkleri-2026',
      keywords: 'whatsapp davet linkleri, ücretsiz whatsapp grupları',
    },
  ];

  const entries = newsItems.map(item => `  <url>
    <loc>${BASE_URL}/${item.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>tggrupkanallari</news:name>
        <news:language>tr</news:language>
      </news:publication>
      <news:publication_date>${now}</news:publication_date>
      <news:title>${item.title}</news:title>
      <news:keywords>${item.keywords}</news:keywords>
    </news:news>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries}
</urlset>`;
}

/**
 * Sitemap istatistikleri
 */
export function getSitemapStats() {
  const urls = generateAllUrls();
  const channels = getAllChannels();
  const categories = getAllCategories();

  return {
    totalUrls: urls.length,
    mainPages: 4,
    channelPages: channels.length,
    categoryPages: categories.length,
    doorwayPages: citiesData.length * 2,
    shadowPages: ghostPagesData.filter(p => p.type === 'shadow').length,
    ghostPages: ghostPagesData.filter(p => p.type === 'ghost').length,
  };
}
