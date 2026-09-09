export interface Registration {
  id: string;
  eventName: string;
  track: 'sports' | 'cultural';
  date: string;
  venue: string;
  teamMembers?: string[]; // present only for team events
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface Pass {
  id: string;
  passName: string;
  qrPlaceholder: true;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface Profile {
  name: string;
  email: string;
  stampVariation: string | null;
  registrations: Registration[];
  passes: Pass[];
}

export const mockProfileData: Profile = {
  name: "Aman Doe",
  email: "aman.doe@example.com",
  stampVariation: null,
  registrations: [
    {
      id: "reg-1",
      eventName: "Cyber Sentinel",
      track: "cultural",
      date: "Oct 12, 2026",
      venue: "Main Auditorium",
      teamMembers: ["Aman Doe", "Priya K", "Ravi S"],
      paymentStatus: "paid"
    },
    {
      id: "reg-2",
      eventName: "Neon Cricket 5v5",
      track: "sports",
      date: "Oct 13, 2026",
      venue: "Sports Complex",
      teamMembers: ["Aman Doe", "Sam J", "Kunal M", "Tina R", "Leo D"],
      paymentStatus: "pending"
    },
    {
      id: "reg-3",
      eventName: "Rhythm Wars",
      track: "cultural",
      date: "Oct 14, 2026",
      venue: "Open Air Theatre",
      paymentStatus: "failed"
    },
    {
      id: "reg-4",
      eventName: "Street Art Showcase",
      track: "cultural",
      date: "Oct 15, 2026",
      venue: "Art Gallery",
      paymentStatus: "paid"
    }
  ],
  passes: [
    {
      id: "pass-1",
      passName: "All-Access Cultural Pass",
      qrPlaceholder: true,
      paymentStatus: "paid"
    },
    {
      id: "pass-2",
      passName: "VIP Sports Lounge",
      qrPlaceholder: true,
      paymentStatus: "pending"
    }
  ]
};
