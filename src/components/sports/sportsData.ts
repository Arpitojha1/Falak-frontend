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
  img: string;
  height: number;
}

export const sportsData: SportsEvent[] = [
  {
    id: 'football',
    title: 'FOOTBALL',
    iconName: 'Trophy',
    teaser: '11v11. Full contact. No excuses.',
    description: 'The premier tournament of Falak. 90 minutes of sheer endurance, tactical aggression, and clinical finishing. Bring your best XI.',
    date: 'Oct 15, 2026 | 10:00 AM',
    venue: 'Main Stadium Turf',
    format: '11v11 Knockout',
    rulesLink: '#',
    img: '/assets/reference/sports/ref-1.jpg',
    height: 400,
  },
  {
    id: 'basketball',
    title: 'BASKETBALL',
    iconName: 'Dribbble',
    teaser: 'Hardwood. High stakes. Fast breaks.',
    description: 'Full-court, high-octane 5v5. We want lockdown defense and ice-cold shooting. If you can\'t run the floor, don\'t step on the court.',
    date: 'Oct 15, 2026 | 02:00 PM',
    venue: 'Indoor Sports Complex',
    format: '5v5 Full Court',
    rulesLink: '#',
    img: '/assets/reference/sports/ref-2.jpg',
    height: 550,
  },
  {
    id: 'box-cricket',
    title: 'BOX CRICKET',
    iconName: 'Flame',
    teaser: 'Tight spaces. Max power.',
    description: 'The street classic brought to the arena. 6-a-side, explosive hitting, zero margin for error. Pure adrenaline in a cage.',
    date: 'Oct 16, 2026 | 09:00 AM',
    venue: 'Student Activity Arena',
    format: '6v6 Super 8s',
    rulesLink: '#',
    img: '/assets/reference/sports/ref-3.jpg',
    height: 450,
  },
  {
    id: 'badminton',
    title: 'BADMINTON',
    iconName: 'Zap',
    teaser: 'Lightning reflexes. Lethal smashes.',
    description: 'Test your reaction time on championship-grade synthetic courts. Singles and doubles brackets. No mercy on the drop shots.',
    date: 'Oct 16, 2026 | 11:30 AM',
    venue: 'Hall 2',
    format: 'Singles & Doubles',
    rulesLink: '#',
    img: '/assets/reference/sports/ref-6.jpg',
    height: 600,
  },
  {
    id: 'volleyball',
    title: 'VOLLEYBALL',
    iconName: 'Goal',
    teaser: 'Iron walls. Thunderous spikes.',
    description: 'Dominate above the net. 6v6 action requiring flawless communication and aggressive front-court play.',
    date: 'Oct 17, 2026 | 01:00 PM',
    venue: 'Outdoor Courts',
    format: '6v6 Best of 3',
    rulesLink: '#',
    img: '/assets/reference/sports/ref-7.jpg',
    height: 400,
  },
  {
    id: 'table-tennis',
    title: 'TABLE TENNIS',
    iconName: 'Crosshair',
    teaser: 'Spin. Speed. Survival.',
    description: 'Blistering rallies and split-second decisions. International standard tables. Individual and team knockouts for the sharpest reflexes on campus.',
    date: 'Oct 17, 2026 | 04:00 PM',
    venue: 'Recreation Center',
    format: 'Individual & Team',
    rulesLink: '#',
    img: '/assets/reference/sports/ref-8.jpg',
    height: 500,
  },
];
