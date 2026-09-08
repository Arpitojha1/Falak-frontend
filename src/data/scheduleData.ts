// Falak '26 — Unified Schedule Data
// Cultural: Oct 15–17 | Sports: Oct 9–17 | MIT Bengaluru
// Source: Cultural_timetable_falak26.pdf + Sports_Timetable_Falak26.pdf

export type EventCategory =
  | 'sports'
  | 'athletics'
  | 'esports'
  | 'dance'
  | 'music'
  | 'drama'
  | 'creative'
  | 'literary'
  | 'business'
  | 'special';

export interface FalakEvent {
  id: string;
  name: string;
  category: EventCategory;
  day: 1 | 2 | 3; // Day 1 = Oct 15, Day 2 = Oct 16, Day 3 = Oct 17
  startTime: string; // 'HH:MM' 24h
  endTime: string;   // 'HH:MM' 24h
  venue: string;
  prizePool?: string;
  isAnchor?: boolean;
  isAllDay?: boolean;
  teamSize?: string;
  entryFee?: string;
  tags?: string[];
}

// ─── Sports Tournament (Oct 9–17) ──────────────────────────────────────────────

export interface SportsDayEntry {
  sport: string;
  time: string;
  venue: string;
  stage: string; // 'start', 'pool', 'Semi Finals 1', 'Finals', etc.
}

export interface SportsDay {
  date: string;       // e.g. '2026-10-09'
  dateLabel: string;  // e.g. 'Thu, Oct 9'
  dayTag: string;     // e.g. 'Day 1'
  events: SportsDayEntry[];
}

// Category → color mapping (from existing Falak palette)
export const CATEGORY_COLORS: Record<EventCategory, string> = {
  sports:    '#FF6A00',
  athletics: '#FF6A00',
  esports:   '#8A5CFF',
  dance:     '#FF3D7F',
  music:     '#C6FF00',
  drama:     '#0057FF',
  creative:  '#FF6A00',
  literary:  '#8A5CFF',
  business:  '#C6FF00',
  special:   '#FF3D7F',
};

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  sports:    'Sports',
  athletics: 'Athletics',
  esports:   'Esports',
  dance:     'Dance',
  music:     'Music',
  drama:     'Drama',
  creative:  'Creative',
  literary:  'Literary',
  business:  'B&M',
  special:   'Special',
};

