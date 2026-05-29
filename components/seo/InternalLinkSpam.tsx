/**
 * 🕸️ DARK SEO: Internal Link Spam
 * 
 * İçerikteki her keyword'ü otomatik olarak ilgili dahili sayfaya linkler.
 * Her 2-3 kelimeyi rastgele bir iç sayfaya bağlar.
 * Title attributelarına keyword spam ekler.
 * 
 * Google bunu "excessive internal linking" olarak algılar.
 */

import Link from 'next/link';

interface InternalLinkSpamProps {
  text: string;
  density?: number; // Her kaç kelimede bir link (default: 4)
}

const linkTargets = [
  { keywords: ['ifşa', 'ifsa'], href: '/telegram-ifsa-kanallari', anchor: 'Telegram İfşa Kanalları' },
  { keywords: ['türk ifşa', 'turk ifsa'], href: '/telegram-ifsa-kanallari', anchor: 'Telegram Türk İfşa' },
  { keywords: ['kripto', 'crypto'], href: '/telegram-kripto-kanallari', anchor: 'Telegram Kripto Kanalları' },
  { keywords: ['bitcoin', 'btc', 'coin'], href: '/telegram-kripto-kanallari', anchor: 'Telegram Bitcoin Kanalları' },
  { keywords: ['altcoin', 'defi'], href: '/s/telegram-altcoin-gem-kanallari', anchor: 'Telegram Altcoin Kanalları' },
  { keywords: ['iddaa', 'bahis'], href: '/telegram-iddaa-kanallari', anchor: 'Telegram İddaa Kanalları' },
  { keywords: ['kupon', 'banko'], href: '/telegram-iddaa-kanallari', anchor: 'Telegram Kupon Kanalları' },
  { keywords: ['kpss', 'sınav'], href: '/telegram-kpss-kanallari', anchor: 'Telegram KPSS Kanalları' },
  { keywords: ['oyun', 'game', 'gaming'], href: '/telegram-oyun-kanallari', anchor: 'Telegram Oyun Kanalları' },
  { keywords: ['apk', 'mod'], href: '/telegram-oyun-kanallari', anchor: 'Telegram APK Kanalları' },
  { keywords: ['telegram', 'tg'], href: '/telegram-kanallari', anchor: 'Telegram Kanalları' },
  { keywords: ['whatsapp', 'wp'], href: '/whatsapp-gruplari', anchor: 'WhatsApp Grupları' },
  { keywords: ['sinyal', 'signal'], href: '/s/telegram-kripto-sinyal-ucretsiz', anchor: 'Kripto Sinyal' },
  { keywords: ['pump'], href: '/s/telegram-bitcoin-pump-sinyal', anchor: 'Bitcoin Pump Sinyal' },
  { keywords: ['eğitim', 'ders'], href: '/telegram-kpss-kanallari', anchor: 'Eğitim Kanalları' },
  { keywords: ['spor', 'futbol', 'maç'], href: '/telegram-iddaa-kanallari', anchor: 'Spor Kanalları' },
  { keywords: ['katıl', 'üye'], href: '/', anchor: 'Hemen Katıl' },
  { keywords: ['grup', 'kanal'], href: '/telegram-kanallari', anchor: 'Tüm Kanallar' },
];

function findLinkTarget(word: string) {
  const lower = word.toLowerCase().replace(/[.,!?;:'"()]/g, '');
  return linkTargets.find(target =>
    target.keywords.some(kw => lower.includes(kw))
  );
}

export default function InternalLinkSpam({ text, density = 4 }: InternalLinkSpamProps) {
  const words = text.split(' ');
  const elements: React.ReactNode[] = [];
  let linkCount = 0;

  words.forEach((word, index) => {
    const target = findLinkTarget(word);
    
    if (target && linkCount < Math.floor(words.length / density)) {
      elements.push(
        <Link
          key={index}
          href={target.href}
          title={`${target.anchor} - WhatsApp Grup Linkleri Telegram Kanal Davet Linkleri 2026 Güncel`}
          style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}
        >
          {word}
        </Link>
      );
      linkCount++;
    } else {
      elements.push(<span key={index}>{word}</span>);
    }

    if (index < words.length - 1) {
      elements.push(' ');
    }
  });

  return <>{elements}</>;
}
