// Falak '26 — Passes Data
// MAHE / NON-MAHE pass system with Early Bird pricing

export type PassCategory = 'mahe' | 'non-mahe';

export interface PassTier {
  id: string;
  category: PassCategory;
  name: string;
  tagline: string;
  includes: string;
  earlyBirdPrice: number | null; // null = varies per event
  regularPrice: number | null;   // null = varies per event
  priceNote: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  badgeLabel: string;
  isFeatured?: boolean;
  buyLink: string;
  perks: string[];
  remarks?: string;
}

export interface PassFeature {
  label: string;
  maheProshowCultural: string | boolean;
  maheProshowCulturalSports: string | boolean;
  maheEsports: string | boolean;
  nonMaheProshowCultural: string | boolean;
  nonMaheSports: string | boolean;
  nonMaheProshow: string | boolean;
  nonMaheEsports: string | boolean;
}

export interface SportsEntryFee {
  category: string;
  event: string;
  entryFee: number;
  teamSize: number | string;
  feeType: 'Individual' | 'Team';
}

// ─── MAHE PASSES ───────────────────────────────────────────────────────────────

export const MAHE_PASSES: PassTier[] = [
  {
    id: 'mahe-proshow-cultural',
    category: 'mahe',
    name: 'Proshow + Cultural',
    tagline: 'Proshows and cultural events — the full creative experience.',
    includes: 'Proshow + Cultural',
    earlyBirdPrice: 779,
    regularPrice: 899,
    priceNote: 'early bird',
    accentColor: '#FF3D7F',
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'MAHE · CULTURAL',
    isFeatured: true,
    buyLink: '#',
    perks: [
      'Entry to all cultural events',
      'Pro Night access (DJ + Bands)',
      'Comedy / Proshow entry',
      'Food court perks',
    ],
  },
  {
    id: 'mahe-proshow-cultural-sports',
    category: 'mahe',
    name: 'Proshow + Cultural + Sports',
    tagline: 'Everything Falak has to offer — culture, sports, proshows.',
    includes: 'Proshow + Cultural + Sports',
    earlyBirdPrice: 879,
    regularPrice: 999,
    priceNote: 'early bird',
    accentColor: '#C6FF00',
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'MAHE · ALL ACCESS',
    buyLink: '#',
    perks: [
      'Everything in Cultural pass',
      'Entry to all sports events',
      'Compete in any sport',
      'Full campus access',
    ],
  },
  {
    id: 'mahe-esports',
    category: 'mahe',
    name: 'Esports Pass',
    tagline: 'Valorant, BGMI, FIFA, CODM, Clash Royale.',
    includes: 'Esports',
    earlyBirdPrice: 99,
    regularPrice: 99,
    priceNote: 'flat rate',
    accentColor: '#8A5CFF',
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'MAHE · ESPORTS',
    buyLink: '#',
    perks: [
      'All esports tournaments',
      'Valorant, BGMI, CODM',
      'FIFA, Clash Royale',
      'Gaming lounge access',
    ],
  },
];

// ─── NON-MAHE PASSES ───────────────────────────────────────────────────────────

export const NON_MAHE_PASSES: PassTier[] = [
  {
    id: 'non-mahe-proshow-cultural',
    category: 'non-mahe',
    name: 'Proshow + Cultural',
    tagline: 'Full cultural experience — proshows, performances, competitions.',
    includes: 'Proshow + Cultural',
    earlyBirdPrice: 920,
    regularPrice: 1060,
    priceNote: 'early bird',
    accentColor: '#FF3D7F',
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'NON-MAHE · CULTURAL',
    isFeatured: true,
    buyLink: '#',
    perks: [
      'Entry to all cultural events',
      'Pro Night access (DJ + Bands)',
      'Comedy / Proshow entry',
      'Food court perks',
    ],
  },
  {
    id: 'non-mahe-sports',
    category: 'non-mahe',
    name: 'Sports Pass',
    tagline: 'Individual sports events — entry fee per event.',
    includes: 'Individual Sports Events',
    earlyBirdPrice: null,
    regularPrice: null,
    priceNote: 'per event',
    accentColor: '#C6FF00',
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'NON-MAHE · SPORTS',
    buyLink: '#',
    perks: [
      'Entry fee varies per sport',
      'Individual & team events',
      'See sports fee table below',
    ],
    remarks: 'Each sports event requires a separate entry fee',
  },
  {
    id: 'non-mahe-proshow',
    category: 'non-mahe',
    name: 'Proshow Pass',
    tagline: 'Just the proshows — comedy nights, concerts, the big acts.',
    includes: 'Proshow',
    earlyBirdPrice: 499,
    regularPrice: 599,
    priceNote: 'early bird',
    accentColor: '#0057FF',
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'NON-MAHE · PROSHOW',
    buyLink: '#',
    perks: [
      'Pro Night entry',
      'Comedy / Proshow access',
      'Does NOT include cultural events',
    ],
  },
  {
    id: 'non-mahe-esports',
    category: 'non-mahe',
    name: 'Esports Pass',
    tagline: 'Valorant, BGMI, FIFA, CODM, Clash Royale.',
    includes: 'Esports',
    earlyBirdPrice: 119,
    regularPrice: 119,
    priceNote: 'flat rate',
    accentColor: '#8A5CFF',
    bgColor: '#EDE4D3',
    textColor: '#0B0F2B',
    badgeLabel: 'NON-MAHE · ESPORTS',
    buyLink: '#',
    perks: [
      'All esports tournaments',
      'Valorant, BGMI, CODM',
      'FIFA, Clash Royale',
      'Gaming lounge access',
    ],
  },
];

