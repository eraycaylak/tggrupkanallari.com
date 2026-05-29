import articlesData from '@/data/articles.json';

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
  faqs: { q: string; a: string }[];
  publishDayIndex: number;
}

// 📅 Start date of drip-feed release system
const LAUNCH_DATE = new Date('2026-05-25T00:00:00+03:00');

/**
 * Calculates the number of days passed since the launch date.
 * If we are running in development, we can mock more days to test.
 */
export function getDaysSinceLaunch(): number {
  const now = new Date();
  const diffTime = now.getTime() - LAUNCH_DATE.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Returns all articles that have been unlocked based on the current date.
 */
export function getUnlockedArticles(): Article[] {
  const daysPassed = getDaysSinceLaunch();
  return (articlesData as Article[]).filter(art => art.publishDayIndex <= daysPassed);
}

/**
 * Retrieves a specific article by slug only if it is currently unlocked.
 */
export function getArticleBySlug(slug: string): Article | undefined {
  const daysPassed = getDaysSinceLaunch();
  return (articlesData as Article[]).find(
    art => art.slug === slug && art.publishDayIndex <= daysPassed
  );
}

/**
 * Returns the newest unlocked articles first.
 */
export function getLatestArticles(limit: number = 5): Article[] {
  const unlocked = getUnlockedArticles();
  return [...unlocked]
    .sort((a, b) => b.publishDayIndex - a.publishDayIndex)
    .slice(0, limit);
}
