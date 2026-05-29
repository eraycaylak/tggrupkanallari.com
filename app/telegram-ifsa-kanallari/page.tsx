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
  title: 'Telegram İfşa Kanalları 2026 - Türk İfşa Grupları Güncel Liste',
  description: 'Telegram ifşa kanalları 2026 güncel liste. En aktif telegram türk ifşa kanalları, telegram ifşa grupları davet linkleri. Ücretsiz telegram ifşa kanallarına hemen katıl.',
  keywords: 'telegram ifşa, telegram ifşa kanalları, telegram türk ifşa, telegram ifşa grupları, telegram ifşa 2026, türk ifşa kanalları, telegram ifşa linkleri, ifşa telegram',
  openGraph: {
    title: 'Telegram İfşa Kanalları 2026 - Güncel Türk İfşa Kanalları',
    description: 'En aktif telegram ifşa kanalları listesi. Türk ifşa telegram kanalları davet linkleri 2026.',
    url: 'https://tggrupkanallari.com/telegram-ifsa-kanallari',
    siteName: 'tggrupkanallari',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tggrupkanallari.com/telegram-ifsa-kanallari',
  },
};

const seoContent = `
  <h1>Telegram İfşa Kanalları 2026 - Türk İfşa Grupları Güncel</h1>
  <h2>En Aktif Telegram İfşa Kanalları Listesi</h2>
  <p>Telegram ifşa kanalları, telegram türk ifşa, telegram ifşa grupları 2026 güncel liste.
  En popüler telegram ifşa kanalları davet linkleri. Telegram ifşa türk kanalları katıl ücretsiz.
  Telegram ifşa linkleri 2026 güncel aktif kanallar. Türk ifşa telegram kanalları listesi.</p>
  <h3>Telegram İfşa Kanalları Kategorileri</h3>
  <ul>
    <li>Telegram İfşa Kanalları 2026 Güncel</li>
    <li>Telegram Türk İfşa Kanalları</li>
    <li>Telegram İfşa Grupları Davet Linkleri</li>
    <li>Telegram İfşa Linkleri Ücretsiz</li>
  </ul>
`;

export default function TelegramIfsaPage() {
  const channels = getAllChannels().filter(ch =>
    ch.platform === 'telegram' && (
      ch.tags.some(t => ['ifşa', 'adult', 'türk ifşa', '+18'].includes(t.toLowerCase())) ||
      ch.category === 'ifsa' || ch.category === 'yetiskin'
    )
  );

  // Fallback: telegram kanallarından göster
  const displayChannels = channels.length > 0
    ? channels
    : getAllChannels().filter(ch => ch.platform === 'telegram').slice(0, 12);

  return (
    <>
      <FakeSchemaMarkup />

      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Ana Sayfa</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/telegram-kanallari">Telegram Kanalları</Link>
          <span className="breadcrumb-separator">/</span>
          <span>İfşa Kanalları</span>
        </nav>

        <CloakingWrapper seoContent={seoContent} technique="js-render">
          <section className="section" style={{ paddingTop: '1rem' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>
              Telegram <span className="gradient-text">İfşa Kanalları</span> 2026
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '700px', lineHeight: 1.7 }}>
              <InternalLinkSpam
                text="En güncel telegram ifşa kanalları listesi. Türk ifşa telegram kanalları davet linkleri ile aktif gruplara ücretsiz katılın. Telegram ifşa kanalları 2026 güncel liste."
                density={4}
              />
            </p>
          </section>
        </CloakingWrapper>

        {/* İstatistikler */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Aktif Kanal', value: `${displayChannels.length}+`, color: 'var(--danger)' },
            { label: 'Günlük Yeni', value: '15+', color: 'var(--warning)' },
            { label: 'Toplam Üye', value: '500K+', color: 'var(--accent-primary)' },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: '1 1 150px', padding: '1.25rem', borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Kanal Listesi */}
        <div className="channel-grid">
          {displayChannels.map(ch => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>

        {/* Alt Kategoriler — Internal Link Ağı */}
        <section className="section">
          <h2 style={{ marginBottom: '1rem' }}>
            🔗 İlgili Telegram <span className="gradient-text">Kanalları</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
            {[
              { href: '/s/telegram-ifsa-kanallari-2026', text: 'Telegram İfşa Kanalları 2026', icon: '🔥' },
              { href: '/s/telegram-turk-ifsa-kanallari', text: 'Telegram Türk İfşa Kanalları', icon: '🇹🇷' },
              { href: '/s/telegram-ifsa-gruplari-guncel', text: 'Telegram İfşa Grupları Güncel', icon: '📱' },
              { href: '/s/telegram-ifsa-listesi-haziran-2026', text: 'Telegram İfşa Haziran 2026', icon: '📅' },
              { href: '/s/telegram-ifsa-turk-yeni-2026', text: 'Telegram İfşa Türk Yeni', icon: '⭐' },
              { href: '/telegram-kripto-kanallari', text: 'Telegram Kripto Kanalları', icon: '💰' },
              { href: '/telegram-iddaa-kanallari', text: 'Telegram İddaa Kanalları', icon: '⚽' },
              { href: '/telegram-kpss-kanallari', text: 'Telegram KPSS Kanalları', icon: '📚' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                transition: 'all 200ms',
              }}>
                <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{link.text}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ — Schema hedefi */}
        <section className="section">
          <h2 style={{ marginBottom: '1.5rem' }}>❓ Sıkça Sorulan Sorular</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { q: 'Telegram ifşa kanalları nedir?', a: 'Telegram ifşa kanalları, Telegram uygulaması üzerinden içerik paylaşımı yapan kanallardır. Bu kanallar davet linki ile katılım sağlar.' },
              { q: 'Telegram ifşa kanallarına nasıl katılırım?', a: 'Listelediğimiz kanalların yanındaki "Katıl" butonuna tıklayarak direkt Telegram uygulamasından kanala katılabilirsiniz.' },
              { q: 'Telegram türk ifşa kanalları güvenli mi?', a: 'Tüm kanallar kullanıcılarımız tarafından incelenmektedir. Doğrulanmış kanalları tercih etmenizi öneririz.' },
              { q: 'Telegram ifşa kanalları 2026 güncel mi?', a: 'Evet, listemiz her gün güncellenmektedir. En son eklenen kanalları "Yeni Eklenenler" bölümünden görebilirsiniz.' },
            ].map((faq, i) => (
              <details key={i} style={{
                padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
              }}>
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
