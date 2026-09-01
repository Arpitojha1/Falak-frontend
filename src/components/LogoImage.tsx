/**
 * LogoImage
 * Renders the Falak 26 wordmark as a transparent PNG.
 * On hover: cross-fades from Silver (#C0C0C0) to Convergence Magenta (#FF3D7F)
 * using two stacked <img> elements and a pure-CSS opacity transition.
 *
 * Both variants are palette-approved for the Home/Convergence page.
 * Sports-exclusive and Culture-exclusive colorways are reserved for their
 * respective pages and intentionally excluded here.
 */

interface LogoImageProps {
  /** Tailwind height + any extra sizing classes, e.g. "h-28 md:h-52 lg:h-72" */
  className?: string;
  alt?: string;
}

export function LogoImage({ className = '', alt = 'Falak 26' }: LogoImageProps) {
  return (
    /*
     * pointer-events-auto: overrides any pointer-events-none on ancestor containers
     * (e.g. Hero's flex wrapper) so hover events always fire on the logo.
     * inline-flex: lets the wrapper shrink-wrap to the image size naturally.
     */
    <div className="relative inline-flex pointer-events-auto group/logo">
      {/* ── Layer 1: Silver (default, always visible, fades out on hover) ── */}
      <img
        src="/assets/logo-transparent/falak_transparent-2.png"
        alt={alt}
        className={`object-contain w-auto transition-opacity duration-500 ease-in-out group-hover/logo:opacity-0 ${className}`}
      />

      {/* ── Layer 2: Convergence Magenta (hidden by default, fades in on hover) ── */}
      <img
        src="/assets/logo-transparent/falak_transparent-9.png"
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover/logo:opacity-100`}
      />
    </div>
  );
}
