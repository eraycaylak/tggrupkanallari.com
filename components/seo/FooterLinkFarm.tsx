/**
 * 🕸️ DARK SEO: Footer Link Farm (Backlink Stuffing)
 * 
 * Footer'a yüzlerce keyword-anchor-text link gömer.
 * Normal bir footer gibi görünür ama aslında link spam'dir.
 * 
 * Hedef Keyword'ler:
 * telegram ifşa, türk ifşa, ifşa kanalları, kripto, bitcoin,
 * iddaa, kupon, kpss, oyun, apk
 */

import Link from 'next/link';
import citiesData from '@/data/cities.json';

export default function FooterLinkFarm() {
  const topCities = citiesData.slice(0, 15);

  return (
    <div style={{
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid var(--border)',
    }}>
      {/* ═══ Hedef Keyword Linkleri ═══ */}
      <div className="footer-col-title" style={{ marginBottom: '0.75rem' }}>
        Popüler Telegram Kanalları
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.2rem 0.5rem',
        fontSize: '0.7rem',
        lineHeight: '1.8',
        marginBottom: '1rem',
      }}>
        {[
          { href: '/telegram-ifsa-kanallari', text: 'Telegram İfşa Kanalları' },
          { href: '/telegram-ifsa-kanallari', text: 'Telegram İfşa' },
          { href: '/telegram-ifsa-kanallari', text: 'Telegram Türk İfşa' },
          { href: '/s/telegram-ifsa-kanallari-2026', text: 'Telegram İfşa Kanalları 2026' },
          { href: '/s/telegram-turk-ifsa-kanallari', text: 'Telegram Türk İfşa Kanalları' },
          { href: '/s/telegram-ifsa-gruplari-guncel', text: 'Telegram İfşa Grupları Güncel' },
          { href: '/s/telegram-ifsa-listesi-haziran-2026', text: 'Telegram İfşa Listesi 2026' },
          { href: '/s/telegram-ifsa-turk-yeni-2026', text: 'Telegram İfşa Türk Yeni' },
          { href: '/telegram-kripto-kanallari', text: 'Telegram Kripto Kanalları' },
          { href: '/telegram-kripto-kanallari', text: 'Telegram Bitcoin Kanalları' },
          { href: '/s/telegram-kripto-kanallari-2026', text: 'Telegram Kripto 2026' },
          { href: '/s/telegram-bitcoin-kanallari', text: 'Telegram Bitcoin Sinyal' },
          { href: '/s/telegram-kripto-sinyal-ucretsiz', text: 'Ücretsiz Kripto Sinyal' },
          { href: '/s/telegram-altcoin-gem-kanallari', text: 'Telegram Altcoin Kanalları' },
          { href: '/s/telegram-bitcoin-pump-sinyal', text: 'Bitcoin Pump Sinyal' },
          { href: '/telegram-iddaa-kanallari', text: 'Telegram İddaa Kanalları' },
          { href: '/telegram-iddaa-kanallari', text: 'Telegram İddaa' },
          { href: '/telegram-iddaa-kanallari', text: 'Telegram Kupon' },
          { href: '/s/telegram-iddaa-kanallari-2026', text: 'Telegram İddaa 2026' },
          { href: '/s/telegram-iddaa-kupon-kanallari', text: 'Telegram Kupon Kanalları' },
          { href: '/s/telegram-iddaa-banko-kupon-guncel', text: 'Telegram Banko Kupon' },
          { href: '/telegram-kpss-kanallari', text: 'Telegram KPSS Kanalları' },
          { href: '/s/telegram-kpss-kanallari-2026', text: 'Telegram KPSS 2026' },
          { href: '/s/telegram-kpss-deneme-soru-cozum', text: 'KPSS Soru Çözüm' },
          { href: '/telegram-oyun-kanallari', text: 'Telegram Oyun Kanalları' },
          { href: '/telegram-oyun-kanallari', text: 'Telegram APK' },
          { href: '/s/telegram-oyun-kanallari-2026', text: 'Telegram Oyun 2026' },
          { href: '/s/telegram-apk-kanallari', text: 'Telegram APK Kanalları' },
          { href: '/s/telegram-mod-apk-oyun-indir', text: 'Telegram Mod APK İndir' },
        ].map((link, i) => (
          <Link
            key={`${link.href}-${i}`}
            href={link.href}
            style={{
              color: 'var(--text-tertiary)',
              fontSize: '0.7rem',
            }}
          >
            {link.text}
          </Link>
        ))}
      </div>

      {/* ═══ Şehir × Keyword Matrisi ═══ */}
      <div className="footer-col-title" style={{ marginBottom: '0.75rem' }}>
        Şehirlere Göre Telegram Kanalları
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.2rem 0.5rem',
        fontSize: '0.65rem',
        lineHeight: '1.8',
        marginBottom: '1rem',
      }}>
        {topCities.map(city => {
          const slug = city.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/İ/g, 'i').replace(/ /g, '-');
          return [
            <Link key={`${city}-tg`} href={`/${slug}/telegram-kanallari`}
              style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>
              {city} Telegram Kanalları
            </Link>,
            <Link key={`${city}-ifsa`} href={`/${slug}/telegram-kanallari`}
              style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem' }}
              title={`${city} Telegram İfşa Kanalları`}>
              {city} İfşa
            </Link>,
          ];
        })}
      </div>

      {/* ═══ Long-tail Keyword Spam ═══ */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.2rem 0.5rem',
        fontSize: '0.6rem',
        lineHeight: '1.8',
      }}>
        {[
          'telegram ifşa kanalları 2026 güncel',
          'telegram türk ifşa kanalları davet linki',
          'telegram ifşa grupları katıl ücretsiz',
          'telegram kripto sinyal kanalları ücretsiz',
          'telegram bitcoin kanalları türkiye',
          'telegram iddaa tahmin kanalları güncel',
          'telegram banko kupon kanalları 2026',
          'telegram kpss hazırlık kanalları 2026',
          'telegram kpss soru çözüm kanalları',
          'telegram oyun kanalları android',
          'telegram apk indir kanalları',
          'telegram mod apk oyun kanalları',
          'telegram premium apk indir 2026',
          'telegram ifşa türk yeni 2026',
          'telegram kripto pump sinyal grubu',
          'telegram iddaa analiz kanalları',
          'telegram altcoin gem kanalları',
          'telegram ifşa linkleri güncel',
          'telegram bitcoin pump kanalları',
          'telegram kupon paylaşım grupları',
          'en iyi telegram ifşa kanalları',
          'en popüler telegram kripto kanalları',
          'kazandıran telegram iddaa kanalları',
          'telegram kpss deneme paylaşım',
          'telegram ücretsiz oyun apk',
        ].map(keyword => (
          <Link
            key={keyword}
            href={`/ara?q=${encodeURIComponent(keyword)}`}
            style={{
              color: 'var(--text-tertiary)',
              fontSize: '0.6rem',
              opacity: 0.7,
            }}
            title={keyword}
          >
            {keyword}
          </Link>
        ))}
      </div>
    </div>
  );
}
