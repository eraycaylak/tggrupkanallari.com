'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Channel {
  id: string;
  name: string;
  slug: string;
  platform: string;
  category: string;
  description: string;
  memberCount: number;
  tags: string[];
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/channels?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.data?.slice(0, 8) || []);
        setOpen(true);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  function formatCount(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  }

  return (
    <div className="search-container" ref={ref}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Kanal veya grup ara..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        autoComplete="off"
        id="global-search"
      />

      {/* Arama Sonuçları Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0, right: 0,
          background: 'rgba(18, 18, 26, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 200,
          maxHeight: '400px',
          overflowY: 'auto',
        }}>
          {loading && (
            <div style={{
              padding: '1rem', textAlign: 'center',
              color: 'var(--text-tertiary)', fontSize: '0.85rem',
            }}>
              Aranıyor...
            </div>
          )}

          {!loading && results.length === 0 && query.length >= 2 && (
            <div style={{
              padding: '1.5rem', textAlign: 'center',
              color: 'var(--text-tertiary)', fontSize: '0.85rem',
            }}>
              &quot;{query}&quot; için sonuç bulunamadı
            </div>
          )}

          {results.map(ch => (
            <Link
              key={ch.id}
              href={`/kanal/${ch.slug}`}
              onClick={() => { setOpen(false); setQuery(''); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--border)',
                transition: 'background 150ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-glass-strong)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{
                width: '36px', height: '36px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', flexShrink: 0,
                background: ch.platform === 'whatsapp' ? 'var(--whatsapp-glow)' : 'var(--telegram-glow)',
              }}>
                {ch.platform === 'whatsapp' ? '📱' : '✈️'}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.3 }}>
                  {ch.name}
                </div>
                <div style={{
                  fontSize: '0.7rem', color: 'var(--text-tertiary)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {ch.category} • {formatCount(ch.memberCount)} üye
                </div>
              </div>

              <span style={{
                fontSize: '0.7rem', color: 'var(--text-tertiary)',
                flexShrink: 0,
              }}>
                →
              </span>
            </Link>
          ))}

          {results.length > 0 && (
            <div style={{
              padding: '0.6rem 1rem', textAlign: 'center',
              fontSize: '0.75rem', color: 'var(--text-tertiary)',
            }}>
              {results.length} sonuç • Enter ile tümünü gör
            </div>
          )}
        </div>
      )}
    </div>
  );
}
