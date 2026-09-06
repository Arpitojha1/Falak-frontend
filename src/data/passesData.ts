// Falak '26 — Passes Data
// 3-tier pass system: Gully, Full Falak, Star

export interface PassFeature {
  label: string;
  gully: string | boolean;
  fullFalak: string | boolean;
  star: string | boolean;
}

export interface PassTier {
  id: 'gully' | 'full-falak' | 'star';
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  badgeLabel: string;
  isFeatured?: boolean;
  buyLink: string;
  includes: string[];
}

export const PASS_TIERS: PassTier[] = [
  {
    id: 'gully',
    name: 'Gully Pass',
    tagline: 'One day, full masti.',
    price: '₹TBD',
    priceNote: 'per day entry',
    accentColor: '#0057FF', // cobalt-blue
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'TIER 01 · SINGLE DAY',
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
    tagline: 'Sab kuch. Full Falak.',
    price: '₹TBD',
    priceNote: 'all 3 days',
    accentColor: '#FF3D7F', // convergence-magenta
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'TIER 02 · FULL PASS',
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
    tagline: 'Full VIP treatment.',
    price: '₹TBD',
    priceNote: 'all 3 days + perks',
    accentColor: '#C6FF00', // acid-lime
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'TIER 03 · FULL-UP',
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
    gully: '1 day',
    fullFalak: true,
    star: true,
  },
  {
    label: 'All 60+ events',
    gully: 'That day',
    fullFalak: true,
    star: true,
  },
  {
    label: 'Pro Nights (DJ + Bands)',
    gully: 'That night',
    fullFalak: true,
    star: 'BOTH',
  },
  {
    label: 'Priority entry lane',
    gully: false,
    fullFalak: false,
    star: true,
  },
  {
    label: 'Merch kit',
    gully: false,
    fullFalak: false,
    star: true,
  },
  {
    label: 'Backstage Tour',
    gully: false,
    fullFalak: false,
    star: true,
  },
];

// Passes footnote text
export const PASSES_FINE_PRINT =
  'Students only · College ID zaroori · Passes limited hain bhai';
