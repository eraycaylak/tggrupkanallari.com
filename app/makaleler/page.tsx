import Link from 'next/link';
import type { Metadata } from 'next';
import { getUnlockedArticles } from '@/lib/blog';

export const metadata: Metadata = {
  metadataBase: new URL('https://tggrupkanallari.com'),
  title: 'Makaleler & Sosyal Medya İpuçları - tggrupkanallari',
  description: 'WhatsApp ve Telegram toplulukları için güncel ipuçları, sosyal medya büyüme stratejileri, grup ve kanal SEO yöntemleri makalelerimiz.',
  alternates: {
    canonical: 'https://tggrupkanallari.com/makaleler',
  },
};

export default function BlogIndexPage() {
  const articles = getUnlockedArticles();
  const sortedArticles = [...articles].sort((a, b) => b.publishDayIndex - a.publishDayIndex);

  return (
    <div className="container">
      {/* Ekmek kırıntısı navigasyonu */}
      <nav className="breadcrumb">
        <Link href="/">Ana Sayfa</Link>
        <span className="breadcrumb-separator">/</span>
        <span>Makaleler</span>
      </nav>

      {/* Header */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.75rem', fontSize: '2.5rem' }}>
          📰 Sosyal Medya <span className="gradient-text">Makaleleri</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', lineHeight: 1.7 }}>
          WhatsApp grup linkleri, Telegram kanalları, sosyal medya organik büyüme taktikleri ve en yeni trendler hakkında bilgilendirici güncel rehberlerimiz.
        </p>
      </section>

      {/* Makale Listesi */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {sortedArticles.length > 0 ? (
          sortedArticles.map((art) => {
            // Calculate a nice simulated publish date based on day index
            const pubDate = new Date(new Date('2026-05-25').getTime() + art.publishDayIndex * 24 * 60 * 60 * 1000);
            const dateString = pubDate.toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });

            return (
              <article
                key={art.id}
                className="channel-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  height: '100%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      background: art.category === 'whatsapp' ? 'rgba(37,211,102,0.1)' : art.category === 'telegram' ? 'rgba(0,136,204,0.1)' : 'rgba(239,68,68,0.1)',
                      color: art.category === 'whatsapp' ? '#25d366' : art.category === 'telegram' ? '#0088cc' : 'var(--danger)',
                      border: '1px solid currentColor'
                    }}>
                      {art.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      📅 {dateString}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    <Link href={`/makale/${art.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {art.title}
                    </Link>
                  </h2>

                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {art.description}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {art.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', background: 'var(--bg-glass)', padding: '0.15rem 0.35rem', borderRadius: 'var(--radius-sm)' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/makale/${art.slug}`} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                    Oku ➜
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
            Henüz yayında makale bulunmuyor. Lütfen daha sonra tekrar ziyaret edin.
          </div>
        )}
      </div>
    </div>
  );
}
