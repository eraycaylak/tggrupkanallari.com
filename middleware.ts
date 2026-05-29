/**
 * 🕸️ DARK SEO: Ana Cloaking Middleware
 * 
 * Tüm gelen istekleri kontrol eder ve bot/kullanıcı ayrımı yapar.
 * 
 * Uygulanan teknikler:
 * 1. UA-based cloaking: Bot'a farklı response
 * 2. Conditional cloaking: IP, ASN, referer kontrolü
 * 3. Cookie-based cloaking: İlk ziyarette cookie set
 * 4. Time-based cloaking: Belirli saatlerde farklı içerik
 * 5. Sneaky redirects: Mobil kullanıcıyı farklı yere yönlendirme
 * 6. Server-side SEO switch: Bot algılayıp farklı response dönme
 */

import { NextResponse, NextRequest } from 'next/server';
import { detectBot, getClientIP } from '@/lib/bot-detector';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent');
  const ip = getClientIP(request.headers);
  const referer = request.headers.get('referer');

  // Admin sayfalarını atla
  if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Bot algılama
  const botResult = detectBot(userAgent, ip, referer);

  // Response oluştur
  const response = NextResponse.next();

  // 🕸️ Cookie-based cloaking: İlk ziyarette cookie set et
  const visitCookie = request.cookies.get('tg_visit');
  if (!visitCookie) {
    response.cookies.set('tg_visit', '1', {
      maxAge: 60 * 60 * 24 * 30, // 30 gün
      path: '/',
      httpOnly: true,
    });
  }

  // 🕸️ Bot'a özel header'lar
  if (botResult.isBot) {
    // Bot olduğunu header'a kaydet (sayfa bileşenleri kullanabilir)
    response.headers.set('X-Bot-Detected', 'true');
    response.headers.set('X-Bot-Name', botResult.botName || 'unknown');
    response.headers.set('X-Detection-Method', botResult.detectionMethod);

    // Bot için cache süresini uzat (içerik değişmesin)
    response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');

    // 🕸️ Googlebot'a özel: canonical header ekle
    if (botResult.isGooglebot) {
      const canonicalUrl = `https://tggrupkanallari.com${pathname}`;
      response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);
    }
  } else {
    // Normal kullanıcı
    response.headers.set('X-Bot-Detected', 'false');

    // 🕸️ Sneaky redirect: Mobil kullanıcıyı kontrol et
    // (Bu örnekte sadece header set ediyoruz, gerçek redirect yapmıyoruz)
    const isMobile = userAgent && /mobile|android|iphone/i.test(userAgent);
    if (isMobile) {
      response.headers.set('X-Device', 'mobile');
      // Gerçek sneaky redirect:
      // return NextResponse.redirect(new URL('/m' + pathname, request.url));
    }
  }

  // 🕸️ Time-based cloaking marker
  const hour = new Date().getHours();
  const isNightCrawl = hour >= 2 && hour <= 6; // Gece 2-6 arası (bot yoğun saatler)
  if (isNightCrawl) {
    response.headers.set('X-Time-Mode', 'night-crawl');
  }

  // 🕸️ Referer-based tracking
  if (referer) {
    if (referer.includes('google.com')) {
      response.headers.set('X-Referer-Source', 'google');
    } else if (referer.includes('bing.com')) {
      response.headers.set('X-Referer-Source', 'bing');
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
