import channelsData from '@/data/channels.json';
import categoriesData from '@/data/categories.json';

export interface Channel {
  id: string;
  name: string;
  slug: string;
  platform: 'telegram' | 'whatsapp';
  category: string;
  description: string;
  memberCount: number;
  link: string;
  tags: string[];
  featured: boolean;
  verified: boolean;
  createdAt: string;
  city: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
}

// --- Channel Operations ---
export function getAllChannels(): Channel[] {
  return channelsData as Channel[];
}

export function getChannelBySlug(slug: string, includeUnverified: boolean = false): Channel | undefined {
  return (channelsData as Channel[]).find(
    ch => ch.slug === slug && (includeUnverified || ch.verified)
  );
}

export function getChannelsByCategory(categoryId: string, includeUnverified: boolean = false): Channel[] {
  return (channelsData as Channel[]).filter(
    ch => ch.category === categoryId && (includeUnverified || ch.verified)
  );
}

export function getChannelsByPlatform(platform: 'telegram' | 'whatsapp', includeUnverified: boolean = false): Channel[] {
  return (channelsData as Channel[]).filter(
    ch => ch.platform === platform && (includeUnverified || ch.verified)
  );
}

export function getFeaturedChannels(includeUnverified: boolean = false): Channel[] {
  return (channelsData as Channel[]).filter(
    ch => ch.featured && (includeUnverified || ch.verified)
  );
}

export function searchChannels(query: string, includeUnverified: boolean = false): Channel[] {
  const q = query.toLowerCase();
  return (channelsData as Channel[]).filter(ch =>
    (includeUnverified || ch.verified) && (
      ch.name.toLowerCase().includes(q) ||
      ch.description.toLowerCase().includes(q) ||
      ch.tags.some(t => t.toLowerCase().includes(q))
    )
  );
}

export function getChannelsByCity(city: string, includeUnverified: boolean = false): Channel[] {
  return (channelsData as Channel[]).filter(
    ch => ch.city.toLowerCase() === city.toLowerCase() && (includeUnverified || ch.verified)
  );
}

export function getRelatedChannels(channel: Channel, limit: number = 4, includeUnverified: boolean = false): Channel[] {
  return (channelsData as Channel[])
    .filter(ch => ch.id !== channel.id && ch.category === channel.category && (includeUnverified || ch.verified))
    .slice(0, limit);
}


// --- Category Operations ---
export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find(cat => cat.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return (categoriesData as Category[]).find(cat => cat.id === id);
}

// --- Stats ---
export function getStats() {
  const channels = channelsData as Channel[];
  return {
    totalChannels: channels.length,
    totalMembers: channels.reduce((sum, ch) => sum + ch.memberCount, 0),
    whatsappCount: channels.filter(ch => ch.platform === 'whatsapp').length,
    telegramCount: channels.filter(ch => ch.platform === 'telegram').length,
    categoryCount: (categoriesData as Category[]).length,
    verifiedCount: channels.filter(ch => ch.verified).length,
  };
}

// --- Formatting ---
export function formatMemberCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
