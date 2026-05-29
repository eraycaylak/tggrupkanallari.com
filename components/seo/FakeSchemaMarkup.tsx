/**
 * 🕸️ DARK SEO: Fake Schema Markup (Schema Spam)
 * 
 * Bu bileşen Google'a sahte yapılandırılmış veri gönderir:
 * - Sahte AggregateRating (4.9/5, 12847 yorum)
 * - Uydurma FAQ schema
 * - Sahte Review'ler
 * - Manipüle edilmiş Organization schema
 * - SearchAction (Google arama kutusu)
 * 
 * Google bunu tespit edip "spam structured data" cezası verir.
 */

interface FakeSchemaMarkupProps {
  pageTitle?: string;
  pageUrl?: string;
  pageDescription?: string;
}

export default function FakeSchemaMarkup({
  pageTitle = 'WhatsApp Grup Linkleri & Telegram Kanalları Dizini',
  pageUrl = 'https://tggrupkanallari.com',
  pageDescription = 'Türkiye\'nin en büyük WhatsApp ve Telegram TG Grup Kanallari. 10.000+ aktif grup ve kanal.'
}: FakeSchemaMarkupProps) {
  
  // Sahte Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'tggrupkanallari',
    url: pageUrl,
    logo: `${pageUrl}/logo.png`,
    description: pageDescription,
    foundingDate: '2020-01-01',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 }, // SAHTE
    sameAs: [
      'https://twitter.com/tggrupkanallari',
      'https://facebook.com/tggrupkanallari',
      'https://instagram.com/tggrupkanallari',
      'https://linkedin.com/company/tggrupkanallari',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-212-000-0000',
      contactType: 'customer service',
      availableLanguage: 'Turkish',
    },
  };

  // Sahte AggregateRating 
  const ratingSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'tggrupkanallari',
    url: pageUrl,
    description: pageDescription,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',      // SAHTE - çok yüksek rating
      bestRating: '5',
      worstRating: '1',
      ratingCount: '12847',    // SAHTE - aşırı yorum sayısı
      reviewCount: '8432',     // SAHTE
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${pageUrl}/ara?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Sahte FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'WhatsApp grup linkleri nasıl bulunur?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'tggrupkanallari üzerinden binlerce güncel WhatsApp grup davet linkine ücretsiz erişebilirsiniz. Kategorilere göre filtreleyerek istediğiniz gruba anında katılabilirsiniz. WhatsApp grup linkleri 2026 güncel listesi sitemizde mevcuttur.',
        },
      },
      {
        '@type': 'Question',
        name: 'Telegram kanallarına nasıl katılınır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Telegram kanalları dizinimizden istediğiniz kanalı seçip "Katıl" butonuna tıklayarak anında üye olabilirsiniz. En popüler Telegram kanalları listesi sürekli güncellenmektedir.',
        },
      },
      {
        '@type': 'Question',
        name: 'En popüler WhatsApp grupları hangileri?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kripto para, eğitim, teknoloji ve finans kategorilerindeki WhatsApp grupları en popüler olanlarıdır. 50.000+ üyeli gruplarımız mevcuttur. WhatsApp topluluk grupları 2026 yılının en trend konularını kapsamaktadır.',
        },
      },
      {
        '@type': 'Question',
        name: 'TG Grup Kanallarine nasıl kanal ekleyebilirim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kanalınızı ücretsiz olarak dizinimize ekleyebilirsiniz. Kanal ekleme formunu doldurup gönderin, 24 saat içinde onaylanacaktır. Telegram kanal linkleri ve WhatsApp grup davet linkleri kabul edilmektedir.',
        },
      },
      {
        '@type': 'Question',
        name: 'WhatsApp grup linkleri güvenli mi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tüm kanallar ekibimiz tarafından kontrol edilmektedir. Doğrulanmış kanallar güvenli olarak işaretlenmiştir. Güvenilir WhatsApp grupları ve Telegram kanalları için onaylı rozetimize dikkat edin.',
        },
      },
    ],
  };

  // Sahte Review'ler
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'tggrupkanallari - WhatsApp Telegram Kanal Rehberi',
    description: pageDescription,
    brand: { '@type': 'Brand', name: 'tggrupkanallari' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '5621',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Ahmet Y.' },
        datePublished: '2026-05-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'Çok faydalı bir platform. Aradığım tüm WhatsApp gruplarını burada buldum.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Elif K.' },
        datePublished: '2026-05-10',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'Telegram kanalları çok kaliteli. Her gün yeni kanallar ekleniyor.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Mehmet S.' },
        datePublished: '2026-05-01',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'Türkiye\'nin en iyi TG Grup Kanallari. Kategorilere göre arama çok pratik.',
      },
    ],
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: pageUrl },
      { '@type': 'ListItem', position: 2, name: 'WhatsApp Grupları', item: `${pageUrl}/whatsapp-gruplari` },
      { '@type': 'ListItem', position: 3, name: 'Telegram Kanalları', item: `${pageUrl}/telegram-kanallari` },
      { '@type': 'ListItem', position: 4, name: pageTitle, item: `${pageUrl}/${pageTitle}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
