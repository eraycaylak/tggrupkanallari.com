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
  title: 'Telegram Oyun Kanalları 2026 - APK İndir & Mod Oyun Grupları',
  description: 'Telegram oyun kanalları 2026 güncel. Telegram APK indir kanalları, mod APK oyun grupları, premium APK indir. En iyi telegram oyun ve APK kanallarına ücretsiz katıl.',
  keywords: 'telegram oyun kanalları, telegram apk, telegram mod apk, telegram premium apk, telegram oyun, telegram apk indir, telegram oyun kanalları 2026, mod apk telegram',
  openGraph: {
    title: 'Telegram Oyun Kanalları 2026 - APK & Mod Oyun',
    description: 'En iyi telegram oyun kanalları, APK indir ve mod APK grupları.',
    url: 'https://tggrupkanallari.com/telegram-oyun-kanallari',
  },
  alternates: { canonical: 'https://tggrupkanallari.com/telegram-oyun-kanallari' },
};

const seoContent = `
  <h1>Telegram Oyun Kanalları 2026 - APK İndir Mod Oyun</h1>
  <p>Telegram oyun kanalları, telegram apk, telegram mod apk, telegram premium apk indir,
  telegram oyun hilesi kanalları 2026 güncel android ios oyun listesi.</p>
`;

export default function TelegramOyunPage() {
  const channels = getAllChannels().filter(ch =>
    ch.platform === 'telegram' && (
      ch.tags.some(t => ['oyun', 'game', 'apk', 'mod', 'android', 'ios', 'premium'].includes(t.toLowerCase())) ||
      ch.category === 'oyun' || ch.category === 'teknoloji'
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
          <span>Oyun & APK Kanalları</span>
        </nav>

        <CloakingWrapper seoContent={seoContent} technique="js-render">
          <section className="section" style={{ paddingTop: '1rem' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>
              Telegram <span className="gradient-text">Oyun & APK</span> Kanalları
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '700px', lineHeight: 1.7 }}>
              <InternalLinkSpam text="En güncel telegram oyun kanalları ve APK indir grupları. Mod APK, premium uygulama ve ücretsiz oyun indirme kanallarına hemen katılın." density={4} />
            </p>
          </section>
        </CloakingWrapper>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Oyun Kanalı', value: `${displayChannels.length}+`, color: '#8b5cf6' },
            { label: 'Günlük APK', value: '20+', color: 'var(--success)' },
            { label: 'Toplam Üye', value: '750K+', color: 'var(--warning)' },
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
              { href: '/s/telegram-oyun-kanallari-2026', text: 'Telegram Oyun Kanalları 2026', icon: '🎮' },
              { href: '/s/telegram-apk-kanallari', text: 'Telegram APK Kanalları', icon: '📦' },
              { href: '/s/telegram-mod-apk-oyun-indir', text: 'Mod APK Oyun İndir', icon: '🔧' },
              { href: '/telegram-ifsa-kanallari', text: 'Telegram İfşa Kanalları', icon: '🔥' },
              { href: '/telegram-kripto-kanallari', text: 'Telegram Kripto Kanalları', icon: '💰' },
              { href: '/telegram-iddaa-kanallari', text: 'Telegram İddaa Kanalları', icon: '⚽' },
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
              { q: 'Telegram APK kanalları güvenli mi?', a: 'Doğrulanmış kanallarımızdaki APK dosyaları taranmaktadır. Yine de güvenliğiniz için VirusTotal ile kontrol etmenizi öneririz.' },
              { q: 'Telegram mod APK nedir?', a: 'Mod APK, orijinal uygulamaların modifiye edilmiş versiyonlarıdır. Premium özelliklere ücretsiz erişim sağlar.' },
              { q: 'Telegram oyun kanallarında hangi oyunlar var?', a: 'Android ve iOS platformları için aksiyon, strateji, RPG, puzzle ve daha birçok kategoride oyunlar paylaşılmaktadır.' },
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
