import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
      <h1 style={{ marginBottom: '0.75rem' }}>
        Sayfa <span className="gradient-text">Bulunamadı</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
        Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="navbar-cta" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
          🏠 Ana Sayfaya Dön
        </Link>
        <Link href="/kategoriler" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
          📂 Kategoriler
        </Link>
      </div>
    </div>
  );
}
