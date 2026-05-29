'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Channel {
  id: string;
  name: string;
  slug: string;
  platform: string;
  category: string;
  description: string;
  memberCount: number;
  link: string;
  tags: string[];
  featured: boolean;
  verified: boolean;
  city?: string;
}

export default function AdminKanallar() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editChannel, setEditChannel] = useState<Channel | null>(null);
  const [filter, setFilter] = useState({ platform: '', category: '', q: '' });
  const [toast, setToast] = useState('');

  // Form state
  const [form, setForm] = useState({
    name: '', platform: 'whatsapp', category: 'teknoloji',
    description: '', memberCount: 0, link: '',
    tags: '', featured: false, verified: false, city: 'İstanbul',
  });

  const categories = [
    'teknoloji', 'finans', 'egitim', 'saglik', 'spor', 'muzik',
    'sanat', 'yemek', 'seyahat', 'oyun', 'bilim', 'haber',
    'alisveris', 'kariyer', 'aile', 'otomotiv', 'emlak', 'kripto', 'diger',
  ];

  useEffect(() => {
    fetchChannels();
  }, [filter.platform, filter.category]);

  async function fetchChannels() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.platform) params.set('platform', filter.platform);
    if (filter.category) params.set('category', filter.category);
    if (filter.q) params.set('q', filter.q);

    const res = await fetch(`/api/channels?${params}`);
    const data = await res.json();
    setChannels(data.data || []);
    setLoading(false);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function openAddForm() {
    setEditChannel(null);
    setForm({
      name: '', platform: 'whatsapp', category: 'teknoloji',
      description: '', memberCount: 0, link: '',
      tags: '', featured: false, verified: false, city: 'İstanbul',
    });
    setShowForm(true);
  }

  function openEditForm(ch: Channel) {
    setEditChannel(ch);
    setForm({
      name: ch.name, platform: ch.platform, category: ch.category,
      description: ch.description, memberCount: ch.memberCount, link: ch.link,
      tags: ch.tags.join(', '), featured: ch.featured, verified: ch.verified,
      city: ch.city || 'İstanbul',
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      ...(editChannel ? { id: editChannel.id } : {}),
    };

    const res = await fetch('/api/channels', {
      method: editChannel ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      showToast(editChannel ? '✅ Kanal güncellendi!' : '✅ Kanal eklendi!');
      setShowForm(false);
      fetchChannels();
    } else {
      const err = await res.json();
      showToast(`❌ Hata: ${err.error}`);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" kanalını silmek istediğinize emin misiniz?`)) return;

    const res = await fetch(`/api/channels?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('🗑️ Kanal silindi!');
      fetchChannels();
    }
  }

  async function toggleVerified(ch: Channel) {
    await fetch('/api/channels', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: ch.id, verified: !ch.verified }),
    });
    showToast(ch.verified ? '❌ Onay kaldırıldı' : '✅ Kanal onaylandı');
    fetchChannels();
  }

  async function toggleFeatured(ch: Channel) {
    await fetch('/api/channels', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: ch.id, featured: !ch.featured }),
    });
    showToast(ch.featured ? '⬇️ Öne çıkarma kaldırıldı' : '⭐ Öne çıkarıldı');
    fetchChannels();
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999,
          padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)',
          background: toast.startsWith('❌') ? 'var(--danger)' : 'var(--success)',
          color: 'white', fontWeight: 600, fontSize: '0.85rem',
          boxShadow: 'var(--shadow-lg)', animation: 'fadeInDown 0.3s ease-out',
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>📡 Kanal Yönetimi</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            {channels.length} kanal kayıtlı
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAddForm}>
          + Yeni Kanal Ekle
        </button>
      </div>

      {/* Filtreler */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={filter.platform}
            onChange={e => setFilter({ ...filter, platform: e.target.value })}
            style={{
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-glass)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontSize: '0.85rem',
            }}
          >
            <option value="">Tüm Platformlar</option>
            <option value="whatsapp">📱 WhatsApp</option>
            <option value="telegram">✈️ Telegram</option>
          </select>

          <select
            value={filter.category}
            onChange={e => setFilter({ ...filter, category: e.target.value })}
            style={{
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-glass)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontSize: '0.85rem',
            }}
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Kanal ara..."
              value={filter.q}
              onChange={e => setFilter({ ...filter, q: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && fetchChannels()}
              style={{
                flex: 1, padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-glass)', border: '1px solid var(--border)',
                color: 'var(--text-primary)', fontSize: '0.85rem',
              }}
            />
            <button className="btn btn-secondary" onClick={fetchChannels} style={{ fontSize: '0.8rem' }}>
              🔍 Ara
            </button>
          </div>
        </div>
      </div>

      {/* Kanal Tablosu */}
      <div className="admin-card">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)' }}>
            Yükleniyor...
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Kanal Adı</th>
                <th>Platform</th>
                <th>Kategori</th>
                <th>Üye</th>
                <th>Durum</th>
                <th style={{ textAlign: 'right' }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {channels.map(ch => (
                <tr key={ch.id}>
                  <td>
                    <Link href={`/kanal/${ch.slug}`} style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>
                      {ch.name}
                    </Link>
                    {ch.featured && <span style={{ marginLeft: '0.35rem', fontSize: '0.7rem' }}>⭐</span>}
                  </td>
                  <td>
                    <span className={`channel-card-platform ${ch.platform}`} style={{ fontSize: '0.65rem' }}>
                      {ch.platform === 'whatsapp' ? '📱 WA' : '✈️ TG'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{ch.category}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{ch.memberCount.toLocaleString()}</td>
                  <td>
                    <span
                      onClick={() => toggleVerified(ch)}
                      style={{
                        cursor: 'pointer', fontSize: '0.8rem',
                        color: ch.verified ? 'var(--success)' : 'var(--text-tertiary)',
                      }}
                    >
                      {ch.verified ? '✓ Onaylı' : '○ Bekliyor'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => toggleFeatured(ch)}
                        title={ch.featured ? 'Öne çıkarmayı kaldır' : 'Öne çıkar'}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: '0.9rem', opacity: ch.featured ? 1 : 0.4,
                        }}
                      >
                        ⭐
                      </button>
                      <button
                        onClick={() => openEditForm(ch)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}
                      >
                        ✏️ Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(ch.id, ch.name)}
                        style={{
                          background: 'none', border: '1px solid var(--danger)',
                          color: 'var(--danger)', borderRadius: 'var(--radius-sm)',
                          fontSize: '0.7rem', padding: '0.3rem 0.6rem', cursor: 'pointer',
                        }}
                      >
                        🗑️ Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Kanal Ekle/Düzenle Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}>
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)', padding: '2rem',
              maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem' }}>
                {editChannel ? '✏️ Kanal Düzenle' : '➕ Yeni Kanal Ekle'}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} style={{
                background: 'none', border: 'none', color: 'var(--text-tertiary)',
                fontSize: '1.5rem', cursor: 'pointer',
              }}>✕</button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {/* Kanal Adı */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Kanal Adı *
                </label>
                <input
                  type="text" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Örn: Yazılımcılar Kulübü"
                  style={{
                    width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-glass)', border: '1px solid var(--border)',
                    color: 'var(--text-primary)', fontSize: '0.9rem',
                  }}
                />
              </div>

              {/* Platform + Kategori */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Platform *
                  </label>
                  <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}
                    style={{
                      width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-glass)', border: '1px solid var(--border)',
                      color: 'var(--text-primary)', fontSize: '0.9rem',
                    }}>
                    <option value="whatsapp">📱 WhatsApp</option>
                    <option value="telegram">✈️ Telegram</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Kategori *
                  </label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    style={{
                      width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-glass)', border: '1px solid var(--border)',
                      color: 'var(--text-primary)', fontSize: '0.9rem',
                    }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Açıklama */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Açıklama *
                </label>
                <textarea
                  required value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3} placeholder="Kanal hakkında kısa açıklama..."
                  style={{
                    width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-glass)', border: '1px solid var(--border)',
                    color: 'var(--text-primary)', fontSize: '0.9rem', resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Link + Üye Sayısı */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Davet Linki *
                  </label>
                  <input
                    type="url" required value={form.link}
                    onChange={e => setForm({ ...form, link: e.target.value })}
                    placeholder="https://chat.whatsapp.com/..."
                    style={{
                      width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-glass)', border: '1px solid var(--border)',
                      color: 'var(--text-primary)', fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Üye Sayısı
                  </label>
                  <input
                    type="number" value={form.memberCount}
                    onChange={e => setForm({ ...form, memberCount: Number(e.target.value) })}
                    style={{
                      width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-glass)', border: '1px solid var(--border)',
                      color: 'var(--text-primary)', fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              {/* Etiketler + Şehir */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Etiketler (virgülle ayır)
                  </label>
                  <input
                    type="text" value={form.tags}
                    onChange={e => setForm({ ...form, tags: e.target.value })}
                    placeholder="teknoloji, yazılım, python"
                    style={{
                      width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-glass)', border: '1px solid var(--border)',
                      color: 'var(--text-primary)', fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Şehir
                  </label>
                  <input
                    type="text" value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    style={{
                      width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-glass)', border: '1px solid var(--border)',
                      color: 'var(--text-primary)', fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              {/* Togglelar */}
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input type="checkbox" checked={form.verified}
                    onChange={e => setForm({ ...form, verified: e.target.checked })} />
                  ✓ Doğrulanmış
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input type="checkbox" checked={form.featured}
                    onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  ⭐ Öne Çıkar
                </label>
              </div>
            </div>

            {/* Butonlar */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                İptal
              </button>
              <button type="submit" className="btn btn-primary">
                {editChannel ? '💾 Güncelle' : '➕ Ekle'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
