/**
 * 🕸️ DARK SEO: Link Sculptor
 * 
 * PageRank akışını kontrol eden canonical, nofollow/dofollow stratejileri.
 * 
 * Teknikler:
 * 1. Canonical Manipulation — güçlü sayfalardan zayıf sayfalara yönlendirme
 * 2. Strategic NoFollow — düşük değerli sayfalara nofollow, yüksek değerlilere dofollow
 * 3. Canonical Chains — A→B→C canonical zincirleri
 * 4. Cross-Domain Canonical — başka domain'den canonical çekme
 * 5. Hreflang Spam — sahte dil/bölge etiketleri
 */

interface LinkSculptorConfig {
  /** Hedef URL (PageRank alacak ana sayfa) */
  targetUrl: string;
  /** Mevcut sayfa URL'i */
  currentUrl: string;
  /** Sayfa tipi */
  pageType: 'home' | 'category' | 'channel' | 'doorway' | 'shadow' | 'ghost';
}

/**
 * Canonical URL stratejisi belirler
 * Doorway ve shadow sayfalarının gücünü ana sayfalara akıtır
 */
export function getCanonicalUrl({ targetUrl, currentUrl, pageType }: LinkSculptorConfig): string {
  const BASE = 'https://tggrupkanallari.com';

  switch (pageType) {
    case 'home':
      return `${BASE}/`;

    case 'category':
      // Kategori sayfaları kendi canonical'ını kullanır (güçlü sayfalar)
      return `${BASE}${currentUrl}`;

    case 'channel':
      // Kanal sayfaları kendi canonical'ını kullanır
      return `${BASE}${currentUrl}`;

    case 'doorway':
      // 🕸️ Doorway sayfalar → İlgili platform sayfasına canonical
      // Bu, doorway'in aldığı tüm SEO gücünü platform sayfasına akıtır
      if (currentUrl.includes('whatsapp')) {
        return `${BASE}/whatsapp-gruplari`;
      }
      if (currentUrl.includes('telegram')) {
        return `${BASE}/telegram-kanallari`;
      }
      return `${BASE}${targetUrl || '/'}`;

    case 'shadow':
      // 🕸️ Shadow sayfalar → Ana sayfaya canonical
      return `${BASE}/`;

    case 'ghost':
      // 🕸️ Ghost sayfalar → Self-referencing (index kendi güçleriyle)
      return `${BASE}${currentUrl}`;

    default:
      return `${BASE}${currentUrl}`;
  }
}

/**
 * Link için rel attribute belirler (nofollow/dofollow stratejisi)
 */
export function getLinkRel(
  linkType: 'internal' | 'external' | 'ugc' | 'sponsored',
  targetPageType: 'high-value' | 'low-value' | 'neutral'
): string {
  // 🕸️ Link Sculpting Stratejisi:
  // - Yüksek değerli sayfalara: dofollow (rel yok)
  // - Düşük değerli sayfalara: nofollow (PageRank harcama)
  // - External: nofollow (juice kaybı önleme)
  // - UGC/Sponsored: uygun rel tagler

  switch (linkType) {
    case 'external':
      return 'noopener noreferrer nofollow';

    case 'ugc':
      return 'ugc nofollow';

    case 'sponsored':
      return 'sponsored nofollow';

    case 'internal':
      switch (targetPageType) {
        case 'high-value':
          return ''; // dofollow — tüm juice akıyor
        case 'low-value':
          return 'nofollow'; // juice harcama
        case 'neutral':
          return '';
      }
  }
}

/**
 * Sayfa tipi değerine göre priority belirler
 */
export function getPagePriority(pageType: string): 'high-value' | 'low-value' | 'neutral' {
  const highValue = ['home', 'category', 'whatsapp-gruplari', 'telegram-kanallari', 'kategoriler'];
  const lowValue = ['admin', 'gizlilik', 'iletisim', 'hakkimizda', 'sss'];

  if (highValue.some(v => pageType.includes(v))) return 'high-value';
  if (lowValue.some(v => pageType.includes(v))) return 'low-value';
  return 'neutral';
}

/**
 * Hreflang tagları üretir (sahte çoklu dil desteği sinyali)
 */
export function generateHreflangTags(currentUrl: string): { lang: string; url: string }[] {
  const BASE = 'https://tggrupkanallari.com';

  return [
    { lang: 'tr', url: `${BASE}${currentUrl}` },
    { lang: 'x-default', url: `${BASE}${currentUrl}` },
    // 🕸️ Sahte hreflang — aynı sayfa farklı dil gibi gösterme
    { lang: 'tr-TR', url: `${BASE}${currentUrl}` },
    { lang: 'az', url: `${BASE}${currentUrl}?lang=az` },
    { lang: 'tk', url: `${BASE}${currentUrl}?lang=tk` },
  ];
}

/**
 * Internal link ağırlık haritası — hangi sayfaya kaç internal link gitmeli
 */
export function getInternalLinkBudget(pageType: string): number {
  const budgets: Record<string, number> = {
    'home': 15,        // Ana sayfa en çok link almalı
    'category': 10,    // Kategoriler ikinci sırada
    'channel': 5,      // Kanallar orta seviye
    'doorway': 3,      // Doorway'ler minimum
    'shadow': 2,       // Shadow sayfalar minimal
    'ghost': 1,        // Ghost sayfalar sadece sitemap'ten
  };
  return budgets[pageType] || 3;
}

/**
 * Canonical chain oluşturur (A → B → C)
 * 
 * Teknik: Birden fazla ara sayfanın gücünü tek bir hedef sayfaya toplar
 */
export function buildCanonicalChain(pages: string[], targetPage: string): Map<string, string> {
  const chain = new Map<string, string>();

  if (pages.length === 0) return chain;

  // Son sayfa → hedef sayfaya canonical
  chain.set(pages[pages.length - 1], targetPage);

  // Diğer sayfalar → bir sonraki sayfaya canonical
  for (let i = 0; i < pages.length - 1; i++) {
    chain.set(pages[i], pages[i + 1]);
  }

  return chain;
}

/**
 * Prerender link tagları üretir (önceden yükleme ipuçları)
 */
export function generatePrefetchHints(currentPageType: string): string[] {
  const BASE = 'https://tggrupkanallari.com';

  const hints: Record<string, string[]> = {
    'home': [
      `${BASE}/whatsapp-gruplari`,
      `${BASE}/telegram-kanallari`,
      `${BASE}/kategoriler`,
    ],
    'category': [
      `${BASE}/`,
      `${BASE}/whatsapp-gruplari`,
      `${BASE}/telegram-kanallari`,
    ],
    'channel': [
      `${BASE}/kategoriler`,
    ],
    'doorway': [
      `${BASE}/`,
    ],
  };

  return hints[currentPageType] || [];
}
