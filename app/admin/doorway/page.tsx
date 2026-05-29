'use client';

import { useState } from 'react';

const cities = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya',
  'Gaziantep', 'Mersin', 'Diyarbakır', 'Kayseri', 'Eskişehir', 'Samsun',
  'Denizli', 'Şanlıurfa', 'Malatya', 'Trabzon', 'Erzurum', 'Van',
  'Manisa', 'Balıkesir', 'Sakarya', 'Kocaeli', 'Tekirdağ', 'Aydın',
  'Muğla', 'Hatay', 'Mardin', 'Elazığ', 'Afyon', 'Tokat', 'Çorum',
  'Edirne', 'Bolu', 'Kastamonu', 'Rize', 'Artvin', 'Kars', 'Ağrı',
  'Aksaray', 'Amasya', 'Bilecik', 'Bingöl', 'Bitlis', 'Çanakkale',
  'Çankırı', 'Düzce', 'Giresun', 'Gümüşhane', 'Hakkari', 'Iğdır',
  'Isparta', 'Karabük', 'Karaman', 'Kilis', 'Kırıkkale', 'Kırklareli',
  'Kırşehir', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
  'Sinop', 'Siirt', 'Sivas', 'Şırnak', 'Tunceli', 'Uşak', 'Yalova',
  'Yozgat', 'Zonguldak', 'Batman', 'Bartın', 'Ardahan', 'Bayburt',
  'Adıyaman', 'Burdur', 'Datça', 'Didim', 'Kuşadası',
];

const services = [
  { id: 'whatsapp-gruplari', name: 'WhatsApp Grupları', icon: '📱' },
  { id: 'telegram-kanallari', name: 'Telegram Kanalları', icon: '✈️' },
];

