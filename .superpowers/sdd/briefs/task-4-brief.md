# Task 4: Sports Footer

## Context
This task builds the Sports-specific footer for the `/sports` landing page. The standard footer uses Convergence Magenta, which is forbidden here. This custom footer will use the Sports palette, a halftone texture, and specific nav items.

## What to do

### 1. Create `src/components/sports/SportsFooter.tsx`
Create a footer component that matches the vibe of the sports page:
- Container uses `bg-midnight-indigo`.
- Texture: Add a halftone dot texture overlay. E.g., `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)` with `backgroundSize: '16px 16px'`.
- Content Layout:
  - **Left side:** Logo + Socials
    - For the logo, render `<img src="/assets/logo-transparent/falak_transparent-7.png" alt="Falak Sports" className="h-16 object-contain" />` (This is the Electric Orange variant). Do NOT use the shared `<LogoImage>` component since it hardcodes the Magenta hover state.
    - Below logo, Social Icons (e.g. Instagram, Twitter/X from `lucide-react`) in `text-silver hover:text-electric-orange`.
  - **Right side:** Navigation links
    - "Home" -> `/`
    - "Events" -> `/schedule`
    - "Schedule" -> `/schedule`
    - "Passes" -> `/schedule`
    - "Support" -> `#`
    - "Profile" -> `/profile`
    - Style links with `font-label-sports text-silver hover:text-electric-orange uppercase tracking-wider`.
- **Bottom bar:**
  - Copyright text in `font-mono text-silver/40 text-xs`.
  - A subtle star-burst accent SVG or text tag ("// GAME ON").

### 2. Update `src/pages/Sports.tsx`
Import and render `<SportsFooter />` at the bottom of the page structure.

## Global Constraints & Palette
- Palette: Electric Orange `#FF6A00`, Acid Lime `#C6FF00`, Cobalt Blue `#0057FF`, Midnight Indigo `#0B0F2B`, Silver `#C0C0C0`. No Culture-only or Convergence Magenta colors.
- Fonts: `font-label-sports` (Archivo Condensed) for nav links. `font-mono` for utility.

## Verification
Run `npx vite build` to ensure it compiles without errors.

## Commit
```
git add src/components/sports src/pages/Sports.tsx
git commit -m "feat(sports): add custom Sports footer"
```

## Files touched
- **Create:** `src/components/sports/SportsFooter.tsx`
- **Modify:** `src/pages/Sports.tsx`
