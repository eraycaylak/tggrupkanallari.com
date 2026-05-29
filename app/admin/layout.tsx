'use client';

import Link from 'next/link';
import AdminAuth from '@/components/admin/AdminAuth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuth>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <Link href="/admin" className="admin-sidebar-logo">
            ⚡ <span>Admin <span className="gradient-text">Panel</span></span>
          </Link>

          <nav className="admin-sidebar-nav">
            <Link href="/admin">📊 Dashboard</Link>
            <Link href="/admin/kanallar">📡 Kanallar</Link>
            <Link href="/admin/kategoriler">📂 Kategoriler</Link>
            <Link href="/admin/seo-panel">🕸️ SEO Kontrol</Link>
            <div style={{ margin: '0.75rem 0', borderTop: '1px solid var(--border)' }} />
            <Link href="/admin/doorway">🚪 Doorway Üretici</Link>
            <Link href="/admin/content-spin">🔄 İçerik Döndürücü</Link>
            <div style={{ margin: '0.75rem 0', borderTop: '1px solid var(--border)' }} />
            <Link href="/sitemap.xml" target="_blank">🗺️ Sitemap</Link>
            <Link href="/robots.txt" target="_blank">🤖 Robots.txt</Link>
            <div style={{ margin: '1rem 0', borderTop: '1px solid var(--border)' }} />
            <Link href="/">← Siteye Dön</Link>
          </nav>
        </aside>

        <div className="admin-content">
          {children}
        </div>
      </div>
    </AdminAuth>
  );
}
