export interface SportsEvent {
  id: string;
  title: string;
  iconName: string;
  teaser: string;
  description: string;
  date: string;
  venue: string;
  format: string;
  rulesLink: string;
}

export const sportsData: SportsEvent[] = [
  {
    id: 'football',
    title: 'FOOTBALL',
    iconName: 'Trophy',
    teaser: 'Dominate the turf in the ultimate 7v7 clash of collegiate champions.',
    description: 'Step onto the pitch where legends are forged under the stadium floodlights. Teams will battle through high-intensity knockout rounds testing raw endurance, tactical mastery, and clinical finishing. Gather your squad and fight for campus supremacy.',
    date: 'Oct 15, 2026 | 10:00 AM',
    venue: 'Main Stadium Turf',
    format: '7-a-side Knockout',
    rulesLink: '#',
  },
  {
    id: 'basketball',
    title: 'BASKETBALL',
    iconName: 'Dribbble',
    teaser: 'Fast breaks, clutch three-pointers, and relentless court intensity.',
    description: 'High-octane full-court action where every single possession swings momentum. Showcase your handles, lockdown perimeter defense, and ice-cold shooting in a grueling tournament bracket designed for true hoopers.',
    date: 'Oct 15, 2026 | 02:00 PM',
    venue: 'Indoor Sports Complex - Court A',
    format: '5v5 Full Court Tournament',
    rulesLink: '#',
  },
  {
    id: 'box-cricket',
    title: 'BOX CRICKET',
    iconName: 'Flame',
    teaser: 'Fast-paced, high-voltage box cricket under the arena lights.',
    description: 'The nation’s greatest obsession reimagined into explosive short-format showdowns. Tight line-and-length bowling, lightning agility in the field, and monster hits off the nets will decide who hoists the golden cup.',
    date: 'Oct 16, 2026 | 09:00 AM',
    venue: 'Student Activity Arena',
    format: '6-a-side Super 8s',
    rulesLink: '#',
  },
  {
    id: 'badminton',
    title: 'BADMINTON',
    iconName: 'Zap',
    teaser: 'Lightning reflexes and explosive smashes slicing across the net.',
    description: 'Test your agility, explosive footwork, and deceptive racket skills in singles and doubles categories. Survive grueling rallies and execute pinpoint drop shots on championship-grade synthetic courts.',
    date: 'Oct 16, 2026 | 11:30 AM',
    venue: 'Badminton Arena - Hall 2',
    format: 'Singles & Doubles Knockout',
    rulesLink: '#',
  },
  {
    id: 'volleyball',
    title: 'VOLLEYBALL',
    iconName: 'Goal',
    teaser: 'Sky-scraping spikes, iron wall blocks, and fearless team defense.',
    description: 'Set, spike, and dominate above the net in this pulse-pounding 6-a-side showdown. Flawless communication, thunderous spikes, and acrobatic digs will determine which college stands tall at the podium.',
    date: 'Oct 17, 2026 | 01:00 PM',
    venue: 'Outdoor Sports Grounds',
    format: '6v6 Best of 3 Sets',
    rulesLink: '#',
  },
  {
    id: 'table-tennis',
    title: 'TABLE TENNIS',
    iconName: 'Crosshair',
    teaser: 'High-speed topspin rallies, lightning counters, and intense table duels.',
    description: 'A masterclass in razor-sharp reflexes, wicked spin variations, and mental grit. Compete on international standard tables in blistering knockout brackets where split-second reaction times make all the difference.',
    date: 'Oct 17, 2026 | 04:00 PM',
    venue: 'Recreation Center Table Arena',
    format: 'Individual & Team Knockout',
    rulesLink: '#',
  },
];
