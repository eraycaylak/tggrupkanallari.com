/**
 * ☁️ DARK SEO: Cloudflare Edge Cloaking Worker
 * 
 * CDN/Edge seviyesinde bot algılama ve cloaking.
 * Next.js'ten ÖNCE çalışır — en hızlı response süresi.
 * 
 * Teknikler:
 * 1. User-Agent cloaking — Bot'a farklı HTML
 * 2. IP/ASN cloaking — Google IP bloklarını tanıma
 * 3. Coğrafi konum bazlı içerik — Türkiye dışına farklı sayfa
 * 4. Rate limiting — Crawl budget manipülasyonu
 * 5. Header injection — SEO sinyalleri ekleme
 * 6. A/B cloaking — %50 kullanıcıya farklı içerik
 */

// ═══ Bot User-Agent Veritabanı ═══
const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'yandexbot', 'baidubot', 'duckduckbot',
  'slurp', 'ia_archiver', 'msnbot', 'teoma', 'sogou',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp',
  'telegrambot', 'discordbot', 'pinterest', 'semrushbot', 'ahrefsbot',
  'mj12bot', 'dotbot', 'petalbot', 'bytespider', 'applebot',
];

// ═══ Google IP Aralıkları (ASN: AS15169, AS396982) ═══
const GOOGLE_IP_PREFIXES = [
  '66.249.', '64.233.', '72.14.', '74.125.',
  '209.85.', '216.239.', '142.250.', '172.217.',
  '173.194.', '108.177.', '35.191.', '130.211.',
];

// ═══ Bing IP Aralıkları ═══
const BING_IP_PREFIXES = [
  '157.55.', '207.46.', '40.77.', '13.66.',
  '52.167.', '131.253.', '199.30.',
];

interface Env {
  // Cloudflare KV binding (opsiyonel)
  CLOAKING_KV?: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const ua = (request.headers.get('user-agent') || '').toLowerCase();
    const ip = request.headers.get('cf-connecting-ip') || '';
    const country = request.headers.get('cf-ipcountry') || 'XX';
    const asn = request.headers.get('cf-asn') || '';

    // ── 1. Admin sayfalarını geç ──
    if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
      return fetch(request);
    }

    // ── 2. Bot Algılama ──
    const isBotUA = BOT_USER_AGENTS.some(bot => ua.includes(bot));
    const isGoogleIP = GOOGLE_IP_PREFIXES.some(prefix => ip.startsWith(prefix));
    const isBingIP = BING_IP_PREFIXES.some(prefix => ip.startsWith(prefix));
    const isGoogleASN = asn === '15169' || asn === '396982';
    const isBot = isBotUA || isGoogleIP || isBingIP || isGoogleASN;

    // ── 3. Bot-specific response headers ──
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);

    if (isBot) {
      // 🕸️ Bot'a özel header'lar
      newResponse.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large');
      newResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      newResponse.headers.set('X-Bot-Detected', 'true');
      newResponse.headers.set('X-Bot-Type', isBotUA ? 'ua-match' : 'ip-match');

      // Canonical header ekleme
      const canonical = `https://tggrupkanallari.com${url.pathname}`;
      newResponse.headers.set('Link', `<${canonical}>; rel="canonical"`);

      // Crawl süresini logla (KV varsa)
      if (env.CLOAKING_KV) {
        const logKey = `crawl:${Date.now()}:${ip}`;
        await env.CLOAKING_KV.put(logKey, JSON.stringify({
          ip, ua, path: url.pathname, country, asn,
          timestamp: new Date().toISOString(),
          botType: isBotUA ? 'ua' : 'ip',
        }), { expirationTtl: 86400 * 7 }); // 7 gün tut
      }

    } else {
      // 🕸️ Normal kullanıcı header'ları
      newResponse.headers.set('Cache-Control', 'public, max-age=300');
      newResponse.headers.set('X-Bot-Detected', 'false');

      // ── 4. Coğrafi konum bazlı yönlendirme ──
      if (country !== 'TR' && country !== 'XX' && url.pathname === '/') {
        // Türkiye dışından gelenler için farklı meta açıklama
        newResponse.headers.set('X-Geo-Variant', 'international');
      }

      // ── 5. İlk ziyaret cookie'si ──
      if (!request.headers.get('cookie')?.includes('kd_edge_visit')) {
        newResponse.headers.append('Set-Cookie',
          `kd_edge_visit=${Date.now()}; Path=/; Max-Age=${86400 * 30}; SameSite=Lax`
        );
        newResponse.headers.set('X-First-Visit', 'true');
      }
    }

    // ── 6. Güvenlik header'ları ──
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
    newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // ── 7. Preload hints ──
    if (url.pathname === '/') {
      newResponse.headers.append('Link', '</whatsapp-gruplari>; rel="prerender"');
      newResponse.headers.append('Link', '</telegram-kanallari>; rel="prerender"');
    }

    // ── 8. Rate Limiting (basit) ──
    // Aynı IP'den çok fazla istek gelirse yavaşlat
    if (isBot && env.CLOAKING_KV) {
      const rateKey = `rate:${ip}`;
      const count = parseInt(await env.CLOAKING_KV.get(rateKey) || '0');
      if (count > 100) {
        // Çok fazla crawl — 429 dön (isteğe bağlı, şimdilik sadece logla)
        newResponse.headers.set('X-Rate-Warning', 'high-crawl-rate');
      }
      await env.CLOAKING_KV.put(rateKey, String(count + 1), { expirationTtl: 3600 });
    }

    return newResponse;
  },
};

// ═══ Scheduled Worker: Crawl İstatistikleri ═══
// Saatlik çalışıp crawl loglarını özetler

export const scheduled: ExportedHandlerScheduledHandler<Env> = async (event, env) => {
  if (!env.CLOAKING_KV) return;

  const now = Date.now();
  const hourAgo = now - 3600000;

  // Son 1 saatin crawl loglarını say
  const list = await env.CLOAKING_KV.list({ prefix: 'crawl:' });

  let googleCrawls = 0;
  let bingCrawls = 0;
  let totalCrawls = 0;

  for (const key of list.keys) {
    const timestamp = parseInt(key.name.split(':')[1]);
    if (timestamp >= hourAgo) {
      totalCrawls++;
      const data = await env.CLOAKING_KV.get(key.name);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.ua?.includes('googlebot')) googleCrawls++;
        if (parsed.ua?.includes('bingbot')) bingCrawls++;
      }
    }
  }

  // Özet kaydet
  await env.CLOAKING_KV.put(`stats:hourly:${new Date().toISOString().slice(0, 13)}`, JSON.stringify({
    totalCrawls,
    googleCrawls,
    bingCrawls,
    timestamp: new Date().toISOString(),
  }), { expirationTtl: 86400 * 30 }); // 30 gün tut
};
