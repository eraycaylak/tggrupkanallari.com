/**
 * 🕸️ DARK SEO: AI Doorway Matrix
 * 
 * 81 il × N hizmet kombinasyonu = binlerce otomatik URL
 * Her şehre özel keyword varyasyonları ile unique(ish) içerik
 * 
 * Örnek: /istanbul/whatsapp-gruplari, /ankara/telegram-kanallari
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import citiesData from '@/data/cities.json';
import { generateDoorwayContent } from '@/lib/content-spinner';
import { generateSpamMeta } from '@/lib/keyword-injector';
import { getChannelsByCity, slugify } from '@/lib/db';
import ChannelCard from '@/components/ui/ChannelCard';
import HiddenKeywordBlock from '@/components/seo/HiddenKeywordBlock';
import InternalLinkSpam from '@/components/seo/InternalLinkSpam';

const services = [
  'whatsapp-gruplari',
  'telegram-kanallari',
];

interface PageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const city of citiesData) {
    for (const service of services) {
      params.push({
        city: slugify(city),
        service,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, service } = await params;
  const cityName = citiesData.find(c => slugify(c) === city) || city;
  const content = generateDoorwayContent(String(cityName), service);

  return generateSpamMeta({
    pageTitle: content.title,
    pageDescription: content.description,
    pageUrl: `https://tggrupkanallari.com/${city}/${service}`,
    keywords: [
      `${cityName} ${service.replace(/-/g, ' ')}`,
      `${cityName} whatsapp`,
      `${cityName} telegram`,
      `${cityName} grup link`,
    ],
  });
}

export default async function DoorwayPage({ params }: PageProps) {
  const { city, service } = await params;
  const cityName = citiesData.find(c => slugify(c) === city) || city;
  const content = generateDoorwayContent(String(cityName), service);
  const cityChannels = getChannelsByCity(String(cityName).toLowerCase());

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link href="/">Ana Sayfa</Link>
        <span className="breadcrumb-separator">/</span>
        <Link href={`/${service === 'whatsapp-gruplari' ? 'whatsapp-gruplari' : 'telegram-kanallari'}`}>
          {service === 'whatsapp-gruplari' ? 'WhatsApp Grupları' : 'Telegram Kanalları'}
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span>{String(cityName)}</span>
      </nav>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <h1 style={{ marginBottom: '0.75rem' }}>
          {content.h1}
        </h1>

        {/* Spun content */}
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '800px' }}>
          {content.content.split('\n\n').map((paragraph, i) => (
            <p key={i} style={{ marginBottom: '1rem' }}>
              <InternalLinkSpam text={paragraph} density={3} />
            </p>
          ))}
        </div>

        {/* Şehirdeki kanallar */}
        {cityChannels.length > 0 && (
          <>
            <h2 style={{ marginBottom: '1.5rem' }}>
              📍 {String(cityName)} Kanalları
            </h2>
            <div className="channel-grid stagger-children" style={{ marginBottom: '3rem' }}>
              {cityChannels.map(ch => (
                <ChannelCard key={ch.id} channel={ch} />
              ))}
            </div>
          </>
        )}

        {/* FAQ (doorway page'e özel) */}
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '1rem' }}>❓ Sıkça Sorulan Sorular</h2>
          {content.faqItems.map((faq, i) => (
            <details key={i} style={{
              marginBottom: '0.75rem',
              padding: '1rem',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
            }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{faq.q}</summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <InternalLinkSpam text={faq.a} density={3} />
              </p>
            </details>
          ))}
        </div>

        {/* Cross-link to other cities */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>🏙️ Diğer Şehirler</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {citiesData.slice(0, 30).map(c => (
              <Link
                key={c}
                href={`/${slugify(c)}/${service}`}
                className="tag"
                style={{ textDecoration: 'none' }}
                title={`${c} ${service.replace(/-/g, ' ')} WhatsApp Telegram Kanal Grup Link 2026`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        {/* 🕸️ DARK SEO: Doorway page hidden keywords */}
        <HiddenKeywordBlock
          customKeywords={[
            `${cityName} whatsapp grupları`,
            `${cityName} telegram kanalları`,
            `${cityName} whatsapp grup linkleri 2026`,
            `${cityName} telegram kanal linkleri güncel`,
            `${cityName} whatsapp topluluk grupları`,
            `${cityName} whatsapp grup katıl`,
            `${cityName} telegram grup katıl ücretsiz`,
          ]}
        />
      </section>
    </div>
  );
}