// ─────────────────────────────────────────────────────────────────────────────
// CULTURAL SCHEDULE — DAY 1: October 15 (Thursday)
// ─────────────────────────────────────────────────────────────────────────────
const DAY1_EVENTS: FalakEvent[] = [
  // Online / All-Day Creative events
  {
    id: 'd1-ad-design',
    name: 'Ad Designing',
    category: 'creative',
    day: 1,
    startTime: '09:00',
    endTime: '21:00',
    venue: 'Online',
    isAllDay: true,
    tags: ['online', 'creative'],
  },
  {
    id: 'd1-short-film',
    name: 'Short Film Making',
    category: 'creative',
    day: 1,
    startTime: '09:00',
    endTime: '21:00',
    venue: 'Online',
    isAllDay: true,
    tags: ['online', 'creative'],
  },
  {
    id: 'd1-reel-making',
    name: 'Reel Making',
    category: 'creative',
    day: 1,
    startTime: '09:00',
    endTime: '21:00',
    venue: 'Online',
    isAllDay: true,
    tags: ['online', 'creative'],
  },
  {
    id: 'd1-photography',
    name: 'Photography',
    category: 'creative',
    day: 1,
    startTime: '09:00',
    endTime: '21:00',
    venue: 'Campus',
    isAllDay: true,
    tags: ['creative'],
  },
  // Scheduled events
  {
    id: 'd1-general-quiz',
    name: 'General Quiz',
    category: 'literary',
    day: 1,
    startTime: '09:00',
    endTime: '10:00',
    venue: 'Classroom / Audi',
  },
  {
    id: 'd1-pop-quiz',
    name: 'Pop Culture Quiz',
    category: 'literary',
    day: 1,
    startTime: '10:00',
    endTime: '11:00',
    venue: 'Classroom / Audi',
  },
  {
    id: 'd1-mock-trading',
    name: 'Mock Trading',
    category: 'business',
    day: 1,
    startTime: '10:00',
    endTime: '15:30',
    venue: 'Classroom / Audi',
  },
  {
    id: 'd1-debate',
    name: 'Debate',
    category: 'literary',
    day: 1,
    startTime: '10:00',
    endTime: '15:00',
    venue: 'Classroom / Audi',
  },
  {
    id: 'd1-shark-tank',
    name: 'Shark Tank',
    category: 'business',
    day: 1,
    startTime: '11:30',
    endTime: '15:30',
    venue: 'Classroom / Audi',
  },
  {
    id: 'd1-treasure-hunt',
    name: 'Treasure Hunt',
    category: 'special',
    day: 1,
    startTime: '17:30',
    endTime: '21:00',
    venue: 'Campus-wide',
    tags: ['outdoor'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CULTURAL SCHEDULE — DAY 2: October 16 (Friday)
// ─────────────────────────────────────────────────────────────────────────────
const DAY2_EVENTS: FalakEvent[] = [
  {
    id: 'd2-stage-play',
    name: 'Stage Play',
    category: 'drama',
    day: 2,
    startTime: '09:00',
    endTime: '12:00',
    venue: 'AB1 Audi',
  },
  {
    id: 'd2-valorant',
    name: 'Valorant',
    category: 'esports',
    day: 2,
    startTime: '10:30',
    endTime: '16:00',
    venue: 'Classroom',
    tags: ['esports'],
  },
  {
    id: 'd2-fifa',
    name: 'FIFA',
    category: 'esports',
    day: 2,
    startTime: '10:30',
    endTime: '16:00',
    venue: 'AB4 Ground Floor',
    tags: ['esports'],
  },
  {
    id: 'd2-codm',
    name: 'CODM',
    category: 'esports',
    day: 2,
    startTime: '10:30',
    endTime: '16:00',
    venue: 'Classroom',
    tags: ['esports'],
  },
  {
    id: 'd2-bgmi',
    name: 'BGMI',
    category: 'esports',
    day: 2,
    startTime: '10:30',
    endTime: '16:00',
    venue: 'Classroom',
    tags: ['esports'],
  },
  {
    id: 'd2-clash-royale',
    name: 'Clash Royale',
    category: 'esports',
    day: 2,
    startTime: '10:30',
    endTime: '16:00',
    venue: 'Classroom',
    tags: ['esports'],
  },
  {
    id: 'd2-solo-classical',
    name: 'Solo Classical Dance',
    category: 'dance',
    day: 2,
    startTime: '11:00',
    endTime: '12:30',
    venue: 'Mega Audi',
  },
  {
    id: 'd2-group-classical',
    name: 'Group Classical Dance',
    category: 'dance',
    day: 2,
    startTime: '12:30',
    endTime: '14:00',
    venue: 'Mega Audi',
  },
  {
    id: 'd2-monoact',
    name: 'Monoact',
    category: 'drama',
    day: 2,
    startTime: '13:00',
    endTime: '15:00',
    venue: 'AB1 Audi',
  },
  {
    id: 'd2-solo-western',
    name: 'Solo Western Dance',
    category: 'dance',
    day: 2,
    startTime: '14:30',
    endTime: '16:00',
    venue: 'Mega Audi',
  },
  {
    id: 'd2-group-western',
    name: 'Group Western Dance',
    category: 'dance',
    day: 2,
    startTime: '16:00',
    endTime: '17:30',
    venue: 'Mega Audi',
  },
  {
    id: 'd2-latent-wtf',
    name: 'Latent / What The Falak',
    category: 'drama',
    day: 2,
    startTime: '18:00',
    endTime: '19:30',
    venue: 'Mega Audi',
    isAnchor: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CULTURAL SCHEDULE — DAY 3: October 17 (Saturday)
// ─────────────────────────────────────────────────────────────────────────────
const DAY3_EVENTS: FalakEvent[] = [
  {
    id: 'd3-cricket-auction',
    name: 'Cricket Auction',
    category: 'special',
    day: 3,
    startTime: '08:00',
    endTime: '14:00',
    venue: 'AB4 Audi',
    isAnchor: true,
  },
  {
    id: 'd3-solo-instrumental',
    name: 'Solo Instrumental',
    category: 'music',
    day: 3,
    startTime: '09:00',
    endTime: '11:00',
    venue: 'AB5 Audi',
  },
  {
    id: 'd3-battle-of-bands',
    name: 'Battle of Bands',
    category: 'music',
    day: 3,
    startTime: '09:00',
    endTime: '13:00',
    venue: 'Mega Audi',
    isAnchor: true,
  },
  {
    id: 'd3-solo-singing',
    name: 'Solo Singing',
    category: 'music',
    day: 3,
    startTime: '11:00',
    endTime: '13:00',
    venue: 'AB5 Audi',
  },
  {
    id: 'd3-fashion-show',
    name: 'Fashion Show',
    category: 'special',
    day: 3,
    startTime: '13:00',
    endTime: '15:00',
    venue: 'Mega Audi',
    isAnchor: true,
  },
  {
    id: 'd3-rap-battle',
    name: 'Rap Battle',
    category: 'music',
    day: 3,
    startTime: '17:00',
    endTime: '18:00',
    venue: 'Amphitheatre',
    tags: ['outdoor'],
  },
  {
    id: 'd3-street-dance',
    name: 'Street Dance / Dance Battle',
    category: 'dance',
    day: 3,
    startTime: '18:00',
    endTime: '19:30',
    venue: 'Amphitheatre',
    tags: ['outdoor'],
  },
];

// ─── All Cultural Events ────────────────────────────────────────────────────────

export const ALL_EVENTS: FalakEvent[] = [
  ...DAY1_EVENTS,
  ...DAY2_EVENTS,
  ...DAY3_EVENTS,
];

// Helper: get events for a specific day and optional category
export function getEventsForDay(
  day: 1 | 2 | 3,
  category?: string
): FalakEvent[] {
  return ALL_EVENTS.filter(
    (e) =>
      e.day === day &&
      (category === 'all' || !category || e.category === category)
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPORTS TOURNAMENT SCHEDULE — Oct 9–17 (9 days)
// ─────────────────────────────────────────────────────────────────────────────

export const SPORTS_SCHEDULE: SportsDay[] = [
  {
    date: '2026-10-09',
    dateLabel: 'Thu, Oct 9',
    dayTag: 'Day 1',
    events: [
      { sport: 'Cricket', time: '7:00 AM – 5:30 PM', venue: 'Cricket Ground', stage: 'Pool Stage Begins' },
    ],
  },
  {
    date: '2026-10-10',
    dateLabel: 'Fri, Oct 10',
    dayTag: 'Day 2',
    events: [
      { sport: 'Cricket', time: '6:30 AM – 5:00 PM', venue: 'Cricket Ground', stage: 'Pool Stage' },
    ],
  },
  {
    date: '2026-10-11',
    dateLabel: 'Sat, Oct 11',
    dayTag: 'Day 3',
    events: [
      { sport: 'Cricket', time: '7:00 AM – 5:30 PM', venue: 'Cricket Ground', stage: 'Pool Stage' },
      { sport: 'Football', time: '8:00 AM – 5:20 PM', venue: 'Football Ground', stage: 'Pool Stage Begins' },
    ],
  },
  {
    date: '2026-10-12',
    dateLabel: 'Sun, Oct 12',
    dayTag: 'Day 4',
    events: [
      { sport: 'Cricket', time: '7:00 AM – 5:30 PM', venue: 'Cricket Ground', stage: 'Pool Stage' },
      { sport: 'Football', time: '8:00 AM – 5:20 PM', venue: 'Football Ground', stage: 'Pool Stage' },
    ],
  },
  {
    date: '2026-10-13',
    dateLabel: 'Mon, Oct 13',
    dayTag: 'Day 5',
    events: [
      { sport: 'Cricket', time: '7:00 AM – 5:30 PM', venue: 'Cricket Ground', stage: 'Pool Stage' },
      { sport: 'Football', time: '8:00 AM – 5:20 PM', venue: 'Football Ground', stage: 'Pool Stage' },
      { sport: 'Basketball', time: '8:00 AM – 5:00 PM', venue: 'Basketball Court', stage: 'Pool Stage Begins' },
    ],
  },
  {
    date: '2026-10-14',
    dateLabel: 'Tue, Oct 14',
    dayTag: 'Day 6',
    events: [
      { sport: 'Cricket', time: '7:00 AM – 5:00 PM', venue: 'Cricket Ground', stage: 'Semi Finals 1' },
      { sport: 'Football', time: '8:00 AM – 5:20 PM', venue: 'Football Ground', stage: 'Pool Stage' },
      { sport: 'Basketball', time: '8:00 AM – 5:00 PM', venue: 'Basketball Court', stage: 'Pool Stage' },
      { sport: 'Volleyball', time: '8:00 AM – 5:00 PM', venue: 'Volleyball Court', stage: 'Pool Stage Begins' },
      { sport: 'Lawn Tennis', time: '9:00 AM – 5:00 PM', venue: 'Tennis Court', stage: 'Pool Stage Begins' },
      { sport: 'Table Tennis', time: '8:30 AM – 3:30 PM', venue: 'Marena', stage: 'Pool Stage Begins' },
      { sport: 'Badminton', time: '8:30 AM – 3:30 PM', venue: 'Marena Courts', stage: 'Pool Stage Begins' },
    ],
  },
  {
    date: '2026-10-15',
    dateLabel: 'Wed, Oct 15',
    dayTag: 'Day 7',
    events: [
      { sport: 'Cricket', time: '7:00 AM – 5:00 PM', venue: 'Cricket Ground', stage: 'Semi Finals 2 & Finals' },
      { sport: 'Football', time: '8:00 AM – 5:20 PM', venue: 'Football Ground', stage: 'Pool Stage' },
      { sport: 'Basketball', time: '8:00 AM – 5:00 PM', venue: 'Basketball Court', stage: 'Pool Stage' },
      { sport: 'Volleyball', time: '8:00 AM – 5:00 PM', venue: 'Volleyball Court', stage: 'Pool Stage' },
      { sport: 'Lawn Tennis', time: '9:00 AM – 5:00 PM', venue: 'Tennis Court', stage: 'Pool Stage' },
      { sport: 'Table Tennis', time: '8:30 AM – 3:30 PM', venue: 'Marena', stage: 'Pool Stage' },
      { sport: 'Badminton', time: '8:30 AM – 3:30 PM', venue: 'Marena Courts', stage: 'Pool Stage' },
      { sport: 'Chess', time: '9:00 AM – 5:00 PM', venue: 'VIP Dining Area (Food Court)', stage: 'Pool Stage Begins' },
      { sport: 'Squash', time: '8:30 AM – 3:30 PM', venue: 'Marena Courts', stage: 'Pool Stage Begins' },
      { sport: 'Athletics', time: '5:00 PM – 8:00 PM', venue: 'Outdoor Synthetic Track', stage: 'Heats Begin' },
    ],
  },
  {
    date: '2026-10-16',
    dateLabel: 'Thu, Oct 16',
    dayTag: 'Day 8',
    events: [
      { sport: 'Football', time: '8:00 AM – 5:20 PM', venue: 'Football Ground', stage: 'Pool Stage' },
      { sport: 'Volleyball', time: '8:00 AM – 5:00 PM', venue: 'Volleyball Court', stage: 'Pool Stage' },
      { sport: 'Lawn Tennis', time: '9:00 AM – 5:00 PM', venue: 'Tennis Court', stage: 'Group Stage & Semis' },
      { sport: 'Table Tennis', time: '8:30 AM – 3:30 PM', venue: 'Marena', stage: 'Group Stage & Semis' },
      { sport: 'Basketball', time: '8:00 AM – 5:00 PM', venue: 'Basketball Court', stage: 'Group Stage & Semis' },
      { sport: 'Badminton', time: '8:30 AM – 3:30 PM', venue: 'Marena Courts', stage: 'Group Stage & Semis' },
      { sport: 'Chess', time: '9:00 AM – 5:00 PM', venue: 'VIP Dining Area (Food Court)', stage: 'Group Stage & Semis' },
      { sport: 'Squash', time: '8:30 AM – 3:30 PM', venue: 'Marena Courts', stage: 'Knockouts & Semis' },
      { sport: 'Athletics', time: '4:00 PM – 8:00 PM', venue: 'Outdoor Synthetic Track', stage: 'Heats & Semis' },
    ],
  },
  {
    date: '2026-10-17',
    dateLabel: 'Fri, Oct 17',
    dayTag: 'Day 9 — Finals',
    events: [
      { sport: 'Football', time: '8:00 AM – 5:20 PM', venue: 'Football Ground', stage: 'Semis & Finals' },
      { sport: 'Volleyball', time: '8:00 AM – 5:00 PM', venue: 'Volleyball Court', stage: 'Semis & Finals' },
      { sport: 'Lawn Tennis', time: '9:00 AM – 5:00 PM', venue: 'Tennis Court', stage: 'Finals' },
      { sport: 'Table Tennis', time: '8:30 AM – 3:30 PM', venue: 'Marena', stage: 'Finals' },
      { sport: 'Basketball', time: '8:00 AM – 5:00 PM', venue: 'Basketball Court', stage: 'Finals' },
      { sport: 'Badminton', time: '8:30 AM – 3:30 PM', venue: 'Marena Courts', stage: 'Finals' },
      { sport: 'Chess', time: '9:00 AM – 5:00 PM', venue: 'VIP Dining Area (Food Court)', stage: 'Finals' },
      { sport: 'Squash', time: '8:30 AM – 3:30 PM', venue: 'Marena Courts', stage: 'Finals' },
      { sport: 'Athletics', time: '4:00 PM – 8:00 PM', venue: 'Outdoor Synthetic Track', stage: 'Finals' },
    ],
  },
];

// ─── Helpers used by existing UI components ─────────────────────────────────────

// Day labels for the DaySelector component
export const DAY_LABELS: Record<1 | 2 | 3, { day: string; date: string; label: string }> = {
  1: { day: 'Day 1', date: 'Oct 15', label: 'Thursday' },
  2: { day: 'Day 2', date: 'Oct 16', label: 'Friday' },
  3: { day: 'Day 3', date: 'Oct 17', label: 'Saturday' },
};

// Category filter chips for CategoryFilter component
export const FILTER_CATEGORIES: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'dance', label: 'Dance' },
  { key: 'music', label: 'Music' },
  { key: 'drama', label: 'Drama' },
  { key: 'creative', label: 'Creative' },
  { key: 'literary', label: 'Literary' },
  { key: 'business', label: 'B&M' },
  { key: 'esports', label: 'Esports' },
  { key: 'special', label: 'Special' },
];

// Events grouped by day for TimetableGrid
export const EVENTS_BY_DAY: Record<1 | 2 | 3, FalakEvent[]> = {
  1: DAY1_EVENTS,
  2: DAY2_EVENTS,
  3: DAY3_EVENTS,
};

// Convert 'HH:MM' to minutes since midnight
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}
