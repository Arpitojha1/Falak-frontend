// Falak '26 — Passes Data
// 3-tier pass system: Gully, Full Falak, Star

export interface PassFeature {
  label: string;
  labelHindi: string;
  gully: string | boolean;
  fullFalak: string | boolean;
  star: string | boolean;
}

export interface PassTier {
  id: 'gully' | 'full-falak' | 'star';
  name: string;
  nameHindi: string;
  tagline: string;
  taglineHindi: string;
  price: string;
  priceNote: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  badgeLabel: string;
  badgeLabelHindi: string;
  isFeatured?: boolean;
  buyLink: string;
  includes: string[];
}

export const PASS_TIERS: PassTier[] = [
  {
    id: 'gully',
    name: 'Gully Pass',
    nameHindi: 'गली पास',
    tagline: 'One day, full masti.',
    taglineHindi: 'एक दिन का मज़ा',
    price: '₹TBD',
    priceNote: 'per day entry',
    accentColor: '#0057FF', // cobalt-blue
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'TIER 01 · SINGLE DAY',
    badgeLabelHindi: 'एक दिन',
    buyLink: '#',
    includes: [
      '1-day full access',
      'All 60+ events (that day)',
      'Cannot buy print items',
      'Food court discounts',
      'Official Falak lanyard',
    ],
  },
  {
    id: 'full-falak',
    name: 'Full Falak Pass',
    nameHindi: 'फुल फलक पास',
    tagline: 'Sab kuch. Full Falak.',
    taglineHindi: 'तीनों दिन — पूरा फलक',
    price: '₹TBD',
    priceNote: 'all 3 days',
    accentColor: '#FF3D7F', // convergence-magenta
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'TIER 02 · FULL PASS',
    badgeLabelHindi: 'फुल पास',
    isFeatured: true,
    buyLink: '#',
    includes: [
      'All 3 days access',
      'All 60+ events',
      'Pro Nights (DJ + Bands)',
      'Food court discounts',
      'Official Falak lanyard',
    ],
  },
  {
    id: 'star',
    name: 'Star Pass',
    nameHindi: 'स्टार पास',
    tagline: 'Full VIP treatment.',
    taglineHindi: 'स्टार वाली एंट्री',
    price: '₹TBD',
    priceNote: 'all 3 days + perks',
    accentColor: '#C6FF00', // acid-lime
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'TIER 03 · FULL-UP',
    badgeLabelHindi: 'स्टार',
    buyLink: '#',
    includes: [
      'Sub-kuch FULL moh hai',
      'All 3 days',
      'Priority entry lane',
      'Limited merch kit',
      'Star lounge + backstage tour',
    ],
  },
];

export const PASS_FEATURES: PassFeature[] = [
  {
    label: 'All 3 days entry',
    labelHindi: 'तीनों दिन एंट्री',
    gully: '1 day',
    fullFalak: true,
    star: true,
  },
  {
    label: 'All 60+ events',
    labelHindi: 'सभी इवेंट्स',
    gully: 'That day',
    fullFalak: true,
    star: true,
  },
  {
    label: 'Pro Nights (DJ + Bands)',
    labelHindi: 'प्रो नाइट्स',
    gully: 'That night',
    fullFalak: true,
    star: 'BOTH',
  },
  {
    label: 'Priority entry lane',
    labelHindi: 'प्रायोरिटी एंट्री',
    gully: false,
    fullFalak: false,
    star: true,
  },
  {
    label: 'Merch kit',
    labelHindi: 'मर्च किट',
    gully: false,
    fullFalak: false,
    star: true,
  },
  {
    label: 'Backstage Tour',
    labelHindi: 'बैकस्टेज टूर',
    gully: false,
    fullFalak: false,
    star: true,
  },
];

// Passes footnote text
export const PASSES_FINE_PRINT =
  'Students only · College ID zaroori · Passes limited hain bhai';
export const PASSES_FINE_PRINT_HINDI =
  'सिर्फ़ छात्रों के लिए · कॉलेज ID ज़रूरी · पास सीमित हैं भाई';
