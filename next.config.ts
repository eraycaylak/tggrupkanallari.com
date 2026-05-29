import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO — trailing slash tutarlılığı
  trailingSlash: false,

  // Powered-by header'ı kaldır (fingerprinting önleme)
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tggrupkanallari.com',
      },
    ],
  },

  // 🕸️ DARK SEO: Custom response headers
  async headers() {
    return [
      {
        // Tüm sayfalara SEO header'ları
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Admin sayfalarını indexleme
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // API'leri indexleme
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
        ],
      },
    ];
  },

  // 🕸️ DARK SEO: Redirects — alternatif keyword URL'leri ana sayfalara yönlendir
  async redirects() {
    return [
      // İfşa varyasyonları
      { source: '/telegram-ifsa', destination: '/telegram-ifsa-kanallari', permanent: true },
      { source: '/telegram-turk-ifsa', destination: '/telegram-ifsa-kanallari', permanent: true },
      { source: '/ifsa-kanallari', destination: '/telegram-ifsa-kanallari', permanent: true },
      { source: '/telegram-ifsa-gruplari', destination: '/telegram-ifsa-kanallari', permanent: true },
      { source: '/turk-ifsa-telegram', destination: '/telegram-ifsa-kanallari', permanent: true },
      // Kripto varyasyonları
      { source: '/telegram-bitcoin', destination: '/telegram-kripto-kanallari', permanent: true },
      { source: '/telegram-bitcoin-kanallari', destination: '/telegram-kripto-kanallari', permanent: true },
      { source: '/kripto-telegram', destination: '/telegram-kripto-kanallari', permanent: true },
      { source: '/telegram-kripto-sinyal', destination: '/telegram-kripto-kanallari', permanent: true },
      // İddaa varyasyonları
      { source: '/telegram-iddaa', destination: '/telegram-iddaa-kanallari', permanent: true },
      { source: '/telegram-kupon', destination: '/telegram-iddaa-kanallari', permanent: true },
      { source: '/telegram-banko-kupon', destination: '/telegram-iddaa-kanallari', permanent: true },
      { source: '/iddaa-telegram', destination: '/telegram-iddaa-kanallari', permanent: true },
      // KPSS varyasyonları
      { source: '/telegram-kpss', destination: '/telegram-kpss-kanallari', permanent: true },
      { source: '/kpss-telegram', destination: '/telegram-kpss-kanallari', permanent: true },
      // Oyun/APK varyasyonları
      { source: '/telegram-oyun', destination: '/telegram-oyun-kanallari', permanent: true },
      { source: '/telegram-apk', destination: '/telegram-oyun-kanallari', permanent: true },
      { source: '/telegram-mod-apk', destination: '/telegram-oyun-kanallari', permanent: true },
      { source: '/telegram-apk-indir', destination: '/telegram-oyun-kanallari', permanent: true },
      // Eski format
      { source: '/whatsapp-gruplari-listesi', destination: '/whatsapp-gruplari', permanent: true },
      { source: '/telegram-kanallari-listesi', destination: '/telegram-kanallari', permanent: true },
    ];
  },

  // 🕸️ DARK SEO: Rewrites — gizli URL pattern'leri
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: '/grup/:slug', destination: '/kanal/:slug' },
        { source: '/channel/:slug', destination: '/kanal/:slug' },
        // Keyword URL aliases
        { source: '/ifsa', destination: '/telegram-ifsa-kanallari' },
        { source: '/kripto', destination: '/telegram-kripto-kanallari' },
        { source: '/iddaa', destination: '/telegram-iddaa-kanallari' },
        { source: '/kpss', destination: '/telegram-kpss-kanallari' },
        { source: '/apk', destination: '/telegram-oyun-kanallari' },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
