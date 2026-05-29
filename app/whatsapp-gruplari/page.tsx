import type { Metadata } from 'next';
import Link from 'next/link';
import { getChannelsByPlatform } from '@/lib/db';
import { generateSpamMeta } from '@/lib/keyword-injector';
import ChannelCard from '@/components/ui/ChannelCard';

export const metadata: Metadata = generateSpamMeta({
  pageTitle: 'WhatsApp Grupları - Güncel Grup Linkleri 2026',
  pageDescription: 'En popüler ve aktif WhatsApp grupları listesi. Ücretsiz WhatsApp grup davet linkleri ile hemen katılın.',
  pageUrl: 'https://tggrupkanallari.com/whatsapp-gruplari',
});

export default function WhatsAppPage() {
  const channels = getChannelsByPlatform('whatsapp');

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link href="/">Ana Sayfa</Link>
        <span className="breadcrumb-separator">/</span>
        <span>WhatsApp Grupları</span>
      </nav>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          📱 WhatsApp <span className="gradient-text">Grupları</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
          Türkiye&apos;nin en aktif WhatsApp grupları. Hemen katılın ve topluluklarla bağlantı kurun.
        </p>
        <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
          {channels.length} WhatsApp grubu listelendi
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
