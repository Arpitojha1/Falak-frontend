import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

import './Masonry.css';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: Item) => void;
  expandedId?: string | null;
  renderDetails?: (item: Item) => React.ReactNode;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick,
  expandedId = null,
  renderDetails
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const [internalExpandedId, setInternalExpandedId] = useState(expandedId);
  const flipState = useRef<Flip.State | null>(null);

  if (expandedId !== internalExpandedId) {
    // Capture state before React renders the new class or we change inline styles
    flipState.current = Flip.getState('.item-wrapper');
    // Hide details immediately on close
    if (!expandedId) {
      gsap.set('.details-overlay', { opacity: 0 });
    }
    setInternalExpandedId(expandedId);
  }

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const element = document.querySelector(selector) as HTMLElement;
      if (!element) return;

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        });
      } else {
        // For updates, we just set the target state
        if (item.id === internalExpandedId) {
          gsap.set(element, { clearProps: 'x,y,width,height,transform' });
        } else {
          // If we are actively flipping, just set the final state, Flip handles the animation
          if (flipState.current) {
             gsap.set(element, { x: item.x, y: item.y, width: item.w, height: item.h });
          } else {
             // Normal resize
             gsap.to(element, {
               x: item.x, y: item.y, width: item.w, height: item.h,
               duration: duration,
               ease: ease,
               overwrite: 'auto'
             });
          }
        }
      }
    });

    if (hasMounted.current && flipState.current) {
      Flip.from(flipState.current, {
        duration: duration,
        ease: ease,
        absolute: true,
        zIndex: 100,
        onComplete: () => {
          if (internalExpandedId) {
            gsap.to('.details-overlay', { opacity: 1, duration: 0.3 });
          }
        }
      });
      flipState.current = null;
    }

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, internalExpandedId]);

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover && internalExpandedId !== item.id) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover && internalExpandedId !== item.id) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.6,
          duration: 0.3
        });
      }
      const grunge = element.querySelector('.color-overlay-grunge') as HTMLElement;
      if (grunge) {
        gsap.to(grunge, {
          opacity: 0.4,
          duration: 0.3
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover && internalExpandedId !== item.id) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
      const grunge = element.querySelector('.color-overlay-grunge') as HTMLElement;
      if (grunge) {
        gsap.to(grunge, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  };

  return (
    <div ref={containerRef} className={`list ${internalExpandedId ? 'has-expanded' : ''}`}>
      {grid.map(item => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className={`item-wrapper ${internalExpandedId === item.id ? 'is-expanded' : ''}`}
            onClick={() => onItemClick ? onItemClick(item) : window.open(item.url, '_blank', 'noopener')}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
          >
            <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: ['#FF6A00', '#C6FF00', '#0057FF'][Number(item.id.charCodeAt(0)) % 3],
                    mixBlendMode: 'multiply',
                    opacity: 0,
                    pointerEvents: 'none',
                    borderRadius: '10px'
                  }}
                />
              )}
              {colorShiftOnHover && (
                <div
                  className="color-overlay-grunge"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-midnight-indigo) 1.5px, transparent 0)',
                    backgroundSize: '12px 12px',
                    opacity: 0,
                    pointerEvents: 'none',
                    borderRadius: '10px'
                  }}
                />
              )}
              
              {internalExpandedId === item.id && renderDetails && (
                <div className="details-overlay">
                  {renderDetails(item)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
