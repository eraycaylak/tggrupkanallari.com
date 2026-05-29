import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getChannelsByCategory, getAllCategories } from '@/lib/db';
import { generateSpamMeta } from '@/lib/keyword-injector';
import ChannelCard from '@/components/ui/ChannelCard';
import InternalLinkSpam from '@/components/seo/InternalLinkSpam';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map(cat => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return generateSpamMeta({
    pageTitle: `${category.name} WhatsApp Grupları & Telegram Kanalları`,
    pageDescription: `${category.name} kategorisindeki en iyi WhatsApp grupları ve Telegram kanalları. ${category.description}`,
    pageUrl: `https://tggrupkanallari.com/kategori/${slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const channels = getChannelsByCategory(category.id);

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link href="/">Ana Sayfa</Link>
        <span className="breadcrumb-separator">/</span>
        <Link href="/kategoriler">Kategoriler</Link>
        <span className="breadcrumb-separator">/</span>
        <span>{category.name}</span>
      </nav>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div className="category-icon" style={{
            background: `${category.color}15`,
            fontSize: '2.5rem',
            width: '64px',
            height: '64px',
          }}>
            {category.icon}
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem' }}>{category.name} Kanalları</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              <InternalLinkSpam text={category.description} density={3} />
            </p>
          </div>
        </div>

        <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
          {channels.length} kanal bulundu
        </p>

        <div className="channel-grid stagger-children">
          {channels.map(ch => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>

        {channels.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</p>
            <p>Bu kategoride henüz kanal bulunmuyor.</p>
            <Link href="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Ana Sayfaya Dön
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
