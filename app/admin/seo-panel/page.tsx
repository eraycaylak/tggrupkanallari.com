/**
 * 🕸️ SEO Kontrol Paneli
 * Tüm dark SEO tekniklerinin açıklama ve toggle'ları
 */

export default function SEOPanelPage() {
  const techniques = [
    {
      name: 'Hidden Keyword Blocks',
      desc: 'CSS ile gizlenen dev keyword paragrafları (display:none, font-size:0, offscreen)',
      risk: 'danger',
      active: true,
      location: 'layout.tsx → HiddenKeywordBlock',
    },
    {
      name: 'Fake Schema Markup',
      desc: 'Sahte AggregateRating (4.9/5), uydurma FAQ, sahte Review schema',
      risk: 'danger',
      active: true,
      location: 'layout.tsx → FakeSchemaMarkup',
    },
    {
      name: 'Footer Link Farm',
      desc: 'Footer\'da 200+ keyword-anchor-text link (şehir × hizmet kombinasyonları)',
      risk: 'warning',
      active: true,
      location: 'Footer.tsx → FooterLinkFarm',
    },
    {
      name: 'Internal Link Spam',
      desc: 'İçerikteki her keyword\'ü otomatik dahili sayfaya linkleme',
      risk: 'warning',
      active: true,
      location: 'InternalLinkSpam component',
    },
    {
      name: 'Keyword Stuffed Meta',
      desc: 'Title, description, OG tags, alt text\'lere keyword spam',
      risk: 'warning',
      active: true,
      location: 'lib/keyword-injector.ts',
    },
    {
      name: 'UA-Based Cloaking',
      desc: 'Googlebot/Bingbot algılayıp farklı response header\'lar gönderme',
      risk: 'danger',
      active: true,
      location: 'middleware.ts',
    },
    {
      name: 'JS Render Cloaking',
      desc: 'SSR\'da bot\'a keyword spam, client hydration sonrası normal içerik',
      risk: 'danger',
      active: true,
      location: 'CloakingWrapper component',
    },
    {
      name: 'Cookie-Based Cloaking',
      desc: 'İlk ziyarette cookie set, cookie olmayanlara (bot) farklı davranış',
      risk: 'danger',
      active: true,
      location: 'middleware.ts',
    },
    {
      name: 'Time-Based Cloaking',
      desc: 'Gece saatlerinde (bot crawl zamanı) farklı mod',
      risk: 'danger',
      active: true,
      location: 'middleware.ts',
    },
    {
      name: 'AI Doorway Matrix',
      desc: '81 il × 2 hizmet = 162 otomatik doorway sayfası',
      risk: 'danger',
      active: true,
      location: 'app/[city]/[service]/page.tsx',
    },
    {
      name: 'Content Spinning',
      desc: 'Eş anlamlı sözlük ile her doorway sayfaya unique spun content',
      risk: 'warning',
      active: true,
      location: 'lib/content-spinner.ts',
    },
    {
      name: 'Shadow Pages',
      desc: 'Menüde görünmeyen ama index alan landing page\'ler',
      risk: 'warning',
      active: true,
      location: 'app/s/[shadow-slug]/page.tsx',
    },
    {
      name: 'Ghost Pages',
      desc: 'Sitemap\'te var ama kullanıcı navigasyonunda olmayan sayfalar',
      risk: 'warning',
      active: true,
      location: 'sitemap.xml/route.ts',
    },
    {
      name: 'Sitemap Spam',
      desc: '230+ URL, priority:1.0, changefreq:hourly, günlük lastmod',
      risk: 'warning',
      active: true,
      location: 'app/sitemap.xml/route.ts',
    },
    {
      name: 'Hidden Iframe',
      desc: 'Görünmeyen iframe ile shadow sayfa içeriklerini yükleme',
      risk: 'danger',
      active: true,
      location: 'layout.tsx → HiddenIframe',
    },
    {
      name: 'CTR Emulation',
      desc: 'Otomatik scroll, fake mouse event, time-on-page manipülasyonu',
      risk: 'danger',
      active: true,
      location: 'layout.tsx → CTREmulator',
    },
    {
      name: 'Rotating Content',
      desc: 'Aynı URL\'de cookie bazlı farklı keyword içerikleri',
      risk: 'warning',
      active: true,
      location: 'RotatingContent component',
    },
    {
      name: 'Sneaky Redirect (Hazır)',
      desc: 'Mobil kullanıcıyı farklı yere yönlendirme (şu an devre dışı)',
      risk: 'danger',
      active: false,
      location: 'middleware.ts (commented out)',
    },
    {
      name: 'Render-Delay Manipulation',
      desc: 'İlk render SEO spam, 2sn sonra JS ile normal içeriğe swap',
      risk: 'danger',
      active: true,
      location: 'CloakingWrapper (delay mode)',
    },
    {
      name: 'Canonical Manipulation',
      desc: 'Bot\'a response header ile canonical gönderme',
      risk: 'warning',
      active: true,
      location: 'middleware.ts (Googlebot canonical)',
    },
    {
      name: 'noscript Keyword Spam',
      desc: 'noscript tag içine keyword spam (JS çalışmayan crawlerlar için)',
      risk: 'warning',
      active: true,
      location: 'CloakingWrapper component',
    },
  ];

  const dangerCount = techniques.filter(t => t.risk === 'danger' && t.active).length;
  const warningCount = techniques.filter(t => t.risk === 'warning' && t.active).length;
  const totalActive = techniques.filter(t => t.active).length;

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>🕸️ SEO Kontrol Paneli</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Tüm karanlık SEO tekniklerinin durumu ve açıklamaları
      </p>

      {/* Özet */}
      <div className="admin-stat-grid" style={{ marginBottom: '2rem' }}>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ WebkitTextFillColor: 'var(--success)' }}>{totalActive}</div>
          <div className="admin-stat-label">Aktif Teknik</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ WebkitTextFillColor: 'var(--danger)' }}>{dangerCount}</div>
          <div className="admin-stat-label">Yüksek Risk</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ WebkitTextFillColor: 'var(--warning)' }}>{warningCount}</div>
          <div className="admin-stat-label">Orta Risk</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ WebkitTextFillColor: 'var(--text-tertiary)' }}>{techniques.length - totalActive}</div>
          <div className="admin-stat-label">Devre Dışı</div>
        </div>
      </div>

      {/* Uyarı */}
      <div style={{
        padding: '1rem 1.5rem',
        background: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2rem',
        fontSize: '0.85rem',
        color: 'var(--danger)',
        lineHeight: 1.7,
      }}>
        ⚠️ <strong>EĞİTİMSEL AMAÇLI:</strong> Bu teknikler gerçek bir sitede kullanıldığında Google tarafından cezalandırılır. Bu proje sadece öğretim amaçlıdır.
      </div>

      {/* Teknik Listesi */}
      <div className="admin-card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Teknik Listesi</h2>
        {techniques.map((tech, index) => (
          <div key={index} className="seo-technique-card">
            <div className="seo-technique-info">
              <div className="seo-technique-name">
                {tech.active ? '🟢' : '🔴'} {tech.name}
              </div>
              <div className="seo-technique-desc">{tech.desc}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
                📁 {tech.location}
              </div>
            </div>
            <span className={`seo-technique-badge ${tech.risk}`}>
              {tech.risk === 'danger' ? '🔴 Yüksek' : '🟡 Orta'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
