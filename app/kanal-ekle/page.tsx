import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories } from '@/lib/db';
import AddChannelForm from '@/components/ui/AddChannelForm';

export const metadata: Metadata = {
  title: 'Kanal Ekle & Reklam Ver - TGGrupKanalları',
  description: 'WhatsApp grubunuzu veya Telegram kanalınızı sitemize ücretsiz ekleyin. Öne çıkarma ve reklam seçenekleriyle binlerce kişiye ulaşın.',
  alternates: { canonical: 'https://tggrupkanallari.com/kanal-ekle' },
};

export default function KanalEklePage() {
  const categories = getAllCategories();

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <nav className="breadcrumb">
        <Link href="/">Ana Sayfa</Link>
        <span className="breadcrumb-separator">/</span>
        <span>Kanal Ekle & Reklam</span>
      </nav>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2.5rem',
        marginTop: '1rem',
      }} className="kanal-ekle-layout">
        
        {/* İki Sütunlu Düzen (Büyük Ekranlarda) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
          gap: '2.5rem',
        }} className="kanal-ekle-grid">
          
          {/* Sol Kolon: Kanal Ekleme Formu */}
          <div>
            <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>
              ➕ Kanal / Grup <span className="gradient-text">Ekle</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
              WhatsApp grubunuzu veya Telegram kanalınızı ücretsiz olarak sitemize ekleyin. 
              Gönderilen kanallar yönetici onayından geçtikten sonra listede yayınlanır.
            </p>

            <AddChannelForm categories={categories} />
          </div>

          {/* Sağ Kolon: Reklam & Öne Çıkarma Seçenekleri */}
          <div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              position: 'sticky',
              top: '90px',
              backdropFilter: 'blur(10px)',
            }} className="advertising-sidebar">
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '2rem' }}>🚀</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Kanalınızı <span className="gradient-text">Öne Çıkarın</span>
                </h2>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Kanalınızın onay sırasını beklemeden <strong>anında onaylanmasını</strong>, en üst sıralarda listelenmesini ve binlerce yeni üye çekmesini ister misiniz?
              </p>

              {/* Reklam Avantajları Listesi */}
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.15rem' }}>Anında VIP Onay</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Sıra beklemeden 5 dakika içinde onay ve yayına alma.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.15rem' }}>Ana Sayfa & Kategori Sabitleme</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Sitenin en çok trafik alan en üst alanında haftalık veya aylık sabitleme.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.15rem' }}>Doğrulanmış (Verified) Rozeti</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Profilinize mavi tik eklenerek güvenilirlik ve tıklama oranının artırılması.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.15rem' }}>Banner Reklam Alanları</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Göz alıcı reklam görselleriyle ziyaretçileri doğrudan kanalınıza çekin.</p>
                  </div>
                </div>
              </div>

              {/* Telegram İletişim Kartı */}
              <div style={{
                background: 'rgba(0, 136, 204, 0.08)',
                border: '1px solid rgba(0, 136, 204, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>✈️</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Detaylar & Fiyatlar İçin Bize Yazın
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Fiyat listesi, öne çıkarma paketleri ve reklam alanları hakkında bilgi almak için Telegram destek hesabımız 7/24 aktiftir.
                </p>
                <a
                  href="https://t.me/destektgkanalicom"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--telegram)',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 200ms ease',
                    boxShadow: '0 4px 12px rgba(0, 136, 204, 0.25)',
                  }}
                  className="channel-card-join telegram"
                >
                  ✈️ @destektgkanalicom
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>

  );
}
