'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          <span className="logo-icon">📡</span>
          <span>TGGrup<span className="gradient-text">Kanalları</span></span>
        </Link>

        <div className="navbar-links" style={mobileOpen ? {
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '72px',
          left: 0,
          right: 0,
          background: 'rgba(10,10,15,0.95)',
          padding: '1rem',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(20px)',
          zIndex: 99
        } as React.CSSProperties : undefined}>
          <Link href="/">Ana Sayfa</Link>
          <Link href="/telegram-ifsa-kanallari" title="Telegram İfşa Kanalları 2026">🔥 İfşa</Link>
          <Link href="/telegram-kripto-kanallari" title="Telegram Kripto Bitcoin Kanalları">💰 Kripto</Link>
          <Link href="/telegram-iddaa-kanallari" title="Telegram İddaa Kupon Kanalları">⚽ İddaa</Link>
          <Link href="/telegram-kpss-kanallari" title="Telegram KPSS Kanalları">📚 KPSS</Link>
          <Link href="/telegram-oyun-kanallari" title="Telegram Oyun APK Kanalları">🎮 Oyun</Link>
          <Link href="/kategoriler">Kategoriler</Link>
          <Link href="https://t.me/destektgkanalicom" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--warning)', fontWeight: 600 }} title="Reklam & Tanıtım İşbirlikleri">📢 Reklam</Link>
          <Link href="/iletisim">📬 İletişim</Link>
          <Link href="/kanal-ekle" className="navbar-cta" style={{ marginLeft: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>➕ Kanal Ekle</Link>
        </div>

        {/* Admin gizli: sadece /admin URL ile erişilir */}

        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
