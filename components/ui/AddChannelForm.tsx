'use client';

import { useState } from 'react';
import Link from 'next/link';


interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export default function AddChannelForm({ categories }: { categories: Category[] }) {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('whatsapp');
  const [category, setCategory] = useState(categories[0]?.id || 'teknoloji');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [city, setCity] = useState('İstanbul');
  const [tags, setTags] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          platform,
          category,
          description,
          link,
          city,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          verified: false, // Default is false, requires admin approval
          featured: false,
          memberCount: Math.floor(Math.random() * 500) + 50, // Mock initial members
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Gönderim sırasında bir hata oluştu.');
      }
    } catch (err) {
      setError('Ağ hatası. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{
        background: 'rgba(16, 185, 129, 0.06)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem 2rem',
        textAlign: 'center',
        animation: 'fadeInUp 400ms ease-out',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Kanal Başvurunuz Alındı!
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 2rem' }}>
          <strong>&quot;{name}&quot;</strong> kanalınız başarıyla sistemimize kaydedildi. 
          Kanalınız yönetici onayından geçtikten sonra listede yayına alınacaktır.
        </p>

        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          maxWidth: '480px',
          margin: '0 auto 2rem',
          textAlign: 'left',
        }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            ⚡ Beklemek İstemiyor Musunuz? (Hızlı Onay)
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Kanalınızın 5 dakika içinde onaylanıp yayına alınmasını sağlamak, mavi tik (onaylı) rozeti almak veya en üst sırada sabitlenmesini sağlamak için Telegram destek adresimize yazabilirsiniz.
          </p>
          <a
            href="https://t.me/destektgkanalicom"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--telegram)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none',
              marginTop: '0.75rem',
            }}
          >
            ✈️ Hızlı Onay Almak İçin Yaz →
          </a>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={() => {
              setSuccess(false);
              setName('');
              setLink('');
              setDescription('');
              setTags('');
            }}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Başka Bir Kanal Ekle
          </button>
          <Link href="/" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card" style={{ padding: '2rem', display: 'grid', gap: '1.25rem' }}>
      
      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          color: 'var(--danger)',
          fontSize: '0.85rem',
          fontWeight: 500,
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Kanal Adı */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
          Kanal / Grup Adı *
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Örn: Yazılımcılar Kulübü"
          style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Platform & Kategori */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
            Platform *
          </label>
          <select
            value={platform}
            onChange={e => setPlatform(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            <option value="whatsapp">📱 WhatsApp</option>
            <option value="telegram">✈️ Telegram</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
            Kategori *
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Davet Linki */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
          Grup Davet Linki *
        </label>
        <input
          type="url"
          required
          value={link}
          onChange={e => setLink(e.target.value)}
          placeholder={platform === 'whatsapp' ? 'https://chat.whatsapp.com/...' : 'https://t.me/...'}
          style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Açıklama */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
          Grup Açıklaması * (En az 20 karakter)
        </label>
        <textarea
          required
          minLength={20}
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          placeholder="Grubunuzun/kanalınızın amacı, kuralları ve ne paylaştığı hakkında kısa bir tanıtım..."
          style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Şehir & Etiketler */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }} className="form-row-city-tags">
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
            Şehir
          </label>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Örn: İstanbul"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
            Etiketler (Virgülle ayırın)
          </label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="yazılım, eğitim, python, sohbet"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Gönder Butonu */}
      <div style={{ marginTop: '0.5rem' }}>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 700 }}
        >
          {loading ? 'Gönderiliyor...' : '🚀 Kanalı Onaya Gönder'}
        </button>
      </div>

    </form>
  );
}
