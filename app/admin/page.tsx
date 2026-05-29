import { getStats, getAllChannels } from '@/lib/db';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = getStats();
  const recentChannels = getAllChannels().slice(-5).reverse();

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>📊 Dashboard</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        TG Grup Kanallari yönetim paneli
      </p>

      {/* İstatistikler */}
      <div className="admin-stat-grid" style={{ marginBottom: '2rem' }}>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.totalChannels}</div>
          <div className="admin-stat-label">Toplam Kanal</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{(stats.totalMembers / 1000).toFixed(0)}K</div>
          <div className="admin-stat-label">Toplam Üye</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.whatsappCount}</div>
          <div className="admin-stat-label">WhatsApp</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.telegramCount}</div>
          <div className="admin-stat-label">Telegram</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.categoryCount}</div>
          <div className="admin-stat-label">Kategori</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.verifiedCount}</div>
          <div className="admin-stat-label">Doğrulanmış</div>
        </div>
      </div>

      {/* SEO Durumu */}
      <div className="admin-card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>🕸️ Dark SEO Durumu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Doorway Sayfa</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>162</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>81 il × 2 hizmet</div>
          </div>
          <div style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Shadow/Ghost</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)' }}>10</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Sitemap&apos;te gizli</div>
          </div>
          <div style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Sitemap URL</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>~230+</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Toplam index edilecek</div>
          </div>
          <div style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Cloaking</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>AKTİF</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Middleware seviyesi</div>
          </div>
        </div>
      </div>

      {/* Son Eklenen Kanallar */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem' }}>📡 Son Eklenen Kanallar</h2>
          <Link href="/admin/kanallar" className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            Tümünü Gör
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Kanal</th>
              <th>Platform</th>
              <th>Kategori</th>
              <th>Üye</th>
            </tr>
          </thead>
          <tbody>
            {recentChannels.map(ch => (
              <tr key={ch.id}>
                <td style={{ fontWeight: 600 }}>{ch.name}</td>
                <td>
                  <span className={`channel-card-platform ${ch.platform}`} style={{ fontSize: '0.65rem' }}>
                    {ch.platform === 'whatsapp' ? 'WA' : 'TG'}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{ch.category}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{ch.memberCount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hızlı Linkler */}
      <div className="admin-card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>⚡ Hızlı Erişim</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/admin/seo-panel" className="btn btn-primary">🕸️ SEO Paneli</Link>
          <Link href="/admin/doorway" className="btn btn-secondary">🚪 Doorway Üret</Link>
          <Link href="/admin/content-spin" className="btn btn-secondary">🔄 İçerik Döndür</Link>
          <Link href="/sitemap.xml" className="btn btn-secondary" target="_blank">🗺️ Sitemap</Link>
          <Link href="/robots.txt" className="btn btn-secondary" target="_blank">🤖 Robots.txt</Link>
        </div>
      </div>
    </div>
  );
}
