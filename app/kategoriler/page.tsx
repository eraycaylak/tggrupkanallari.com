import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCategories, getChannelsByCategory } from '@/lib/db';
import { generateSpamMeta } from '@/lib/keyword-injector';

export const metadata: Metadata = generateSpamMeta({
  pageTitle: 'Tüm Kategoriler - WhatsApp & Telegram TG Grup Kanallari',
  pageDescription: 'WhatsApp grup ve Telegram kanal kategorileri. Teknoloji, finans, eğitim, spor ve daha fazlası.',
  pageUrl: 'https://tggrupkanallari.com/kategoriler',
});

export default function KategorilerPage() {
  const categories = getAllCategories();

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link href="/">Ana Sayfa</Link>
        <span className="breadcrumb-separator">/</span>
        <span>Kategoriler</span>
      </nav>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          📂 Tüm <span className="gradient-text">Kategoriler</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          İlgi alanınıza göre WhatsApp grupları ve Telegram kanalları keşfedin.
        </p>

        <div className="category-grid stagger-children">
          {categories.map(cat => {
            const count = getChannelsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/kategori/${cat.slug}`}
                className="category-card"
                title={`${cat.name} WhatsApp Grupları Telegram Kanalları 2026`}
              >
                <div className="category-icon" style={{ background: `${cat.color}15` }}>
                  {cat.icon}
                </div>
                <div className="category-card-name">{cat.name}</div>
                <div className="category-card-count">{count} kanal</div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
