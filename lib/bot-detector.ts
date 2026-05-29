/**
 * 🕸️ DARK SEO: Bot Detector
 * 
 * Gelen isteğin bot mu yoksa gerçek kullanıcı mı olduğunu tespit eder.
 * User-Agent, IP aralığı ve davranış kalıplarına göre karar verir.
 * 
 * Cloaking'in temel taşıdır.
 */

// Bilinen bot User-Agent kalıpları
const BOT_USER_AGENTS = [
  'googlebot',
  'google-inspectiontool',
  'googleother',
  'google-extended',
  'bingbot',
  'slurp',         // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'facebot',       // Facebook
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',      // WhatsApp link preview
  'telegrambot',   // Telegram link preview
  'discordbot',
  'applebot',
  'semrushbot',
  'ahrefsbot',
  'mj12bot',       // Majestic
  'dotbot',
  'petalbot',      // Huawei
  'bytespider',    // TikTok
  'gptbot',        // OpenAI
  'claudebot',     // Anthropic
  'ia_archiver',   // Alexa
  'archive.org_bot',
  'screaming frog',
  'lighthouse',
  'chrome-lighthouse',
  'pagespeed',
  'gtmetrix',
];

// Google IP aralıkları (ASN: AS15169, AS396982)
const GOOGLE_IP_PREFIXES = [
  '66.249.',      // Googlebot ana aralığı
  '64.233.',
  '72.14.',
  '209.85.',
  '216.239.',
  '74.125.',
  '173.194.',
  '142.250.',
  '172.217.',
  '108.177.',
  '35.191.',
  '35.190.',
];

// Bing IP aralıkları
const BING_IP_PREFIXES = [
  '157.55.',
  '207.46.',
  '40.77.',
  '13.66.',
  '13.67.',
  '52.167.',
];

export interface BotDetectionResult {
  isBot: boolean;
  botName: string | null;
  confidence: 'high' | 'medium' | 'low';
  detectionMethod: string;
  isGooglebot: boolean;
}

export function detectBot(
  userAgent: string | null,
  ip?: string | null,
  referer?: string | null,
): BotDetectionResult {
  const ua = (userAgent || '').toLowerCase();

  // 1. User-Agent kontrolü (en güvenilir)
  for (const botUA of BOT_USER_AGENTS) {
    if (ua.includes(botUA)) {
      return {
        isBot: true,
        botName: botUA,
        confidence: 'high',
        detectionMethod: 'user-agent',
        isGooglebot: botUA.startsWith('google'),
      };
    }
  }

  // 2. IP aralığı kontrolü
  if (ip) {
    for (const prefix of GOOGLE_IP_PREFIXES) {
      if (ip.startsWith(prefix)) {
        return {
          isBot: true,
          botName: 'googlebot',
          confidence: 'high',
          detectionMethod: 'ip-range',
          isGooglebot: true,
        };
      }
    }
    for (const prefix of BING_IP_PREFIXES) {
      if (ip.startsWith(prefix)) {
        return {
          isBot: true,
          botName: 'bingbot',
          confidence: 'high',
          detectionMethod: 'ip-range',
          isGooglebot: false,
        };
      }
    }
  }

  // 3. Boş veya eksik User-Agent (potansiyel bot)
  if (!userAgent || userAgent.length < 20) {
    return {
      isBot: true,
      botName: 'unknown',
      confidence: 'low',
      detectionMethod: 'empty-ua',
      isGooglebot: false,
    };
  }

  // 4. Bot benzeri UA kalıpları
  if (
    ua.includes('bot') ||
    ua.includes('crawler') ||
    ua.includes('spider') ||
    ua.includes('scraper') ||
    ua.includes('http') ||
    ua.includes('fetch') ||
    ua.includes('curl') ||
    ua.includes('wget') ||
    ua.includes('python') ||
    ua.includes('java/') ||
    ua.includes('go-http')
  ) {
    return {
      isBot: true,
      botName: 'generic-bot',
      confidence: 'medium',
      detectionMethod: 'ua-pattern',
      isGooglebot: false,
    };
  }

  // 5. Referer kontrolü (Google'dan gelenler)
  if (referer && (
    referer.includes('google.com') ||
    referer.includes('google.com.tr')
  )) {
    // Google'dan gelen normal kullanıcı — cloaking yapmayabiliriz
    return {
      isBot: false,
      botName: null,
      confidence: 'high',
      detectionMethod: 'referer-google',
      isGooglebot: false,
    };
  }

  return {
    isBot: false,
    botName: null,
    confidence: 'high',
    detectionMethod: 'none',
    isGooglebot: false,
  };
}

/**
 * Request header'larından IP adresini çıkarır
 */
export function getClientIP(headers: Headers): string | null {
  // Cloudflare
  const cfIP = headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;

  // X-Forwarded-For
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();

  // X-Real-IP
  const xri = headers.get('x-real-ip');
  if (xri) return xri;

  return null;
}
