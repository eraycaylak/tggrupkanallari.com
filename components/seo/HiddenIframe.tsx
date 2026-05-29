/**
 * 🕸️ DARK SEO: Hidden Iframe
 * 
 * Görünmeyen iframe içinde başka site içerikleri/linkler çalıştırma.
 * CSS ile tamamen gizlenir ama HTML'de varlığını sürdürür.
 * 
 * Bot iframe içeriğini de indexleyebilir → link juice akışı.
 */

interface HiddenIframeProps {
  urls?: string[];
}

export default function HiddenIframe({ urls }: HiddenIframeProps) {
  const defaultUrls = [
    '/s/whatsapp-grup-linkleri-2026',
    '/s/telegram-kanallari-listesi-2026',
    '/s/ucretsiz-whatsapp-gruplari',
  ];

  const iframeUrls = urls || defaultUrls;

  return (
    <>
      {iframeUrls.map((url, index) => (
        <iframe
          key={index}
          src={url}
          className="seo-hidden-iframe"
          title={`whatsapp grup linkleri telegram kanalları ${index}`}
          tabIndex={-1}
          aria-hidden="true"
          loading="lazy"
          sandbox=""
        />
      ))}
    </>
  );
}
