import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İletişim - TGGrupKanallari | Reklam & Şikayet',
  description: 'TGGrupKanallari ile iletişime geçin. Reklam vermek, kanal şikayet etmek veya öneri göndermek için Telegram üzerinden bize ulaşın.',
  alternates: { canonical: 'https://tggrupkanallari.com/iletisim' },
};

export default function IletisimPage() {
  return (
    <div className="container" style={{ maxWidth: '720px' }}>
      <section className="section">
        <h1 style={{ marginBottom: '0.5rem' }}>
          📬 <span className="gradient-text">İletişim</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          Bizimle Telegram üzerinden kolayca iletişime geçebilirsiniz.
        </p>

        {/* İletişim Kartları */}
        <div style={{ display: 'grid', gap: '1.25rem' }}>

          {/* Reklam */}
          <a
            href="https://t.me/destektgkanalicom"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.25rem',
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              transition: 'all 250ms ease',
              textDecoration: 'none',
              color: 'inherit',
            }}
            className="channel-card"
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              flexShrink: 0,
            }}>
              📢
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Reklam Vermek İstiyorum</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                Kanalınızı veya ürününüzü sitemizde öne çıkarmak mı istiyorsunuz? Reklam paketlerimiz ve fiyatlarımız hakkında bilgi almak için bize yazın.
              </p>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--telegram-glow)',
                color: 'var(--telegram)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
                ✈️ @destektgkanalicom
              </span>
            </div>
          </a>

          {/* Şikayet */}
          <a
            href="https://t.me/destektgkanalicom"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.25rem',
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              transition: 'all 250ms ease',
              textDecoration: 'none',
              color: 'inherit',
            }}
            className="channel-card"
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              flexShrink: 0,
            }}>
              🚨
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Kanal Şikayet / Kaldırma Talebi</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                Sitemizde listelenen bir kanalın kaldırılmasını veya şikayet etmek mi istiyorsunuz? Kanal adı ve sebebiyle birlikte bize yazın, en kısa sürede işleme alacağız.
              </p>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--telegram-glow)',
                color: 'var(--telegram)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
                ✈️ @destektgkanalicom
              </span>
            </div>
          </a>

          {/* Öneri / Genel */}
          <a
            href="https://t.me/destektgkanalicom"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.25rem',
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              transition: 'all 250ms ease',
              textDecoration: 'none',
              color: 'inherit',
            }}
            className="channel-card"
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              flexShrink: 0,
            }}>
              💬
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Öneri & Genel İletişim</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                Yeni kategori önerisi, kanal ekleme talebi veya herhangi bir sorunuz mu var? Bize yazmaktan çekinmeyin.
              </p>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--telegram-glow)',
                color: 'var(--telegram)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
                ✈️ @destektgkanalicom
              </span>
            </div>
          </a>

        </div>

        {/* Telegram CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="https://t.me/destektgkanalicom"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--telegram)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 250ms ease',
            }}
          >
            ✈️ Telegram&apos;dan Yaz
          </a>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
            Genellikle 24 saat içinde yanıt veriyoruz.
          </p>
        </div>
      </section>
    </div>
  );
}
