import Link from 'next/link';
import { getAllCategories } from '@/lib/db';
import FooterLinkFarm from '@/components/seo/FooterLinkFarm';

export default function Footer() {
  const categories = getAllCategories();
  const topCategories = categories.slice(0, 8);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="navbar-logo" style={{ marginBottom: '0.5rem' }}>
              <span className="logo-icon">📡</span>
              <span>Kanal<span className="gradient-text">Dizini</span></span>
            </Link>
            <p>
              Türkiye&apos;nin en kapsamlı WhatsApp ve Telegram TG Grup Kanallari.
              Binlerce aktif grup ve kanala ücretsiz katılın, topluluklarla bağlantı kurun.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Platform</div>
            <Link href="/whatsapp-gruplari">WhatsApp Grupları</Link>
            <Link href="/telegram-kanallari">Telegram Kanalları</Link>
            <Link href="/kategoriler">Tüm Kategoriler</Link>
            <Link href="/yeni-eklenenler">Yeni Eklenenler</Link>
            <Link href="/populer">Popüler Kanallar</Link>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Kategoriler</div>
            {topCategories.map(cat => (
              <Link key={cat.id} href={`/kategori/${cat.slug}`}>
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Bilgi</div>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/kanal-ekle">Kanal Ekle</Link>
            <Link href="/iletisim">İletişim</Link>
            <Link href="/gizlilik">Gizlilik Politikası</Link>
            <Link href="/sss">Sıkça Sorulan Sorular</Link>
          </div>
        </div>

        {/* 🕸️ DARK SEO: Footer Link Farm */}
        <FooterLinkFarm />

        <div className="footer-bottom">
          <span>© 2026 tggrupkanallari. Tüm hakları saklıdır.</span>
          <span>WhatsApp ve Telegram ilgili şirketlerinin tescilli markalarıdır.</span>
        </div>
      </div>
    </footer>
  );
}
