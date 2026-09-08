// Layer colors used for the wipe transition when navigating TO each route.
// Ordered back-to-front; the last color is the top/leading layer.
export const ROUTE_TRANSITION_PALETTES: Record<string, string[]> = {
  '/sports': ['#0B0F2B', '#0057FF', '#FF6A00', '#C6FF00'],
  '/cultural': ['#0B0F2B', '#1C0B46', '#8A5CFF', '#EDE4D3'],
  '/': ['#0B0F2B', '#8A5CFF', '#FF3D7F', '#0057FF'], // convergence fallback when returning home
};

export const TRACK_ROUTES = ['/', '/sports', '/cultural'] as const;
export type TrackRoute = (typeof TRACK_ROUTES)[number];
