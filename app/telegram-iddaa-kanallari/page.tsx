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
  title: 'Telegram İddaa Kanalları 2026 - Banko Kupon Paylaşım Grupları',
  description: 'Telegram iddaa kanalları 2026 güncel. En iyi telegram iddaa tahmin kanalları, banko kupon paylaşım grupları. Telegram iddaa kupon kanallarına ücretsiz katıl.',
  keywords: 'telegram iddaa, telegram iddaa kanalları, telegram kupon, telegram banko kupon, telegram iddaa tahmin, telegram kupon paylaşım, iddaa telegram kanalları',
  openGraph: {
    title: 'Telegram İddaa Kanalları 2026 - Banko Kupon & Tahmin',
    description: 'En kazandıran telegram iddaa kanalları ve kupon paylaşım grupları.',
    url: 'https://tggrupkanallari.com/telegram-iddaa-kanallari',
  },
  alternates: { canonical: 'https://tggrupkanallari.com/telegram-iddaa-kanallari' },
};

const seoContent = `
  <h1>Telegram İddaa Kanalları 2026 - Banko Kupon Paylaşım</h1>
  <p>Telegram iddaa kanalları, telegram kupon, telegram iddaa tahmin, telegram banko kupon,
  telegram iddaa kupon paylaşım 2026 güncel kazandıran kanallar listesi.</p>
`;

export default function TelegramIddaaPage() {
  const channels = getAllChannels().filter(ch =>
    ch.platform === 'telegram' && (
      ch.tags.some(t => ['iddaa', 'bahis', 'kupon', 'spor', 'futbol', 'banko'].includes(t.toLowerCase())) ||
      ch.category === 'spor'
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
          <span>İddaa Kanalları</span>
        </nav>

        <CloakingWrapper seoContent={seoContent} technique="js-render">
          <section className="section" style={{ paddingTop: '1rem' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>
              Telegram <span className="gradient-text">İddaa & Kupon</span> Kanalları
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '700px', lineHeight: 1.7 }}>
              <InternalLinkSpam text="En kazandıran telegram iddaa kanalları ve banko kupon paylaşım grupları. Telegram iddaa tahmin kanallarına ücretsiz katılın, günlük kuponları takip edin." density={4} />
            </p>
          </section>
        </CloakingWrapper>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'İddaa Kanalı', value: `${displayChannels.length}+`, color: 'var(--success)' },
            { label: 'Günlük Kupon', value: '30+', color: 'var(--warning)' },
            { label: 'Kazanma Oranı', value: '%78', color: 'var(--danger)' },
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
              { href: '/s/telegram-iddaa-kanallari-2026', text: 'Telegram İddaa Kanalları 2026', icon: '⚽' },
              { href: '/s/telegram-iddaa-kupon-kanallari', text: 'Telegram Kupon Kanalları', icon: '🎫' },
              { href: '/s/telegram-iddaa-banko-kupon-guncel', text: 'Banko Kupon Güncel', icon: '🎯' },
              { href: '/telegram-kripto-kanallari', text: 'Telegram Kripto Kanalları', icon: '💰' },
              { href: '/telegram-ifsa-kanallari', text: 'Telegram İfşa Kanalları', icon: '🔥' },
              { href: '/telegram-kpss-kanallari', text: 'Telegram KPSS Kanalları', icon: '📚' },
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
              { q: 'Telegram iddaa kanalları güvenilir mi?', a: 'Doğrulanmış kanallarımız geçmiş performanslarına göre değerlendirilmektedir. Bahis kararlarınızı kendi analizinize dayandırmanızı öneririz.' },
              { q: 'Telegram banko kupon kanalları ücretsiz mi?', a: 'Listemizde hem ücretsiz hem VIP kupon kanalları bulunmaktadır. Ücretsiz kanallardan da yüksek oranlı kuponlar paylaşılmaktadır.' },
              { q: 'Telegram iddaa tahmin kanallarına nasıl katılırım?', a: '"Katıl" butonuna tıklayarak Telegram uygulamasından doğrudan kanala katılabilirsiniz.' },
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
