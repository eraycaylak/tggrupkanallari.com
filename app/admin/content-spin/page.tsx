'use client';

import { useState } from 'react';

const sampleTexts = [
  `WhatsApp grupları, günümüzde en popüler iletişim araçlarından biridir. İnsanlar WhatsApp üzerinden ailelerinden arkadaşlarına, iş ortaklarından topluluk üyelerine kadar herkesle iletişim kurmaktadır. WhatsApp grup linkleri sayesinde yeni gruplara katılmak oldukça kolay hale gelmiştir. Telegram kanalları da benzer şekilde büyük bir kullanıcı kitlesine ulaşmaktadır.`,

  `{Türkiye|Ülkemiz|Memleketimiz}'nin {en büyük|en kapsamlı|en geniş} {WhatsApp|WA} {grup|topluluk} {dizini|listesi|rehberi}. {Binlerce|Yüzlerce|Onlarca} {aktif|güncel|canlı} {grup|topluluk|kanal}'a {ücretsiz|bedava|parasız} {katılın|girin|üye olun}.`,

  `İstanbul WhatsApp grupları arayanlar için en güncel ve aktif grup linklerini derliyoruz. Teknoloji, finans, eğitim, sağlık ve daha birçok kategoride İstanbul merkezli WhatsApp gruplarına ücretsiz katılabilirsiniz.`,
];

const synonymDict: Record<string, string[]> = {
  'WhatsApp': ['WA', 'Whatsapp', 'WhatsApp Messenger'],
  'grupları': ['toplulukları', 'gruplar', 'topluluklar', 'sohbet grupları'],
  'kanalları': ['kanallar', 'channel\'ları', 'sayfaları'],
  'en büyük': ['en kapsamlı', 'en geniş', 'en iyi'],
  'ücretsiz': ['bedava', 'parasız', 'free', 'tamamen ücretsiz'],
  'katılın': ['girin', 'üye olun', 'bağlanın', 'dahil olun'],
  'aktif': ['güncel', 'canlı', 'yaşayan', 'işlek'],
  'popüler': ['trend', 'revaçta', 'gözde', 'favori'],
  'iletişim': ['haberleşme', 'mesajlaşma', 'bağlantı'],
  'liste': ['dizin', 'rehber', 'katalog', 'arşiv'],
  'bulmak': ['keşfetmek', 'erişmek', 'ulaşmak'],
  'kolay': ['basit', 'zahmetsiz', 'hızlı', 'pratik'],
  'yeni': ['taze', 'güncel', 'son', 'en son'],
  'arayanlar': ['isteyenler', 'bakanlar', 'merak edenler'],
};

function spinText(text: string): string {
  // Handle spintax format: {option1|option2|option3}
  let result = text.replace(/\{([^}]+)\}/g, (_, group) => {
    const options = group.split('|');
    return options[Math.floor(Math.random() * options.length)];
  });

  // Auto-spin using synonym dictionary
  for (const [word, synonyms] of Object.entries(synonymDict)) {
    if (result.includes(word) && Math.random() > 0.5) {
      const replacement = synonyms[Math.floor(Math.random() * synonyms.length)];
      result = result.replace(word, replacement);
    }
  }

  return result;
}

