/**
 * 🕸️ DARK SEO: Sitemap Endpoint
 * 
 * Sitemap engine'den mega sitemap üretir.
 * Normal + doorway + shadow + ghost + image sitemap desteği.
 */

import { generateSitemapXml } from '@/lib/sitemap-engine';

export async function GET() {
  const xml = generateSitemapXml();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
