/**
 * 🕸️ DARK SEO: CTR Emulation Scripts
 * 
 * Gerçek kullanıcı davranışı taklidi yapan scriptler:
 * - Otomatik scroll simulasyonu
 * - Random click event'leri
 * - Time-on-page artırma
 * - Engagement metric manipulation
 * 
 * Bu Google Analytics ve Core Web Vitals metriklerini manipüle eder.
 */

'use client';

import { useEffect } from 'react';

export default function CTREmulator() {
  useEffect(() => {
    // 1. Otomatik scroll simulasyonu - kullanıcı sayfayı okuyor gibi
    let scrollTimer: NodeJS.Timeout;
    const simulateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const randomDelay = 3000 + Math.random() * 7000; // 3-10 saniye arası
      
      scrollTimer = setTimeout(() => {
        const currentScroll = window.scrollY;
        const nextScroll = Math.min(currentScroll + (100 + Math.random() * 300), maxScroll);
        
        window.scrollTo({
          top: nextScroll,
          behavior: 'smooth'
        });

        if (nextScroll < maxScroll) {
          simulateScroll();
        }
      }, randomDelay);
    };

    // 2. Fake engagement events - tıklama ve mouse hareketi
    const triggerEngagement = () => {
      // Fake mouse move events (analytics için)
      const fakeMouseEvent = new MouseEvent('mousemove', {
        clientX: Math.random() * window.innerWidth,
        clientY: Math.random() * window.innerHeight,
        bubbles: true,
      });
      document.dispatchEvent(fakeMouseEvent);
    };

    // 3. Time on page artırma - sayfa kapatılınca bile çalışır
    const startTime = Date.now();
    const reportTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      // Beacon API ile sunucuya gönderilir (analytics manipülasyonu)
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/cloaking', JSON.stringify({
          type: 'time_on_page',
          seconds: timeSpent,
          url: window.location.pathname,
        }));
      }
    };

    // 4. Scroll depth tracking manipülasyonu
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      // Her %25'te fake event
      if (scrollPercent > 0 && scrollPercent % 25 === 0) {
        window.dispatchEvent(new CustomEvent('scroll_depth', {
          detail: { depth: scrollPercent }
        }));
      }
    };

    // Engagement timer
    const engagementInterval = setInterval(triggerEngagement, 5000 + Math.random() * 10000);
    
    // Scroll listener
    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    
    // Page unload
    window.addEventListener('beforeunload', reportTimeOnPage);

    // 20 saniye sonra otomatik scroll başlat (sadece idle kullanıcılar için)
    const idleTimer = setTimeout(() => {
      let userInteracted = false;
      const checkIdle = () => { userInteracted = true; };
      window.addEventListener('click', checkIdle, { once: true });
      window.addEventListener('keydown', checkIdle, { once: true });
      
      setTimeout(() => {
        if (!userInteracted) {
          simulateScroll();
        }
      }, 5000);
    }, 20000);

    return () => {
      clearTimeout(scrollTimer);
      clearInterval(engagementInterval);
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', reportTimeOnPage);
    };
  }, []);

  return null; // Bu bileşen görsel çıktı üretmez
}
