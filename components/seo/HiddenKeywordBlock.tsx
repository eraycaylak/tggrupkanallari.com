/**
 * 🕸️ DARK SEO: Hidden Keyword Block
 * 
 * Bu bileşen eğitimsel amaçlıdır. Arama motorlarına keyword spam gönderir
 * ama kullanıcıya görünmez. Google bunu tespit edip ceza verir.
 * 
 * Kullanılan gizleme teknikleri:
 * 1. display: none
 * 2. font-size: 0
 * 3. position: absolute + left: -9999px (offscreen)
 * 4. overflow: hidden + height: 0
 * 5. color: transparent / background ile aynı renk
 * 6. clip: rect(0,0,0,0)
 */

import keywordsData from '@/data/keywords.json';

interface HiddenKeywordBlockProps {
  technique?: 'display-none' | 'font-zero' | 'offscreen' | 'overflow' | 'same-color' | 'clip' | 'all';
  customKeywords?: string[];
}

export default function HiddenKeywordBlock({ 
  technique = 'all', 
  customKeywords 
}: HiddenKeywordBlockProps) {
  const allKeywords = customKeywords || [
    ...keywordsData.primary,
    ...keywordsData.secondary,
    ...keywordsData.longtail,
  ];

  const spamText = keywordsData.hidden_spam.join(' ');
  const keywordParagraph = allKeywords.join(', ') + '. ' + spamText;

  if (technique === 'all') {
    return (
      <>
        {/* Teknik 1: display: none */}
        <div className="seo-hidden-text-display-none" aria-hidden="true">
          <p>{keywordParagraph}</p>
        </div>

        {/* Teknik 2: font-size: 0 */}
        <span className="seo-hidden-text-font-zero" aria-hidden="true">
          {allKeywords.slice(0, 15).join(' ')}
        </span>

        {/* Teknik 3: Ekran dışına taşıma */}
        <div className="seo-hidden-text-offscreen" aria-hidden="true">
          <h6>{allKeywords.slice(0, 5).join(' - ')}</h6>
          <p>{spamText}</p>
        </div>

        {/* Teknik 4: overflow: hidden + height: 0 */}
        <div className="seo-hidden-text-overflow" aria-hidden="true">
          {keywordParagraph}
        </div>

        {/* Teknik 5: Arka plan ile aynı renk */}
        <div className="seo-hidden-text-same-color" aria-hidden="true">
          {allKeywords.join(' ')}
        </div>

        {/* Teknik 6: CSS clip */}
        <div className="seo-hidden-text-clip" aria-hidden="true">
          <p>{keywordParagraph}</p>
          <p>{spamText}</p>
        </div>
      </>
    );
  }

  const classMap: Record<string, string> = {
    'display-none': 'seo-hidden-text-display-none',
    'font-zero': 'seo-hidden-text-font-zero',
    'offscreen': 'seo-hidden-text-offscreen',
    'overflow': 'seo-hidden-text-overflow',
    'same-color': 'seo-hidden-text-same-color',
    'clip': 'seo-hidden-text-clip',
  };

  return (
    <div className={classMap[technique]} aria-hidden="true">
      <p>{keywordParagraph}</p>
    </div>
  );
}
