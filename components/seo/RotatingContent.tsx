/**
 * 🕸️ DARK SEO: Rotating Content
 * 
 * Aynı URL'de her ziyarette farklı keyword ağırlıklı içerik döndürür.
 * Cookie/session bazlı rotasyon yapar.
 */

'use client';

import { useEffect, useState } from 'react';

interface RotatingContentProps {
  variants: string[];
  className?: string;
}

export default function RotatingContent({ variants, className }: RotatingContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cookie'den mevcut index'i oku
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, val] = cookie.trim().split('=');
      acc[key] = val;
      return acc;
    }, {} as Record<string, string>);

    let index = parseInt(cookies['seo_rotation'] || '0', 10);
    
    // Sonraki varyasyona geç
    index = (index + 1) % variants.length;
    
    // Cookie'yi güncelle (30 dakika süreyle)
    document.cookie = `seo_rotation=${index}; path=/; max-age=1800`;
    
    setCurrentIndex(index);
  }, [variants.length]);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: variants[currentIndex] }} />
  );
}
