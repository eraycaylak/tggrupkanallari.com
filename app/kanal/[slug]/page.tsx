import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getChannelBySlug, getRelatedChannels, getAllChannels, getCategoryById, formatMemberCount } from '@/lib/db';
import { generateSpamMeta } from '@/lib/keyword-injector';
import ChannelCard from '@/components/ui/ChannelCard';
import InternalLinkSpam from '@/components/seo/InternalLinkSpam';
import HiddenKeywordBlock from '@/components/seo/HiddenKeywordBlock';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const channels = getAllChannels();
  return channels.map(ch => ({ slug: ch.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const channel = getChannelBySlug(slug);
  if (!channel) return {};

  return generateSpamMeta({
    pageTitle: `${channel.name} - ${channel.platform === 'whatsapp' ? 'WhatsApp Grubu' : 'Telegram Kanalı'}`,
    pageDescription: channel.description,
    pageUrl: `https://tggrupkanallari.com/kanal/${channel.slug}`,
    keywords: [
      ...channel.tags,
      `${channel.name} katıl`,
      `${channel.name} link`,
      `${channel.platform} ${channel.name}`,
    ],
  });
}

export default async function ChannelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const channel = getChannelBySlug(slug);
  if (!channel) notFound();

  const relatedChannels = getRelatedChannels(channel, 4);
  const category = getCategoryById(channel.category);

  return (
    <div className="channel-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Ana Sayfa</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href={`/${channel.platform === 'whatsapp' ? 'whatsapp-gruplari' : 'telegram-kanallari'}`}>
            {channel.platform === 'whatsapp' ? 'WhatsApp Grupları' : 'Telegram Kanalları'}
          </Link>
          <span className="breadcrumb-separator">/</span>
          {category && (
            <>
              <Link href={`/kategori/${category.slug}`}>{category.name}</Link>
              <span className="breadcrumb-separator">/</span>
            </>
          )}
          <span>{channel.name}</span>
        </nav>

        {/* Header */}
        <div className="channel-detail-header">
          <div className={`channel-detail-icon ${channel.platform}`}>
            {channel.platform === 'whatsapp' ? '📱' : '✈️'}
          </div>
          <div className="channel-detail-info">
            <h1>{channel.name}</h1>
            <div className="channel-detail-badges">
              <span className={`channel-card-platform ${channel.platform}`}>
                {channel.platform === 'whatsapp' ? '📱 WhatsApp' : '✈️ Telegram'}
              </span>
              {channel.verified && (
                <span className="tag" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>
                  ✓ Doğrulanmış
                </span>
              )}
              {category && (
                <span className="tag" style={{ background: `${category.color}15`, color: category.color }}>
                  {category.icon} {category.name}
                </span>
              )}
              <span className="tag">👥 {formatMemberCount(channel.memberCount)} üye</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="channel-detail-desc">
          <InternalLinkSpam text={channel.description} density={3} />
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {channel.tags.map(tag => (
            <span key={tag} className="tag" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Join Button */}
        <a
          href={channel.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`channel-detail-join ${channel.platform}`}
          title={`${channel.name} WhatsApp Grup Telegram Kanal Katıl Link Davet 2026 Güncel Ücretsiz`}
        >
          {channel.platform === 'whatsapp' ? '📱 WhatsApp Grubuna Katıl' : '✈️ Telegram Kanalına Katıl'} →
        </a>

        {/* SEO: Keyword-stuffed görünür paragraf */}
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            {channel.name} Hakkında
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem' }}>
            <InternalLinkSpam
              text={`${channel.name}, ${channel.platform === 'whatsapp' ? 'WhatsApp' : 'Telegram'} üzerindeki en aktif ${category?.name || ''} kanallarından biridir. ${formatMemberCount(channel.memberCount)} üye ile büyüyen bu toplulukta ${channel.tags.join(', ')} konularında güncel içerikler paylaşılmaktadır. Ücretsiz katılım ile hemen gruba dahil olabilirsiniz. WhatsApp grup linkleri ve Telegram kanal davet bağlantıları dizinimizde sürekli güncellenmektedir.`}
              density={3}
            />
          </p>
        </div>

        {/* Related Channels */}
        {relatedChannels.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">🔗 Benzer Kanallar</h2>
            </div>
            <div className="channel-grid stagger-children">
              {relatedChannels.map(ch => (
                <ChannelCard key={ch.id} channel={ch} />
              ))}
            </div>
          </section>
        )}

        {/* 🕸️ DARK SEO: Sayfa bazlı hidden keywords */}
        <HiddenKeywordBlock
          customKeywords={[
            `${channel.name} katıl`,
            `${channel.name} link`,
            `${channel.name} davet`,
            `${channel.platform} ${channel.name}`,
            ...channel.tags.map(t => `${t} ${channel.platform} grubu`),
            ...channel.tags.map(t => `${t} kanal link`),
          ]}
        />
      </div>
    </div>
  );
}
