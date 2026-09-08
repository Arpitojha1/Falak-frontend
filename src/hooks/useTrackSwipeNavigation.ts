import { useEffect, useRef } from 'react';

interface SwipeOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Minimum horizontal distance in px to count as a swipe */
  threshold?: number;
  /** Horizontal movement must exceed vertical by this ratio to count as horizontal */
  dominanceRatio?: number;
  disabled?: boolean;
}

export function useTrackSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  threshold = 60,
  dominanceRatio = 1.5,
  disabled = false
}: SwipeOptions) {
  const startX = useRef(0);
  const startY = useRef(0);
  const tracking = useRef(false);

  useEffect(() => {
    if (disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      tracking.current = true;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!tracking.current) return;
      tracking.current = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;

      if (Math.abs(dx) < threshold) return;
      if (Math.abs(dx) < Math.abs(dy) * dominanceRatio) return; // not dominantly horizontal

      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold, dominanceRatio, disabled]);
}
