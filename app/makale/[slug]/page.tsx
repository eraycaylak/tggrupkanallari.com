import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUnlockedArticles, getArticleBySlug, getLatestArticles } from '@/lib/blog';
import { getFeaturedChannels } from '@/lib/db';
import ChannelCard from '@/components/ui/ChannelCard';
import HiddenKeywordBlock from '@/components/seo/HiddenKeywordBlock';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Tells Next.js to pre-compile only the currently unlocked articles
 */
export async function generateStaticParams() {
  const articles = getUnlockedArticles();
  return articles.map(art => ({ slug: art.slug }));
}

/**
 * Generates premium metadata including SEO title, description, and canonical URL
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const art = getArticleBySlug(slug);
  if (!art) return {};

  return {
    metadataBase: new URL('https://tggrupkanallari.com'),
    title: `${art.title} - tggrupkanallari`,
    description: art.description,
    alternates: {
      canonical: `https://tggrupkanallari.com/makale/${slug}`,
    },
    openGraph: {
      title: art.title,
      description: art.description,
      url: `https://tggrupkanallari.com/makale/${slug}`,
      type: 'article',
    }
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const art = getArticleBySlug(slug);

  if (!art) {
    notFound();
  }

  // Pre-calculate date string
  const pubDate = new Date(new Date('2026-05-25').getTime() + art.publishDayIndex * 24 * 60 * 60 * 1000);
  const dateString = pubDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const recentArticles = getLatestArticles(4).filter(a => a.id !== art.id);
  const featuredChannels = getFeaturedChannels(false).slice(0, 4);

  // 🕸️ DARK SEO: Inject Google FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": art.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      {/* 🕸️ Google FAQ Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumb">
          <Link href="/">Ana Sayfa</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/makaleler">Makaleler</Link>
          <span className="breadcrumb-separator">/</span>
          <span style={{
            display: 'inline-block',
            maxWidth: '250px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            verticalAlign: 'bottom'
          }}>{art.title}</span>
        </nav>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem', margin: '1rem 0 3rem' }}>
          {/* Main Article Content */}
          <main className="admin-card" style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            {/* Meta */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="tag" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>{art.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>📅 {dateString}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>✓ Editör Onaylı</span>
            </div>

            <h1 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', lineHeight: 1.3 }}>{art.title}</h1>

            {/* Article body */}
            <div
              className="article-content"
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: '0.95rem'
              }}
              dangerouslySetInnerHTML={{ __html: art.content }}
            />

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              {art.tags.map(tag => (
                <span key={tag} className="tag" style={{ background: 'var(--bg-glass)', fontSize: '0.75rem' }}>#{tag}</span>
              ))}
            </div>

            {/* FAQ Accordion Section */}
            <section style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>❓ Sıkça Sorulan Sorular</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {art.faqs.map((faq, i) => (
                  <details key={i} style={{
                    padding: '1rem',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>{faq.q}</summary>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Popüler Kanallar */}
            {featuredChannels.length > 0 && (
              <div className="admin-card" style={{ padding: '1.25rem', background: 'var(--bg-card)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                  🔥 Öne Çıkan Kanallar
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {featuredChannels.map(ch => (
                    <div key={ch.id} style={{ borderBottom: '1px dashed var(--border)', paddingBottom: '0.75rem' }}>
                      <Link href={`/kanal/${ch.slug}`} style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-primary)', textDecoration: 'none' }}>
                        {ch.name}
                      </Link>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                        <span>👥 {ch.memberCount.toLocaleString()} Üye</span>
                        <span style={{ textTransform: 'uppercase' }}>{ch.platform}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Son Eklenen Makaleler */}
            {recentArticles.length > 0 && (
              <div className="admin-card" style={{ padding: '1.25rem', background: 'var(--bg-card)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                  📰 Son Yazılarımız
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {recentArticles.map(a => (
                    <div key={a.id}>
                      <Link href={`/makale/${a.slug}`} style={{ fontSize: '0.8rem', color: 'var(--text-primary)', textDecoration: 'none', lineHeight: 1.4, display: 'block', fontWeight: 500 }}>
                        {a.title}
                      </Link>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{a.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        <HiddenKeywordBlock customKeywords={art.tags} />
      </div>
    </>
  );
}
