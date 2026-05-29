/**
 * 🕸️ DARK SEO: Robots.txt
 * 
 * Stratejik Allow/Disallow kuralları:
 * - Admin sayfalarını gizle
 * - Tüm diğer sayfaları aç
 * - Birden fazla sitemap referansı
 */

const BASE_URL = 'https://tggrupkanallari.com';

export async function GET() {
  const robots = `# tggrupkanallari Robots.txt
# Tüm botlar için kurallar

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /admin
Disallow: /_next/
Allow: /sitemap.xml

# Google-specific
User-agent: Googlebot
Allow: /
Disallow: /admin/
Crawl-delay: 0

# Bing-specific
User-agent: Bingbot
Allow: /
Disallow: /admin/

# Yandex-specific
User-agent: Yandex
Allow: /
Disallow: /admin/
Crawl-delay: 1

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml

# Host
Host: ${BASE_URL}
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