export default function AdminContentSpin() {
  const [input, setInput] = useState(sampleTexts[1]);
  const [output, setOutput] = useState('');
  const [variations, setVariations] = useState<string[]>([]);
  const [varCount, setVarCount] = useState(5);

  function handleSpin() {
    const spun = spinText(input);
    setOutput(spun);
  }

  function handleBulkSpin() {
    const results: string[] = [];
    for (let i = 0; i < varCount; i++) {
      results.push(spinText(input));
    }
    setVariations(results);
  }

  function handleSelectSample(idx: number) {
    setInput(sampleTexts[idx]);
    setOutput('');
    setVariations([]);
  }

  // Uniqueness calculator
  function calculateUniqueness(texts: string[]): number {
    if (texts.length < 2) return 100;
    const unique = new Set(texts);
    return Math.round((unique.size / texts.length) * 100);
  }

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>🔄 İçerik Döndürücü (Content Spinner)</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.85rem' }}>
        Spintax formatında yazılmış metinleri otomatik olarak benzersiz varyasyonlara çevirin.
        Eş anlamlı sözlük ile auto-spin desteği.
      </p>

      {/* Syntax Guide */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>📖 Spintax Kullanım Kılavuzu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
              Manuel Spintax
            </h3>
            <code style={{
              display: 'block', padding: '0.75rem', background: 'var(--bg-glass)',
              borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', lineHeight: 1.6,
              color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
            }}>
              {`{kelime1|kelime2|kelime3}`}
            </code>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>
              Süslü parantez içinde &quot;|&quot; ile ayrılmış seçeneklerden rastgele biri seçilir.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--success)' }}>
              Otomatik Spin
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Eş anlamlı sözlükteki kelimeler otomatik olarak algılanır ve %50 olasılıkla
              değiştirilir. Sözlükte <strong>{Object.keys(synonymDict).length}</strong> kelime grubu mevcut.
            </p>
          </div>
        </div>
      </div>

      {/* Örnek Metinler */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>📋 Örnek Şablonlar</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {sampleTexts.map((_, idx) => (
            <button key={idx} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}
              onClick={() => handleSelectSample(idx)}>
              Şablon {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Girdi Alanı */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>✏️ Kaynak Metin</h2>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={6}
          style={{
            width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-glass)', border: '1px solid var(--border)',
            color: 'var(--text-primary)', fontSize: '0.85rem', resize: 'vertical',
            fontFamily: 'monospace', lineHeight: 1.6,
          }}
          placeholder="Metninizi buraya girin. Spintax için {seçenek1|seçenek2|seçenek3} formatını kullanın..."
        />
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={handleSpin}>
            🔄 Tek Spin
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={handleBulkSpin}>
              📦 Toplu Spin
            </button>
            <input
              type="number" min={2} max={50} value={varCount}
              onChange={e => setVarCount(Number(e.target.value))}
              style={{
                width: '60px', padding: '0.4rem', borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-glass)', border: '1px solid var(--border)',
                color: 'var(--text-primary)', fontSize: '0.85rem', textAlign: 'center',
              }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>adet</span>
          </div>
        </div>
      </div>

      {/* Tek Spin Çıktısı */}
      {output && (
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>✅ Spin Sonucu</h2>
          <div style={{
            padding: '1rem', background: 'rgba(16, 185, 129, 0.05)',
            borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.15)',
            fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-secondary)',
          }}>
            {output}
          </div>
        </div>
      )}

      {/* Toplu Spin Çıktısı */}
      {variations.length > 0 && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem' }}>
              📦 {variations.length} Varyasyon Üretildi
            </h2>
            <div style={{
              padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)',
              background: calculateUniqueness(variations) > 80 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              fontSize: '0.75rem', fontWeight: 600,
              color: calculateUniqueness(variations) > 80 ? 'var(--success)' : 'var(--warning)',
            }}>
              Benzersizlik: %{calculateUniqueness(variations)}
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto' }}>
            {variations.map((v, i) => (
              <div key={i} style={{
                padding: '0.75rem', background: 'var(--bg-glass)',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--text-secondary)',
              }}>
                <span style={{
                  display: 'inline-block', width: '24px', height: '24px',
                  borderRadius: '50%', background: 'var(--accent-gradient)',
                  color: 'white', textAlign: 'center', lineHeight: '24px',
                  fontSize: '0.7rem', fontWeight: 700, marginRight: '0.5rem',
                }}>
                  {i + 1}
                </span>
                {v}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eş Anlamlı Sözlük */}
      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>📚 Eş Anlamlı Sözlük</h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '0.5rem',
        }}>
          {Object.entries(synonymDict).map(([word, synonyms]) => (
            <div key={word} style={{
              padding: '0.5rem 0.75rem', background: 'var(--bg-glass)',
              borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
              fontSize: '0.75rem',
            }}>
              <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{word}</span>
              <span style={{ color: 'var(--text-tertiary)' }}> → </span>
              <span style={{ color: 'var(--text-secondary)' }}>{synonyms.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
