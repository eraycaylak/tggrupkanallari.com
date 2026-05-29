/**
 * 🕸️ DARK SEO: Shadow Pages
 * 
 * Navigasyonda görünmeyen ama Google'da index alan sayfalar.
 * Sitemap'te var, menüde yok. Sadece crawler keşfeder.
 */

import type { Metadata } from 'next';
import ghostPagesData from '@/data/ghost-pages.json';
import { generateShadowContent } from '@/lib/content-spinner';
import { generateSpamMeta } from '@/lib/keyword-injector';
import InternalLinkSpam from '@/components/seo/InternalLinkSpam';
import HiddenKeywordBlock from '@/components/seo/HiddenKeywordBlock';

interface PageProps {
  params: Promise<{ 'shadow-slug': string }>;
}

export async function generateStaticParams() {
  return ghostPagesData
    .filter(p => p.type === 'shadow')
    .map(p => ({ 'shadow-slug': p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'shadow-slug': slug } = await params;
  const page = ghostPagesData.find(p => p.slug === slug);
  if (!page) return {};

  return generateSpamMeta({
    pageTitle: page.title,
    pageDescription: `${page.title}. ${page.keywords.join(', ')}. Ücretsiz katılın!`,
    pageUrl: `https://tggrupkanallari.com/s/${slug}`,
    keywords: page.keywords,
  });
}

export default async function ShadowPage({ params }: PageProps) {
  const { 'shadow-slug': slug } = await params;
  const page = ghostPagesData.find(p => p.slug === slug);

  if (!page) {
    return <div className="container section"><p>Sayfa bulunamadı.</p></div>;
  }

  const content = generateShadowContent(page.title, page.keywords);

  return (
    <div className="container">
      <section className="section">
        <h1 style={{ marginBottom: '1rem' }}>{page.title}</h1>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '800px' }}>
          {content.split('\n\n').map((p, i) => (
            <p key={i} style={{ marginBottom: '1rem' }}>
              <InternalLinkSpam text={p} density={3} />
            </p>
          ))}
        </div>

        {/* Keyword tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          {page.keywords.map(kw => (
            <span key={kw} className="tag">{kw}</span>
          ))}
        </div>

        <HiddenKeywordBlock customKeywords={page.keywords} />
      </section>
    </div>
  );
}
