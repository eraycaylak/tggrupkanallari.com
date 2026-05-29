import type { Metadata } from 'next';
import Link from 'next/link';
import { getChannelsByPlatform } from '@/lib/db';
import { generateSpamMeta } from '@/lib/keyword-injector';
import ChannelCard from '@/components/ui/ChannelCard';

export const metadata: Metadata = generateSpamMeta({
  pageTitle: 'Telegram Kanalları - Güncel Kanal Linkleri 2026',
  pageDescription: 'En popüler ve aktif Telegram kanalları listesi. Telegram kanal davet linkleri ile hemen katılın.',
  pageUrl: 'https://tggrupkanallari.com/telegram-kanallari',
});

export default function TelegramPage() {
  const channels = getChannelsByPlatform('telegram');

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link href="/">Ana Sayfa</Link>
        <span className="breadcrumb-separator">/</span>
        <span>Telegram Kanalları</span>
      </nav>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          ✈️ Telegram <span className="gradient-text">Kanalları</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
          Türkiye&apos;nin en aktif Telegram kanalları. Hemen katılın ve içerikleri keşfedin.
        </p>
        <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
          {channels.length} Telegram kanalı listelendi
        </p>

        <div className="channel-grid stagger-children">
          {channels.map(ch => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>
      </section>
    </div>
  );
}
