import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoImage } from './LogoImage';
import { MysteryArtist } from './MysteryArtist';

const navItems = [
  {
    num: '01',
    label: 'Passes',
    route: '/passes',
    id: 'passes',
  },
  {
    num: '02',
    label: 'Support',
    route: '/support#faq',
    id: 'support',
    image: '/assets/footer/supporticons.png',
  },
  {
    num: '03',
    label: 'Contact',
    route: '/support#contact',
    id: 'contact',
    image: '/assets/footer/contactIcons.png',
  },
  {
    num: '04',
    label: 'About',
    route: '/about',
    id: 'about',
    image: '/assets/footer/AboutIcons.png',
  },
];

const getRouteColors = (pathname: string) => {
  if (pathname.startsWith('/sports')) {
    return {
      primary: '#FF6A00',
      detail: '#C6FF00',
      isConvergence: false,
    };
  }

  if (pathname.startsWith('/cultural')) {
    return {
      primary: '#8A5CFF',
      detail: '#E6DFF6',
      isConvergence: false,
    };
  }

  return {
    primary: '#FF3D7F',
    detail: '#FF3D7F',
    isConvergence: true,
  };
};

export function Footer() {
  const location = useLocation();
  const { primary, isConvergence } = getRouteColors(location.pathname);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <footer
      className="
        relative
        mt-20
        overflow-visible
        border-t border-silver/10
        bg-midnight-indigo
        px-6
        pt-16
        pb-24
        md:px-12
        md:pb-16
      "
    >
      {/* =========================================================
          BACKGROUND GRID / DOT TEXTURE
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* =========================================================
          MAIN FOOTER CONTENT
      ========================================================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-16
          overflow-visible
          md:grid-cols-2
          md:gap-12
        "
      >
        {/* =======================================================
            LEFT — LOGO + MYSTERY ARTIST
        ======================================================= */}
        <div className="flex flex-col">
          <div className="mb-12 opacity-80">
            <LogoImage className="h-16 md:h-20" />
          </div>

          <MysteryArtist />
        </div>

        {/* =======================================================
            RIGHT — NAVIGATION
        ======================================================= */}
        <div
          className="
            relative
            ml-auto
            flex
            w-full
            max-w-md
            flex-col
            justify-end
            overflow-visible
          "
        >
          <ul
            className="relative flex w-full flex-col overflow-visible"
            role="navigation"
          >
            {navItems.map((item, i) => {
              const isHovered = hoveredIndex === i;
              const isAnyHovered = hoveredIndex !== null;

              const dimClass =
                isAnyHovered && !isHovered
                  ? 'opacity-50'
                  : 'opacity-100';

              const zClass = isHovered ? 'z-50' : 'z-10';

              return (
                <li
                  key={item.num}
                  className={`
                    group
                    relative
                    block
                    overflow-visible
                    border-b
                    border-silver/20
                    transition-opacity
                    duration-300
                    ${dimClass}
                    ${zClass}
                  `}
                >
                  <Link
                    to={item.route}
                    className="
                      relative
                      flex
                      w-full
                      items-center
                      overflow-visible
                      py-6
                      outline-none
                    "
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(i)}
                    onBlur={() => setHoveredIndex(null)}
                  >
                    {/* =================================================
                        PILL BACKGROUND

                        This is deliberately below the artwork.
                    ================================================= */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="
                            absolute
                            inset-0
                            z-10
                            rounded-full
                            bg-champagne-pearl
                          "
                          initial={{
                            x: -28,
                            opacity: 0,
                            scaleX: 0.96,
                          }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            scaleX: 1,
                          }}
                          exit={{
                            x: -20,
                            opacity: 0,
                            scaleX: 0.98,
                          }}
                          transition={{
                            duration: 0.32,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* =================================================
                        NUMBER
                    ================================================= */}
                    <span
                      className="
                        relative
                        z-30
                        w-12
                        shrink-0
                        pl-0
                        font-mono
                        text-sm
                        text-silver/40
                      "
                    >
                      {item.num}
                    </span>

                    {/* =================================================
                        LABEL AREA

                        overflow-visible is CRITICAL here because
                        artwork is intentionally escaping this box.
                    ================================================= */}
                    <div
                      className="
                        relative
                        flex
                        h-12
                        flex-1
                        items-center
                        overflow-visible
                        px-4
                      "
                    >
                      {/* =================================================
                          LABEL
                      ================================================= */}
                      <span
                        className="
                          relative
                          z-30
                          font-sans
                          text-3xl
                          font-medium
                          tracking-wide
                          transition-colors
                          duration-300
                          md:text-4xl
                        "
                        style={{
                          color: isHovered ? primary : '#C0C0C0',
                          fontFamily: 'Archivo, sans-serif',
                        }}
                      >
                        {item.label}
                      </span>

                      {/* =================================================
                          ARTWORK POP-OUT

                          IMPORTANT:
                          - z-20, NOT z-index:-1
                          - oversized
                          - deliberately positioned outside row
                          - text remains above it at z-30
                      ================================================= */}
                      <div
                        className={`
                          pointer-events-none
                          absolute
                          right-[-42px]
                          top-1/2
                          z-20
                          transition-all
                          duration-500
                          ease-[cubic-bezier(0.22,1,0.36,1)]
                          ${isHovered
                            ? 'translate-x-[-12px] opacity-100'
                            : 'translate-x-[55px] opacity-0'
                          }
                        `}
                        style={{
                          width:
                            item.id === 'passes'
                              ? '300px'
                              : '270px',

                          height:
                            item.id === 'passes'
                              ? '300px'
                              : '270px',

                          transform: isHovered
                            ? 'translateY(-62%) translateX(-12px)'
                            : 'translateY(-50%) translateX(55px)',
                        }}
                      >
                        {/* =================================================
                            PASSES — THREE TICKETS
                        ================================================= */}
                        {item.id === 'passes' ? (
                          <div className="relative flex h-full w-full items-center justify-center">
                            {/* ---------------------------------------------
                                SPORTS TICKET
                            --------------------------------------------- */}
                            <motion.img
                              src="/assets/sportsAssets/SportsTicketsBase.png"
                              alt="Sports Ticket"
                              className="
                                absolute
                                w-36
                                drop-shadow-2xl
                                md:w-40
                              "
                              initial={{
                                x: 0,
                                y: 0,
                                rotate: -8,
                                scale: 0.92,
                              }}
                              animate={
                                isHovered
                                  ? {
                                    x: -58,
                                    y: 28,
                                    rotate: -16,
                                    scale: 1,
                                  }
                                  : {
                                    x: 0,
                                    y: 0,
                                    rotate: -8,
                                    scale: 0.92,
                                  }
                              }
                              transition={{
                                duration: 0.5,
                                delay: isHovered ? 0 : 0.05,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{
                                zIndex: 1,
                              }}
                            />

                            {/* ---------------------------------------------
                                CULTURAL TICKET
                            --------------------------------------------- */}
                            <motion.img
                              src="/assets/culturalAssets/CulturalTicketsBase.png"
                              alt="Cultural Ticket"
                              className="
                                absolute
                                w-36
                                drop-shadow-2xl
                                md:w-40
                              "
                              initial={{
                                x: 0,
                                y: 0,
                                rotate: 6,
                                scale: 0.92,
                              }}
                              animate={
                                isHovered
                                  ? {
                                    x: 58,
                                    y: -28,
                                    rotate: 12,
                                    scale: 1,
                                  }
                                  : {
                                    x: 0,
                                    y: 0,
                                    rotate: 6,
                                    scale: 0.92,
                                  }
                              }
                              transition={{
                                duration: 0.5,
                                delay: isHovered ? 0.06 : 0,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{
                                zIndex: 2,
                              }}
                            />

                            {/* ---------------------------------------------
                                CONVERGENCE TICKET
                            --------------------------------------------- */}
                            <motion.img
                              src="/assets/Landing/ticketsBase.png"
                              alt="Convergence Ticket"
                              className="
                                absolute
                                w-36
                                drop-shadow-2xl
                                md:w-40
                              "
                              initial={{
                                x: 0,
                                y: 0,
                                rotate: 0,
                                scale: 0.92,
                              }}
                              animate={
                                isHovered
                                  ? {
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    scale: 1.1,
                                  }
                                  : {
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    scale: 0.92,
                                  }
                              }
                              transition={{
                                duration: 0.5,
                                delay: isHovered ? 0.12 : 0,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{
                                zIndex: 3,
                              }}
                            />
                          </div>
                        ) : (
                          /* =================================================
                             SUPPORT / CONTACT / ABOUT ARTWORK
                          ================================================= */
                          <motion.div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                              p-2
                            "
                            initial={{
                              y: 35,
                              rotate: -4,
                              scale: 0.8,
                            }}
                            animate={
                              isHovered
                                ? {
                                  y: 0,
                                  rotate: 0,
                                  scale: 1,
                                }
                                : {
                                  y: 35,
                                  rotate: -4,
                                  scale: 0.8,
                                }
                            }
                            transition={{
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <DuotoneImage
                              src={item.image!}
                              color={primary}
                              alt={item.label}
                              isConvergence={isConvergence}
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* =========================================================
          FOOTER BOTTOM
      ========================================================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          mt-20
          flex
          max-w-7xl
          flex-col
          items-center
          justify-between
          gap-4
          border-t
          border-silver/5
          pt-8
          md:flex-row
        "
      >
        <p className="font-mono text-xs text-silver/40">
          © 2026 FALAK FESTIVAL. ALL RIGHTS RESERVED.
        </p>

        <div className="font-accent text-sm text-silver/40">
          Made for the Convergence
        </div>
      </div>
    </footer>
  );
}

/* =============================================================
   DUOTONE ARTWORK

   Renders genuinely transparent floating cutout artwork.
   - On Convergence (/ and shared pages): renders the native
     artwork in full fidelity without any filter or backdrop.
   - On Track pages (/sports, /cultural): applies the locked
     track palette token only to the non-transparent artwork pixels
     via an alpha-masked overlay, ensuring transparent PNG
     areas remain completely transparent with no rectangular canvas.
============================================================= */

function DuotoneImage({
  src,
  color,
  alt,
  isConvergence,
}: {
  src: string;
  color: string;
  alt: string;
  isConvergence: boolean;
}) {
  if (isConvergence) {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="
            h-full
            w-full
            object-contain
            drop-shadow-2xl
          "
        />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="
          h-full
          w-full
          object-contain
          drop-shadow-2xl
        "
        style={{
          filter: 'grayscale(1) contrast(1.1)',
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          backgroundColor: color,
          mixBlendMode: 'color',
          WebkitMaskImage: `url("${src}")`,
          maskImage: `url("${src}")`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}