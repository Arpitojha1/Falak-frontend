export type Track = 'proshow' | 'cultural' | 'sports' | 'esports';
export type SkinType = 'A' | 'B' | 'C' | 'D' | 'E';

export interface PassConfig {
  id: string;
  skin: SkinType;
  displayName: string;
  audience: 'MAHE' | 'Non-MAHE';
  price: string;
  validity: string;
  includes: Track[];
  sku: string;
}

export const PASSES_CONFIG: PassConfig[] = [
  {
    id: 'non-mahe-proshow',
    skin: 'A',
    displayName: 'Proshow',
    audience: 'Non-MAHE',
    price: '₹599',
    validity: 'DAY 1 – DAY 3',
    includes: ['proshow'],
    sku: 'FLK26-NM-PRO-001'
  },
  {
    id: 'non-mahe-proshow-cultural',
    skin: 'B',
    displayName: 'Proshow + Cultural',
    audience: 'Non-MAHE',
    price: '₹1060',
    validity: 'DAY 1 – DAY 3',
    includes: ['proshow', 'cultural'],
    sku: 'FLK26-NM-PROCUL-002'
  },
  {
    id: 'non-mahe-sports',
    skin: 'C',
    displayName: 'Sports',
    audience: 'Non-MAHE',
    price: 'VARIES',
    validity: 'DAY 1 – DAY 3',
    includes: ['sports'],
    sku: 'FLK26-NM-SPT-003'
  },
  {
    id: 'non-mahe-esports',
    skin: 'D',
    displayName: 'Esports',
    audience: 'Non-MAHE',
    price: '₹119',
    validity: 'DAY 1 – DAY 3',
    includes: ['esports'],
    sku: 'FLK26-NM-ESP-004'
  },
  {
    id: 'mahe-proshow-cultural',
    skin: 'B',
    displayName: 'Proshow + Cultural',
    audience: 'MAHE',
    price: '₹899',
    validity: 'DAY 1 – DAY 3',
    includes: ['proshow', 'cultural'],
    sku: 'FLK26-MH-PROCUL-005'
  },
  {
    id: 'mahe-full',
    skin: 'E',
    displayName: 'Proshow + Cultural + Sports',
    audience: 'MAHE',
    price: '₹999',
    validity: 'DAY 1 – DAY 3',
    includes: ['proshow', 'cultural', 'sports'],
    sku: 'FLK26-MH-FULL-006'
  },
  {
    id: 'mahe-esports',
    skin: 'D',
    displayName: 'Esports',
    audience: 'MAHE',
    price: '₹99',
    validity: 'DAY 1 – DAY 3',
    includes: ['esports'],
    sku: 'FLK26-MH-ESP-007'
  }
];