const templates = [
  {
    id: 'standard',
    name: 'Standart Doorway',
    desc: '"{şehir} {hizmet}" formatında temel doorway sayfası',
  },
  {
    id: 'long-tail',
    name: 'Long-Tail Keyword',
    desc: '"{şehir} ücretsiz {hizmet} 2026 güncel liste" formatında uzun kuyruk',
  },
  {
    id: 'soru',
    name: 'Soru Formatı',
    desc: '"{şehir} {hizmet} nasıl bulunur? en iyi gruplar" formatında soru bazlı',
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/İ/g, 'i').replace(/Ğ/g, 'g').replace(/Ü/g, 'u')
    .replace(/Ş/g, 's').replace(/Ö/g, 'o').replace(/Ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminDoorway() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>(['whatsapp-gruplari', 'telegram-kanallari']);
  const [template, setTemplate] = useState('standard');
  const [generated, setGenerated] = useState<{ url: string; title: string; city: string; service: string }[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  function toggleCity(city: string) {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  }

  function toggleSelectAll() {
    if (selectAll) {
      setSelectedCities([]);
    } else {
      setSelectedCities([...cities]);
    }
    setSelectAll(!selectAll);
  }

  function generatePages() {
    const pages: typeof generated = [];
    const tpl = templates.find(t => t.id === template);

    for (const city of selectedCities) {
      for (const serviceId of selectedServices) {
        const service = services.find(s => s.id === serviceId)!;
        const citySlug = slugify(city);

        let title = '';
        switch (tpl?.id) {
          case 'long-tail':
            title = `${city} Ücretsiz ${service.name} 2026 - Güncel Liste`;
            break;
          case 'soru':
            title = `${city} ${service.name} Nasıl Bulunur? En İyi Gruplar`;
            break;
          default:
            title = `${city} ${service.name} - TG Grup Kanallari`;
        }

        pages.push({
          url: `/${citySlug}/${serviceId}`,
          title,
          city,
          service: serviceId,
        });
      }
    }

    setGenerated(pages);
  }

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>🚪 Doorway Sayfa Üretici</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.85rem' }}>
        Şehir × Hizmet matrisinden otomatik doorway sayfalar üretin. Her sayfa benzersiz
        spun content ile doldurulur ve sitemap&apos;e otomatik eklenir.
      </p>

      {/* Hizmet Seçimi */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>🔧 Hizmet Seçimi</h2>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {services.map(service => (
            <label
              key={service.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)',
                background: selectedServices.includes(service.id) ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-glass)',
                border: `1px solid ${selectedServices.includes(service.id) ? 'var(--accent-primary)' : 'var(--border)'}`,
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
              }}
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(service.id)}
                onChange={() => setSelectedServices(prev =>
                  prev.includes(service.id) ? prev.filter(s => s !== service.id) : [...prev, service.id]
                )}
              />
              {service.icon} {service.name}
            </label>
          ))}
        </div>
      </div>

      {/* Template Seçimi */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>📝 Şablon Seçimi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {templates.map(tpl => (
            <label
              key={tpl.id}
              style={{
                padding: '1rem', borderRadius: 'var(--radius-sm)',
                background: template === tpl.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-glass)',
                border: `1px solid ${template === tpl.id ? 'var(--accent-primary)' : 'var(--border)'}`,
                cursor: 'pointer', display: 'block',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="radio" name="template" checked={template === tpl.id}
                  onChange={() => setTemplate(tpl.id)} />
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{tpl.name}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                {tpl.desc}
              </p>
            </label>
          ))}
        </div>
      </div>

      {/* Şehir Seçimi */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h2 style={{ fontSize: '1rem' }}>🏙️ Şehir Seçimi ({selectedCities.length}/{cities.length})</h2>
          <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={toggleSelectAll}>
            {selectAll ? '✕ Tümünü Kaldır' : '✓ Tümünü Seç'}
          </button>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '0.35rem', maxHeight: '300px', overflowY: 'auto',
          padding: '0.5rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)',
        }}>
          {cities.map(city => (
            <label
              key={city}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: 'pointer',
                fontSize: '0.75rem',
                background: selectedCities.includes(city) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              }}
            >
              <input type="checkbox" checked={selectedCities.includes(city)}
                onChange={() => toggleCity(city)} style={{ width: '12px', height: '12px' }} />
              {city}
            </label>
          ))}
        </div>
      </div>

      {/* Üret Butonu */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <button
          className="btn btn-primary"
          onClick={generatePages}
          disabled={selectedCities.length === 0 || selectedServices.length === 0}
          style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}
        >
          🚀 {selectedCities.length * selectedServices.length} Doorway Sayfa Üret
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          {selectedCities.length} şehir × {selectedServices.length} hizmet
        </span>
      </div>

      {/* Sonuçlar */}
      {generated.length > 0 && (
        <div className="admin-card">
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
            ✅ {generated.length} Doorway Sayfa Üretildi
          </h2>
          <div style={{
            maxHeight: '400px', overflowY: 'auto',
            background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)',
            padding: '0.5rem',
          }}>
            <table className="admin-table" style={{ fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  <th>Başlık</th>
                  <th>Hizmet</th>
                </tr>
              </thead>
              <tbody>
                {generated.map((page, i) => (
                  <tr key={page.url}>
                    <td style={{ color: 'var(--text-tertiary)' }}>{i + 1}</td>
                    <td>
                      <code style={{
                        fontSize: '0.7rem', padding: '0.15rem 0.4rem',
                        background: 'var(--bg-glass-strong)', borderRadius: '3px',
                        color: 'var(--accent-primary)',
                      }}>
                        {page.url}
                      </code>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{page.title}</td>
                    <td>
                      <span className={`channel-card-platform ${page.service.includes('whatsapp') ? 'whatsapp' : 'telegram'}`}
                        style={{ fontSize: '0.6rem' }}>
                        {page.service.includes('whatsapp') ? 'WA' : 'TG'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              ℹ️ Bu sayfalar Next.js <code>[city]/[service]</code> dinamik route ile zaten oluşturulmuş durumda.
              İçerikleri <code>content-spinner.ts</code> ile otomatik spun content kullanır.
              Sitemap&apos;e otomatik eklenir, her sayfa benzersiz meta tag&apos;lere sahiptir.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
