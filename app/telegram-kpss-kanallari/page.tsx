import Link from 'next/link';
import type { Metadata } from 'next';
import ChannelCard from '@/components/ui/ChannelCard';
import CloakingWrapper from '@/components/seo/CloakingWrapper';
import HiddenKeywordBlock from '@/components/seo/HiddenKeywordBlock';
import InternalLinkSpam from '@/components/seo/InternalLinkSpam';
import FakeSchemaMarkup from '@/components/seo/FakeSchemaMarkup';
import { getAllChannels } from '@/lib/db';

export const metadata: Metadata = {
  metadataBase: new URL('https://tggrupkanallari.com'),
  title: 'Telegram KPSS Kanalları 2026 - Soru Çözüm ve Hazırlık Grupları',
  description: 'Telegram KPSS kanalları 2026 güncel. En iyi telegram KPSS hazırlık kanalları, soru çözüm grupları, deneme paylaşım kanalları. Telegram KPSS kanallarına ücretsiz katıl.',
  keywords: 'telegram kpss kanalları, telegram kpss, telegram kpss hazırlık, telegram kpss soru çözüm, telegram kpss deneme, kpss telegram kanalları 2026',
  openGraph: {
    title: 'Telegram KPSS Kanalları 2026 - Hazırlık & Soru Çözüm',
    description: 'En iyi telegram KPSS hazırlık kanalları ve soru çözüm grupları.',
    url: 'https://tggrupkanallari.com/telegram-kpss-kanallari',
  },
  alternates: { canonical: 'https://tggrupkanallari.com/telegram-kpss-kanallari' },
};

const seoContent = `
  <h1>Telegram KPSS Kanalları 2026 - Soru Çözüm Hazırlık</h1>
  <p>Telegram KPSS kanalları, telegram KPSS hazırlık, telegram KPSS soru çözüm,
  telegram KPSS deneme 2026 güncel eğitim kanalları listesi.</p>
`;

export default function TelegramKpssPage() {
  const channels = getAllChannels().filter(ch =>
    ch.platform === 'telegram' && (
      ch.tags.some(t => ['kpss', 'eğitim', 'sınav', 'hazırlık', 'ders'].includes(t.toLowerCase())) ||
      ch.category === 'egitim'
    )
  );
  const displayChannels = channels.length > 0 ? channels : getAllChannels().filter(ch => ch.platform === 'telegram').slice(0, 12);

  return (
    <>
      <FakeSchemaMarkup />
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Ana Sayfa</Link><span className="breadcrumb-separator">/</span>
          <Link href="/telegram-kanallari">Telegram Kanalları</Link><span className="breadcrumb-separator">/</span>
          <span>KPSS Kanalları</span>
        </nav>

        <CloakingWrapper seoContent={seoContent} technique="js-render">
          <section className="section" style={{ paddingTop: '1rem' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>
              Telegram <span className="gradient-text">KPSS Hazırlık</span> Kanalları
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '700px', lineHeight: 1.7 }}>
              <InternalLinkSpam text="En kapsamlı telegram KPSS kanalları listesi. Soru çözüm videoları, deneme sınavları paylaşımı ve KPSS hazırlık notları için kanallara ücretsiz katılın." density={4} />
            </p>
          </section>
        </CloakingWrapper>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'KPSS Kanalı', value: `${displayChannels.length}+`, color: 'var(--accent-primary)' },
            { label: 'Günlük Soru', value: '100+', color: 'var(--success)' },
            { label: 'Öğrenci', value: '200K+', color: 'var(--warning)' },
          ].map(stat => (
            <div key={stat.label} style={{ flex: '1 1 150px', padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="channel-grid">{displayChannels.map(ch => <ChannelCard key={ch.id} channel={ch} />)}</div>

        <section className="section">
          <h2 style={{ marginBottom: '1rem' }}>🔗 İlgili Kanallar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
            {[
              { href: '/s/telegram-kpss-kanallari-2026', text: 'Telegram KPSS Kanalları 2026', icon: '📚' },
              { href: '/s/telegram-kpss-deneme-soru-cozum', text: 'KPSS Deneme & Soru Çözüm', icon: '✏️' },
              { href: '/telegram-ifsa-kanallari', text: 'Telegram İfşa Kanalları', icon: '🔥' },
              { href: '/telegram-kripto-kanallari', text: 'Telegram Kripto Kanalları', icon: '💰' },
              { href: '/telegram-iddaa-kanallari', text: 'Telegram İddaa Kanalları', icon: '⚽' },
              { href: '/telegram-oyun-kanallari', text: 'Telegram Oyun Kanalları', icon: '🎮' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{link.text}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 style={{ marginBottom: '1.5rem' }}>❓ Sıkça Sorulan Sorular</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { q: 'Telegram KPSS kanalları faydalı mı?', a: 'Evet, günlük soru çözümleri, deneme sınavları ve hazırlık notları paylaşılmaktadır. Binlerce öğrenci bu kanallardan faydalanmaktadır.' },
              { q: 'Hangi KPSS alanları için kanal var?', a: 'Genel Yetenek, Genel Kültür, Eğitim Bilimleri, Alan Bilgisi ve ÖABT dahil tüm alanlar için kanallar mevcuttur.' },
              { q: 'KPSS kanallarına nasıl katılırım?', a: '"Katıl" butonuna tıklayarak Telegram uygulamasından doğrudan kanala katılabilirsiniz.' },
            ].map((faq, i) => (
              <details key={i} style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>{faq.q}</summary>
                <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
        <HiddenKeywordBlock />
      </div>
    </>
  );
}
