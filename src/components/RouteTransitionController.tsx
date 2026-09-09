import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RouteTransitionOverlay, { RouteTransitionOverlayHandle } from './RouteTransitionOverlay';
import { useTrackSwipeNavigation } from '../hooks/useTrackSwipeNavigation';
import { useDesktopTrackNavigation } from '../hooks/useDesktopTrackNavigation';
import { TRACK_ROUTES, TrackRoute } from '../lib/routeTransitionPalettes';

// Left-to-right order matches the Convergence artwork: Sports | Landing | Cultural
const ORDER: TrackRoute[] = ['/sports', '/', '/cultural'];

export default function RouteTransitionController({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<RouteTransitionOverlayHandle>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isTrackRoute = (path: string): path is TrackRoute =>
    (TRACK_ROUTES as readonly string[]).includes(path);

  const goDirection = useCallback(
    (direction: 'left' | 'right') => {
      const current = location.pathname;
      if (!isTrackRoute(current)) return; // only wipe-transition between the three track routes
      if (overlayRef.current?.isBusy()) return;

      const currentIndex = ORDER.indexOf(current as TrackRoute);
      // swiping left moves toward index-1 (toward Sports), swiping right moves toward index+1 (toward Cultural)
      const nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
      const target = ORDER[nextIndex];
      if (!target) return; // already at the edge (Sports can't go further left, Cultural can't go further right)

      document.body.style.overflow = 'hidden';
      overlayRef.current?.play(target, direction, () => {
        navigate(target, { state: { isWipe: true } });
      }).then(() => {
        document.body.style.overflow = '';
      });
    },
    [location.pathname, navigate]
  );

  useTrackSwipeNavigation({
    onSwipeLeft: () => goDirection('left'),
    onSwipeRight: () => goDirection('right'),
    disabled: !isTrackRoute(location.pathname)
  });

  useDesktopTrackNavigation({
    onSwipeLeft: () => goDirection('left'),
    onSwipeRight: () => goDirection('right'),
    disabled: !isTrackRoute(location.pathname)
  });

  // Expose a manual trigger for desktop nav-link clicks (no swipe available on desktop)
  useEffect(() => {
    (window as any).__triggerTrackTransition = (target: TrackRoute) => {
      const current = location.pathname as TrackRoute;
      if (!isTrackRoute(current)) {
        navigate(target); // fallback: plain navigation from a non-track route
        return;
      }
      const currentIndex = ORDER.indexOf(current);
      const targetIndex = ORDER.indexOf(target);
      if (currentIndex === targetIndex) return;
      const direction = targetIndex > currentIndex ? 'right' : 'left';
      goDirection(direction);
    };
    return () => {
      delete (window as any).__triggerTrackTransition;
    };
  }, [goDirection, location.pathname, navigate]);

  return (
    <>
      {children}
      <RouteTransitionOverlay ref={overlayRef} />
    </>
  );
}
