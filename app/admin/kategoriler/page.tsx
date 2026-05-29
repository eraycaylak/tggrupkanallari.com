import { getAllCategories, getChannelsByCategory } from '@/lib/db';
import Link from 'next/link';

export default function AdminKategoriler() {
  const categories = getAllCategories();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>📂 Kategori Yönetimi</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            {categories.length} kategori kayıtlı
          </p>
        </div>
      </div>

      {/* Kategori İstatistikleri */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>📊 Kategori Dağılımı</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {categories.map(cat => {
            const count = getChannelsByCategory(cat.id).length;
            return (
              <div
                key={cat.id}
                style={{
                  padding: '1rem',
                  background: 'var(--bg-glass)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{
                  fontSize: '1.5rem',
                  width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  background: `${cat.color}15`,
                }}>
                  {cat.icon}
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{cat.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {count} kanal
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kategori Tablosu */}
      <div className="admin-card">
        <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>📋 Tüm Kategoriler</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>İkon</th>
              <th>Kategori Adı</th>
              <th>Slug</th>
              <th>Renk</th>
              <th>Kanal Sayısı</th>
              <th>SEO URL</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => {
              const count = getChannelsByCategory(cat.id).length;
              return (
                <tr key={cat.id}>
                  <td style={{ fontSize: '1.25rem' }}>{cat.icon}</td>
                  <td style={{ fontWeight: 600 }}>{cat.name}</td>
                  <td style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    {cat.slug}
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      width: '20px', height: '20px',
                      borderRadius: '4px',
                      background: cat.color,
                      verticalAlign: 'middle',
                    }} />
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                      {cat.color}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: count > 5 ? 'var(--success)' : count > 0 ? 'var(--warning)' : 'var(--danger)',
                    }}>
                      {count}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/kategori/${cat.slug}`}
                      style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}
                    >
                      /kategori/{cat.slug} →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Toplu İşlemler */}
      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>🕸️ Dark SEO — Kategori Spam</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
          Her kategori sayfası otomatik olarak keyword-stuffed meta tag&apos;ler,
          fake schema markup ve internal link spam içerir. Aşağıda her kategorinin
          ürettiği SEO yükü gösterilmektedir.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div style={{
            padding: '1rem', background: 'var(--bg-glass)',
            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {categories.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Kategori Sayfası</div>
          </div>
          <div style={{
            padding: '1rem', background: 'var(--bg-glass)',
            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--warning)' }}>
              {categories.length * 5}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Fake FAQ Schema</div>
          </div>
          <div style={{
            padding: '1rem', background: 'var(--bg-glass)',
            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--danger)' }}>
              {categories.length * 118}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Footer Spam Link</div>
          </div>
        </div>
      </div>
    </div>
  );
}
