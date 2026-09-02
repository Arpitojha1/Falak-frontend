export interface CultureEvent {
  id: string;
  title: string;
  devanagari: string;      // Hindi/Devanagari name of the event
  category: string;        // stamp denomination label (e.g. "Performing Arts")
  denomination: string;    // stamp value label (e.g. "₹25")
  teaser: string;
  description: string;
  date: string;
  venue: string;
  format: string;
  rulesLink?: string;
  /** Placeholder image for the StampCTA photo slot.
   *  TODO: Replace all values with real per-event photography before launch.
   *  Currently sourced from reference/cultural/ — portrait/scene images only,
   *  not stamp-format or text-heavy references. */
  placeholderImg: string;
}

// Placeholder image pool (photographic/portrait refs only):
// ref_c-2  — chaiwala duotone (scene)
// ref_c-4  — Bharatanatyam dancer portrait (classical dance)
// ref_c-16 — dancer stencil (high-contrast, strong silhouette)
// ref_c-17 — performer, stage-lit (dramatic, expressive)
const IMG = {
  dancer: '/assets/reference/cultural/ref_c-4.jpg',
  stencil: '/assets/reference/cultural/ref_c-16.jpg',
  performer: '/assets/reference/cultural/ref_c-17.jpg',
  chaiwala: '/assets/reference/cultural/ref_c-2.jpg',
} as const;

export const cultureData: CultureEvent[] = [
  {
    id: 'classical-dance',
    title: 'Natyanjali',
    devanagari: 'नृत्यांजलि',
    category: 'Performing Arts',
    denomination: '₹25',
    teaser: 'Where mudra meets sky.',
    description: 'The premier classical dance competition at Falak. Solo and group categories spanning Bharatanatyam, Kathak, Odissi, and Kuchipudi. Judged on abhinaya, nritta precision, and rhythmic clarity.',
    date: 'Oct 15, 2026 | 05:00 PM',
    venue: 'Main Auditorium',
    format: 'Solo & Group',
    rulesLink: '#',
    placeholderImg: IMG.dancer,
  },
  {
    id: 'folk-fusion',
    title: 'Rang Baazi',
    devanagari: 'रंगबाज़ी',
    category: 'Folk & Fusion',
    denomination: '₹15',
    teaser: 'Tradition turned electric.',
    description: 'Folk dance meets modern fusion. Any regional form — Garba, Bhangra, Lavani, Bihu — reimagined for the contemporary stage. Group act, 6–20 performers. Costumes are judged.',
    date: 'Oct 15, 2026 | 07:30 PM',
    venue: 'Open Air Amphitheatre',
    format: 'Group (6–20)',
    rulesLink: '#',
    placeholderImg: IMG.performer,
  },
  {
    id: 'music',
    title: 'Sur Sangam',
    devanagari: 'सुर संगम',
    category: 'Music',
    denomination: '₹20',
    teaser: 'Notes that outlast the night.',
    description: "Classical and semi-classical vocal and instrumental competition. Ragas, thumris, ghazals welcome. Judged on sur, taal, and presentation. Accompaniment by Falak's own tabla-harmonium ensemble.",
    date: 'Oct 16, 2026 | 04:00 PM',
    venue: 'Music Hall',
    format: 'Solo Performance',
    rulesLink: '#',
    placeholderImg: IMG.chaiwala,
  },
  {
    id: 'fashion',
    title: 'Tasveer',
    devanagari: 'तस्वीर',
    category: 'Fashion & Art',
    denomination: '₹30',
    teaser: 'Fabric as language.',
    description: "India's textile traditions take the runway. Teams design and model 3 outfits built around a declared cultural theme — heritage weaves, regional embroidery, or upcycled craft. The ramp is yours.",
    date: 'Oct 16, 2026 | 07:00 PM',
    venue: 'Main Auditorium',
    format: 'Team (3–8)',
    rulesLink: '#',
    placeholderImg: IMG.stencil,
  },
  {
    id: 'street-play',
    title: 'Nukkad Natak',
    devanagari: 'नुक्कड़ नाटक',
    category: 'Theatre',
    denomination: '₹10',
    teaser: 'No stage. No excuses.',
    description: 'Street theatre at its rawest. 10–15 minutes, no mic, no fixed staging area. Performance can begin anywhere on the grounds. Message-driven, socially rooted, viscerally delivered.',
    date: 'Oct 17, 2026 | 03:00 PM',
    venue: 'Campus Grounds',
    format: 'Group (8–15)',
    rulesLink: '#',
    placeholderImg: IMG.performer,
  },
  {
    id: 'fine-arts',
    title: 'Rangoli & Kala',
    devanagari: 'रंगोली और कला',
    category: 'Visual Arts',
    denomination: '₹05',
    teaser: 'Colours that remember.',
    description: 'On-the-spot Rangoli creation (72 × 72 cm canvas, any medium) and competitive sketching/painting. Judged on cultural authenticity, technique, and visual storytelling. Participation open to individuals.',
    date: 'Oct 17, 2026 | 10:00 AM',
    venue: 'Arts Courtyard',
    format: 'Individual',
    rulesLink: '#',
    placeholderImg: IMG.dancer,
  },
];
