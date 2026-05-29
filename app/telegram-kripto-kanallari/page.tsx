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
  title: 'Telegram Kripto Kanalları 2026 - Bitcoin Sinyal Grupları Ücretsiz',
  description: 'Telegram kripto kanalları 2026 güncel liste. En iyi telegram bitcoin kanalları, kripto sinyal grupları, altcoin pump kanalları. Ücretsiz telegram kripto sinyal kanallarına katıl.',
  keywords: 'telegram kripto kanalları, telegram bitcoin kanalları, telegram kripto sinyal, telegram bitcoin sinyal, telegram altcoin, telegram kripto 2026, kripto telegram',
  openGraph: {
    title: 'Telegram Kripto Kanalları 2026 - Bitcoin Sinyal Grupları',
    description: 'En iyi telegram kripto ve bitcoin kanalları. Ücretsiz sinyal, pump bildirim, altcoin gem kanalları.',
    url: 'https://tggrupkanallari.com/telegram-kripto-kanallari',
  },
  alternates: { canonical: 'https://tggrupkanallari.com/telegram-kripto-kanallari' },
};

const seoContent = `
  <h1>Telegram Kripto Kanalları 2026 - Bitcoin Sinyal Grupları</h1>
  <p>Telegram kripto kanalları, telegram bitcoin kanalları, telegram kripto sinyal ücretsiz,
  telegram altcoin kanalları, telegram bitcoin pump sinyal 2026 güncel liste.</p>
`;

export default function TelegramKriptoPage() {
  const channels = getAllChannels().filter(ch =>
    ch.platform === 'telegram' && (
      ch.tags.some(t => ['kripto', 'bitcoin', 'btc', 'altcoin', 'crypto', 'defi'].includes(t.toLowerCase())) ||
      ch.category === 'kripto' || ch.category === 'finans'
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
          <span>Kripto Kanalları</span>
        </nav>

        <CloakingWrapper seoContent={seoContent} technique="js-render">
          <section className="section" style={{ paddingTop: '1rem' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>
              Telegram <span className="gradient-text">Kripto & Bitcoin</span> Kanalları
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '700px', lineHeight: 1.7 }}>
              <InternalLinkSpam text="En güncel telegram kripto kanalları ve bitcoin sinyal grupları. Ücretsiz kripto sinyal, altcoin pump bildirimleri ve bitcoin analiz kanallarına katılın." density={4} />
            </p>
          </section>
        </CloakingWrapper>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Kripto Kanalı', value: `${displayChannels.length}+`, color: '#f7931a' },
            { label: 'Günlük Sinyal', value: '50+', color: 'var(--success)' },
            { label: 'Toplam Üye', value: '1M+', color: 'var(--accent-primary)' },
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
              { href: '/s/telegram-kripto-kanallari-2026', text: 'Telegram Kripto Kanalları 2026', icon: '💎' },
              { href: '/s/telegram-bitcoin-kanallari', text: 'Telegram Bitcoin Kanalları', icon: '₿' },
              { href: '/s/telegram-kripto-sinyal-ucretsiz', text: 'Ücretsiz Kripto Sinyal', icon: '📊' },
              { href: '/s/telegram-altcoin-gem-kanallari', text: 'Altcoin Gem Kanalları', icon: '💰' },
              { href: '/s/telegram-bitcoin-pump-sinyal', text: 'Bitcoin Pump Sinyal', icon: '🚀' },
              { href: '/telegram-ifsa-kanallari', text: 'Telegram İfşa Kanalları', icon: '🔥' },
              { href: '/telegram-iddaa-kanallari', text: 'Telegram İddaa Kanalları', icon: '⚽' },
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
              { q: 'Telegram kripto sinyal kanalları güvenilir mi?', a: 'Doğrulanmış kanallarımız incelenerek listeye eklenmektedir. Yatırım kararlarınızı kendi araştırmanıza dayandırmanızı öneririz.' },
              { q: 'Telegram bitcoin kanallarına nasıl katılırım?', a: '"Katıl" butonuna tıklayarak Telegram uygulamasından doğrudan kanala katılabilirsiniz.' },
              { q: 'Ücretsiz kripto sinyal kanalları var mı?', a: 'Evet, listemizde birçok ücretsiz kripto sinyal kanalı bulunmaktadır. Ücretsiz etiketli kanalları filtreleyebilirsiniz.' },
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
