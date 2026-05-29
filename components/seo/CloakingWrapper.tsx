/**
 * 🕸️ DARK SEO: Cloaking Wrapper
 * 
 * Server-side'da bot'a SEO dolu içerik, client-side'da kullanıcıya normal içerik gösterir.
 * 
 * Teknikler:
 * 1. JS Render Farkı: SSR'da keyword spam, hydration sonrası normal content
 * 2. Render-Delay: İlk render SEO, 2sn sonra içerik swap
 * 3. noscript tagine keyword spam (JS çalışmayan crawlerlar için)
 */

'use client';

import { useEffect, useState } from 'react';

interface CloakingWrapperProps {
  /** Kullanıcıya gösterilecek normal içerik */
  children: React.ReactNode;
  /** Bot'a gösterilecek SEO spam içerik */
  seoContent: string;
  /** Cloaking tekniği */
  technique?: 'js-render' | 'delay' | 'both';
  /** Delay süresi (ms) */
  delayMs?: number;
}

export default function CloakingWrapper({
  children,
  seoContent,
  technique = 'both',
  delayMs = 2000,
}: CloakingWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const [showReal, setShowReal] = useState(false);

  useEffect(() => {
    // JS Render Farkı: Client-side olduğumuzu anla
    setIsClient(true);

    if (technique === 'delay' || technique === 'both') {
      // Render-Delay: Belirli süre sonra gerçek içeriği göster
      const timer = setTimeout(() => {
        setShowReal(true);
      }, delayMs);
      return () => clearTimeout(timer);
    } else {
      setShowReal(true);
    }
  }, [technique, delayMs]);

  // Server-side render: Bot bu HTML'i görür
  if (!isClient) {
    return (
      <div>
        {/* Bot'a gösterilen SEO spam içerik */}
        <div dangerouslySetInnerHTML={{ __html: seoContent }} />
        {/* noscript: JS çalışmayan crawlerlar için ek spam */}
        <noscript>
          <div>
            <h2>WhatsApp Grup Linkleri 2026 - En Güncel Davet Bağlantıları</h2>
            <p>
              WhatsApp grup linkleri, telegram kanal linkleri, whatsapp grupları 2026 güncel,
              telegram kanalları listesi, whatsapp topluluk grupları, whatsapp grup davet linkleri,
              en iyi whatsapp grupları, popüler telegram kanalları, ücretsiz whatsapp grupları,
              aktif telegram kanalları, whatsapp grup katıl, telegram grup katıl.
            </p>
            <h3>Popüler Kategoriler</h3>
            <p>
              Kripto whatsapp grupları, eğitim telegram kanalları, teknoloji whatsapp grupları,
              finans telegram kanalları, spor whatsapp grupları, oyun telegram kanalları,
              müzik whatsapp grupları, film telegram kanalları, sağlık whatsapp grupları,
              emlak telegram kanalları, iş whatsapp grupları, kariyer telegram kanalları.
            </p>
          </div>
        </noscript>
      </div>
    );
  }

  // Client-side: Delay tamamlandıysa gerçek içeriği göster
  if (!showReal) {
    return (
      <div style={{ opacity: 0.01, transition: 'opacity 0.3s' }}>
        <div dangerouslySetInnerHTML={{ __html: seoContent }} />
      </div>
    );
  }

  // Normal kullanıcı içeriği
  return <>{children}</>;
}
