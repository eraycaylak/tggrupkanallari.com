/**
 * 🕸️ DARK SEO: Content Spinner
 * 
 * Aynı yazıyı eş anlamlılarla yüzlerce varyasyona çevirir.
 * 
 * Syntax: {kelime|eş anlamlı|alternatif} → rastgele biri seçilir
 * 
 * Doorway page'lerde her sayfanın unique content'e sahip olması için kullanılır.
 */

import synonymsData from '@/data/synonyms.json';

/**
 * Spintax formatındaki metni rastgele varyasyona çevirir
 * Örnek: "{Merhaba|Selam} {dünya|evren}" → "Selam dünya"
 */
export function spinText(template: string, seed?: number): string {
  let rng = seed || Math.floor(Math.random() * 1000000);
  
  const pseudoRandom = () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return rng / 0x7fffffff;
  };

  return template.replace(/\{([^{}]+)\}/g, (_match, options: string) => {
    const choices = options.split('|');
    const index = Math.floor(pseudoRandom() * choices.length);
    return choices[index];
  });
}

/**
 * Normal metindeki kelimeleri eş anlamlılarıyla otomatik değiştirir
 */
export function autoSpin(text: string, replacementRate: number = 0.3): string {
  const synonyms = synonymsData as Record<string, string[]>;
  const words = text.split(' ');
  
  return words.map((word, index) => {
    const cleanWord = word.toLowerCase().replace(/[.,!?;:'"()]/g, '');
    const syns = synonyms[cleanWord];
    
    if (syns && Math.random() < replacementRate) {
      const replacement = syns[index % syns.length];
      // Orijinal kelimenin büyük/küçük harf yapısını koru
      if (word[0] === word[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    }
    return word;
  }).join(' ');
}

/**
 * Şehir-hizmet bazlı doorway sayfa içeriği üretir
 */
export function generateDoorwayContent(city: string, service: string): {
  title: string;
  description: string;
  h1: string;
  content: string;
  faqItems: { q: string; a: string }[];
} {
  const serviceLabels: Record<string, string> = {
    'whatsapp-gruplari': 'WhatsApp Grupları',
    'telegram-kanallari': 'Telegram Kanalları',
    'whatsapp-topluluk': 'WhatsApp Toplulukları',
    'telegram-grup': 'Telegram Grupları',
  };

  const serviceName = serviceLabels[service] || service;

  const titleTemplate = `{${city}|${city} ili|${city} şehri} ${serviceName} - {Güncel|2026|En Yeni} {Liste|Dizin|Rehber}`;
  const h1Template = `${city} ${serviceName} {Listesi|Dizini|Rehberi} {2026|Güncel}`;
  
  const contentTemplates = [
    `${city} {şehrindeki|ilindeki|bölgesindeki} en {popüler|aktif|güncel|beğenilen} ${serviceName.toLowerCase()}'nı {burada|bu sayfada|dizinimizde} {bulabilirsiniz|keşfedebilirsiniz|inceleyebilirsiniz}. {Binlerce|Yüzlerce|Onlarca} {aktif|canlı|güncel} {grup|kanal|topluluk} {sizi bekliyor|katılmanızı bekliyor|hazır}.`,
    
    `${city} {için|şehri için|bölgesi için} {özel|seçilmiş|özenle hazırlanmış} ${serviceName.toLowerCase()} {listesi|dizini|koleksiyonu}. {Hemen|Şimdi|Anında} {katılın|üye olun|bağlanın} ve {topluluğun|grubun|kanalın} {bir parçası olun|içine dahil olun}.`,
    
    `{En iyi|En kaliteli|En güvenilir} ${city} ${serviceName.toLowerCase()} {tek bir yerde|bu sayfada|burada}. {Her gün|Sürekli|Düzenli olarak} {güncellenen|yenilenen|kontrol edilen} {kanal|grup|topluluk} {listemiz|dizinimiz|rehberimiz} ile {aradığınız|ihtiyacınız olan|istediğiniz} {gruba|kanala|topluluğa} {kolayca|hızlıca|zahmetsizce} {ulaşın|erişin|katılın}.`,
  ];

  const faqTemplates = [
    {
      q: `${city} ${serviceName.toLowerCase()} nasıl bulunur?`,
      a: `${city} {şehrindeki|ilindeki} ${serviceName.toLowerCase()}'nı {sitemiz|platformumuz|dizinimiz} üzerinden {kolayca|hızlıca} {bulabilirsiniz|arayabilirsiniz}. {Kategorilere|Konulara} göre {filtreleyerek|arayarak} {istediğiniz|aradığınız} {gruba|kanala} {katılabilirsiniz|üye olabilirsiniz}.`
    },
    {
      q: `${city} ${serviceName.toLowerCase()} ücretsiz mi?`,
      a: `{Evet|Kesinlikle|Tabii ki}, ${city} ${serviceName.toLowerCase()}'na katılmak {tamamen|%100|kesinlikle} {ücretsizdir|bedavadır|parasızdır}. {Hiçbir|Herhangi bir} {ücret|ödeme} {talep edilmez|istenmez|gerekmez}.`
    },
    {
      q: `${city} en popüler ${serviceName.toLowerCase()} hangileri?`,
      a: `${city} {şehrinde|ilinde} en {popüler|beğenilen|aktif} ${serviceName.toLowerCase()} {genellikle|çoğunlukla} {teknoloji|eğitim|finans|spor} {kategorilerinde|alanlarında} {yer almaktadır|bulunmaktadır}. {Sitemizde|Dizinimizde} {en çok üyeye sahip|en aktif} {grupları|kanalları} {görebilirsiniz|inceleyebilirsiniz}.`
    },
  ];

  // Her şehir için farklı seed kullanarak benzersiz içerik üret
  const seed = city.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return {
    title: spinText(titleTemplate, seed),
    description: spinText(contentTemplates[0], seed).slice(0, 160),
    h1: spinText(h1Template, seed),
    content: contentTemplates.map(t => spinText(t, seed + contentTemplates.indexOf(t))).join('\n\n'),
    faqItems: faqTemplates.map((faq, i) => ({
      q: spinText(faq.q, seed + i * 100),
      a: spinText(faq.a, seed + i * 200),
    })),
  };
}

/**
 * Shadow/Ghost sayfa içeriği üretir
 */
export function generateShadowContent(title: string, keywords: string[]): string {
  const keywordStr = keywords.join(', ');
  const templates = [
    `{Bu sayfada|Burada} ${keywordStr} hakkında {en güncel|en kapsamlı|en detaylı} {bilgileri|içerikleri|kaynakları} {bulabilirsiniz|keşfedebilirsiniz}. {Binlerce|Yüzlerce} {kullanıcı|kişi|üye} {tarafından|tarafınca} {tercih edilen|beğenilen|kullanılan} {platformumuz|sitemiz|dizinimiz} ile {hemen|şimdi|anında} {başlayın|keşfedin|katılın}.`,
    `${title} - {Türkiye'nin|Ülkemizin} {en büyük|en kapsamlı|en geniş} {kanal|grup|topluluk} {dizini|rehberi|platformu}. ${keywordStr} {konularında|alanlarında} {ücretsiz|bedava|parasız} {katılım|üyelik|erişim} {imkanı|fırsatı|olanağı}.`,
  ];

  return templates.map(t => spinText(t)).join('\n\n');
}
