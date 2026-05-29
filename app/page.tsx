import Link from "next/link";
import ChannelCard from "@/components/ui/ChannelCard";
import CloakingWrapper from "@/components/seo/CloakingWrapper";
import InternalLinkSpam from "@/components/seo/InternalLinkSpam";
import RotatingContent from "@/components/seo/RotatingContent";
import SearchBar from "@/components/ui/SearchBar";
import {
  getAllCategories,
  getFeaturedChannels,
  getStats,
  getChannelsByPlatform,
} from "@/lib/db";

export default function HomePage() {
  const categories = getAllCategories();
  const featuredChannels = getFeaturedChannels();
  const stats = getStats();
  const whatsappChannels = getChannelsByPlatform("whatsapp").slice(0, 4);
  const telegramChannels = getChannelsByPlatform("telegram").slice(0, 4);

  // 🕸️ DARK SEO: Bot'a gösterilecek keyword spam HTML
  const seoSpamContent = `
    <h1>WhatsApp Grup Linkleri 2026 - Telegram Kanalları Davet Linkleri Güncel</h1>
    <h2>En İyi WhatsApp Grupları ve Telegram Kanalları Listesi</h2>
    <p>WhatsApp grup linkleri, telegram kanal linkleri, whatsapp grupları 2026 güncel listesi. 
    En popüler telegram kanalları, ücretsiz whatsapp grupları, aktif telegram kanalları.
    WhatsApp grup davet linkleri, telegram kanal davet linki. WhatsApp topluluk grupları 2026.
    Istanbul whatsapp grupları, ankara telegram kanalları, izmir whatsapp grupları katıl.</p>
    <h3>Popüler WhatsApp Grup Kategorileri</h3>
    <ul>
      <li>Kripto WhatsApp Grupları - Bitcoin Telegram Kanalları</li>
      <li>Eğitim WhatsApp Grupları - KPSS Telegram Kanalları</li>
      <li>Teknoloji WhatsApp Grupları - Yazılım Telegram Kanalları</li>
      <li>Finans WhatsApp Grupları - Borsa Telegram Kanalları</li>
      <li>Spor WhatsApp Grupları - Futbol Telegram Kanalları</li>
    </ul>
    <h3>Şehirlere Göre WhatsApp Grupları</h3>
    <p>İstanbul WhatsApp grupları, Ankara WhatsApp grupları, İzmir WhatsApp grupları,
    Bursa WhatsApp grupları, Antalya WhatsApp grupları, Konya WhatsApp grupları,
    Adana WhatsApp grupları, Gaziantep WhatsApp grupları, Kayseri WhatsApp grupları.</p>
  `;

  // 🕸️ DARK SEO: Rotating content varyasyonları
  const rotatingVariants = [
    `<p>Türkiye'nin <strong>en kapsamlı</strong> WhatsApp ve Telegram TG Grup Kanallarine hoş geldiniz. <strong>10.000+</strong> aktif grup ve kanala ücretsiz katılın.</p>`,
    `<p><strong>Binlerce</strong> aktif WhatsApp grubu ve Telegram kanalı tek bir yerde! Hemen keşfedin ve topluluğunuzu bulun.</p>`,
    `<p>WhatsApp grup linkleri ve Telegram kanal davet bağlantıları arıyorsanız doğru yerdesiniz. <strong>Her gün güncellenen</strong> dizinimizi inceleyin.</p>`,
  ];

  return (
    <>
      {/* ═══ HERO SECTION ═══ */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">🔥 2026&apos;nın En Güncel TG Grup Kanallari</div>

          {/* 🕸️ DARK SEO: Cloaking - bot'a spam, kullanıcıya normal içerik */}
          <CloakingWrapper seoContent={seoSpamContent} technique="js-render">
            <h1>
              WhatsApp &amp; Telegram
              <br />
              <span className="gradient-text">TG Grup Kanallari</span>
            </h1>
          </CloakingWrapper>

          <p className="hero-subtitle">
            <InternalLinkSpam
              text="Türkiye'nin en büyük WhatsApp ve Telegram TG Grup Kanallari. Binlerce aktif grup ve kanala ücretsiz katılın, topluluklarla bağlantı kurun."
              density={5}
            />
          </p>

          {/* Arama */}
          <SearchBar />

          {/* 🕸️ DARK SEO: Rotating Content */}
          <RotatingContent variants={rotatingVariants} className="hero-subtitle" />

          {/* İstatistikler */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">
                {stats.totalChannels.toLocaleString()}+
              </div>
              <div className="hero-stat-label">Aktif Kanal</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">
                {(stats.totalMembers / 1000).toFixed(0)}K+
              </div>
              <div className="hero-stat-label">Toplam Üye</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">
                {stats.categoryCount}
              </div>
              <div className="hero-stat-label">Kategori</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">
                {stats.verifiedCount}
              </div>
              <div className="hero-stat-label">Doğrulanmış</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KATEGORİLER ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">📂 Kategoriler</h2>
            <Link href="/kategoriler" className="section-link">
              Tümünü Gör →
            </Link>
          </div>
          <div className="category-grid stagger-children">
            {categories.slice(0, 12).map((cat) => (
              <Link
                key={cat.id}
                href={`/kategori/${cat.slug}`}
                className="category-card"
                title={`${cat.name} WhatsApp Grupları Telegram Kanalları 2026 Güncel Aktif Ücretsiz Katıl`}
              >
                <div
                  className="category-icon"
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>
                <div className="category-card-name">{cat.name}</div>
                <div className="category-card-count">
                  {cat.description}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POPÜLER KANALLAR ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">⭐ Öne Çıkan Kanallar</h2>
            <Link href="/populer" className="section-link">
              Tümünü Gör →
            </Link>
          </div>
          <div className="channel-grid stagger-children">
            {featuredChannels.slice(0, 8).map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SPONSOR / REKLAM VE KANAL EKLE BANNERI ═══ */}
      <section className="section" style={{ padding: '1rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-glow)',
          }} className="promo-banner">
            <div style={{
              position: 'absolute',
              top: '-50px', left: '-50px',
              width: '150px', height: '150px',
              background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-50px', right: '-50px',
              width: '150px', height: '150px',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--accent-primary)',
                background: 'rgba(99, 102, 241, 0.12)',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-block',
                marginBottom: '1rem',
              }}>
                📢 Reklam, Sponsorluk & Öne Çıkarma
              </span>
              
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>
                Kanalınızı veya Grubunuzu <span className="gradient-text">Binlerce Kişiye</span> Tanıtın
              </h2>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                WhatsApp grubunuzu veya Telegram kanalınızı sitemize ücretsiz ekleyebilir ya da premium öne çıkarma paketlerimizle (ana sayfa sabitleme, doğrulanmış rozeti, anında onay) günde binlerce organik üye kazanabilirsiniz.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://t.me/destektgkanalicom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 2rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                  }}
                >
                  ✈️ Telegram&apos;dan Reklam Ver
                </a>
                <Link
                  href="/kanal-ekle"
                  className="btn btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 2rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                  }}
                >
                  ➕ Ücretsiz Kanal Ekle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHATSAPP GRUPLARI ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              📱 WhatsApp Grupları
            </h2>
            <Link href="/whatsapp-gruplari" className="section-link">
              Tümünü Gör →
            </Link>
          </div>
          <div className="channel-grid stagger-children">
            {whatsappChannels.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TELEGRAM KANALLARI ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              ✈️ Telegram Kanalları
            </h2>
            <Link href="/telegram-kanallari" className="section-link">
              Tümünü Gör →
            </Link>
          </div>
          <div className="channel-grid stagger-children">
            {telegramChannels.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEO: FAQ İçerik Bloğu (görünür ama keyword-stuffed) ═══ */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            ❓ Sıkça Sorulan Sorular
          </h2>
          <div style={{ maxWidth: '800px' }}>
            <details style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer' }}>
                WhatsApp grup linkleri nasıl bulunur?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <InternalLinkSpam
                  text="WhatsApp grup linkleri tggrupkanallari üzerinden kolayca bulunabilir. Binlerce aktif WhatsApp grubu kategorilere göre listelenmiştir. WhatsApp grup davet linkleri 2026 güncel listesine ücretsiz erişebilirsiniz. Telegram kanalları ve WhatsApp toplulukları tek bir platformda."
                  density={3}
                />
              </p>
            </details>
            <details style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer' }}>
                Telegram kanallarına nasıl katılınır?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <InternalLinkSpam
                  text="Telegram kanallarına katılmak çok kolaydır. Dizinimizden istediğiniz Telegram kanalını seçip davet linkine tıklayın. Telegram uygulaması otomatik olarak açılacak ve kanala katılabileceksiniz. Tüm Telegram grupları ve kanalları ücretsizdir."
                  density={3}
                />
              </p>
            </details>
            <details style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer' }}>
                En popüler WhatsApp grupları hangileri?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <InternalLinkSpam
                  text="En popüler WhatsApp grupları kripto para, borsa, eğitim, teknoloji ve spor kategorilerindedir. Yapay zeka, KPSS hazırlık ve oyun grupları da çok aktif. İstanbul, Ankara ve İzmir şehirlerinde yerel gruplar da mevcuttur."
                  density={3}
                />
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
