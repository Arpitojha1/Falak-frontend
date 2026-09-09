// Layer colors used for the wipe transition when navigating TO each route.
// Ordered back-to-front; the LAST color is the top/leading layer that the eye
// sees first as the wipe sweeps in. Each route uses its complete track palette
// so every brand color gets a moment of full-screen presence.
export const ROUTE_TRANSITION_PALETTES: Record<string, string[]> = {
  // Sports full palette — back-to-front: Midnight Indigo → Cobalt Blue → Electric Orange → Acid Lime → Silver
  '/sports': ['#0B0F2B', '#0057FF', '#FF6A00', '#C6FF00', '#C0C0C0'],
  // Cultural full palette — back-to-front: Midnight Indigo → Deep Plum → Aurora Violet → Soft Lilac → Champagne Pearl
  '/cultural': ['#0B0F2B', '#1C0B46', '#8A5CFF', '#E6DFF6', '#EDE4D3'],
  // Convergence / landing palette — Midnight Indigo → Silver → Cobalt Blue → Magenta (leads)
  '/': ['#0B0F2B', '#C0C0C0', '#0057FF', '#FF3D7F'],
};

export const TRACK_ROUTES = ['/', '/sports', '/cultural'] as const;
export type TrackRoute = (typeof TRACK_ROUTES)[number];