// ─── COMPARISON FEATURES ────────────────────────────────────────────────────────

export const PASS_FEATURES: PassFeature[] = [
  {
    label: 'Cultural Events',
    maheProshowCultural: true,
    maheProshowCulturalSports: true,
    maheEsports: false,
    nonMaheProshowCultural: true,
    nonMaheSports: false,
    nonMaheProshow: false,
    nonMaheEsports: false,
  },
  {
    label: 'Proshow / Pro Night',
    maheProshowCultural: true,
    maheProshowCulturalSports: true,
    maheEsports: false,
    nonMaheProshowCultural: true,
    nonMaheSports: false,
    nonMaheProshow: true,
    nonMaheEsports: false,
  },
  {
    label: 'Sports Events',
    maheProshowCultural: false,
    maheProshowCulturalSports: true,
    maheEsports: false,
    nonMaheProshowCultural: false,
    nonMaheSports: 'Per event fee',
    nonMaheProshow: false,
    nonMaheEsports: false,
  },
  {
    label: 'Esports Tournaments',
    maheProshowCultural: false,
    maheProshowCulturalSports: false,
    maheEsports: true,
    nonMaheProshowCultural: false,
    nonMaheSports: false,
    nonMaheProshow: false,
    nonMaheEsports: true,
  },
];

// ─── NON-MAHE SPORTS ENTRY FEES ─────────────────────────────────────────────────

export const SPORTS_ENTRY_FEES: SportsEntryFee[] = [
  // Athletics
  { category: 'Athletics', event: "Men's 100m", entryFee: 400, teamSize: 1, feeType: 'Individual' },
  { category: 'Athletics', event: "Women's 100m", entryFee: 300, teamSize: 1, feeType: 'Individual' },
  { category: 'Athletics', event: "Men's 200m", entryFee: 300, teamSize: 1, feeType: 'Individual' },
  { category: 'Athletics', event: "Women's 200m", entryFee: 300, teamSize: 1, feeType: 'Individual' },
  { category: 'Athletics', event: "Men's 400m", entryFee: 300, teamSize: 1, feeType: 'Individual' },
  { category: 'Athletics', event: "Women's 400m", entryFee: 300, teamSize: 1, feeType: 'Individual' },
  { category: 'Athletics', event: "Men's 1500m", entryFee: 300, teamSize: 1, feeType: 'Individual' },
  { category: 'Athletics', event: "Women's 800m", entryFee: 300, teamSize: 1, feeType: 'Individual' },
  { category: 'Athletics', event: "Men's 4x100m Relay", entryFee: 800, teamSize: 4, feeType: 'Team' },
  { category: 'Athletics', event: "Women's 4x100m Relay", entryFee: 800, teamSize: 4, feeType: 'Team' },
  { category: 'Athletics', event: "Mixed 4x100m Relay", entryFee: 800, teamSize: 4, feeType: 'Team' },
  // Team Sports
  { category: 'Cricket', event: "Men's", entryFee: 8000, teamSize: 16, feeType: 'Team' },
  { category: 'Badminton', event: "Men's Team", entryFee: 3500, teamSize: 7, feeType: 'Team' },
  { category: 'Badminton', event: "Women's Team", entryFee: 2500, teamSize: 5, feeType: 'Team' },
  { category: 'Badminton', event: 'Mixed Doubles', entryFee: 800, teamSize: 2, feeType: 'Team' },
  { category: 'Table Tennis', event: "Men's Team", entryFee: 1800, teamSize: 5, feeType: 'Team' },
  { category: 'Table Tennis', event: "Women's Team", entryFee: 1500, teamSize: 5, feeType: 'Team' },
  { category: 'Basketball', event: "Men's", entryFee: 6000, teamSize: 12, feeType: 'Team' },
  { category: 'Basketball', event: "Women's", entryFee: 4000, teamSize: 12, feeType: 'Team' },
  { category: 'Football', event: "Men's", entryFee: 8500, teamSize: 16, feeType: 'Team' },
  { category: 'Football', event: "Women's", entryFee: 4000, teamSize: 13, feeType: 'Team' },
  { category: 'Volleyball', event: "Men's", entryFee: 3400, teamSize: 12, feeType: 'Team' },
  { category: 'Volleyball', event: "Women's", entryFee: 2000, teamSize: 12, feeType: 'Team' },
  { category: 'Chess', event: 'Team (Mixed)', entryFee: 1800, teamSize: 6, feeType: 'Team' },
  { category: 'Lawn Tennis', event: "Men's Team", entryFee: 3000, teamSize: 4, feeType: 'Team' },
  { category: 'Lawn Tennis', event: "Women's Singles", entryFee: 400, teamSize: 1, feeType: 'Individual' },
  { category: 'Squash', event: "Men's Singles", entryFee: 500, teamSize: 1, feeType: 'Individual' },
  { category: 'Squash', event: "Women's Singles", entryFee: 400, teamSize: 1, feeType: 'Individual' },
];

// Passes footnote text
export const PASSES_FINE_PRINT =
  'College ID mandatory · Early bird prices are limited · Prices may change without notice';
