# Task 5: Sports Hero (Structural Scaffold)

## Context
This task builds the Hero section for the `/sports` landing page.
**IMPORTANT AMENDMENT:** We are building the structural/functional pieces ONLY. The final visual treatment (halftone textures, torn-paper grain, diagonal type placement, poster-collage composition) is deferred until reference images land in `assets/reference/`.

## What to do

### 1. Create `src/components/sports/SportsHero.tsx`
Create the hero section component:
- **Container:** Minimum height `min-h-[90vh]`, `flex items-center`, `bg-midnight-indigo`.
- **Layout:** Use a grid or flex container split roughly 50/50 for desktop (Left: Mascot, Right: Content).
- **Left Side (Mascot Placeholder):**
  - Create a clearly-marked placeholder slot positioned on the left. 
  - It should be a fixed container/aspect-ratio box (e.g. `aspect-[4/5] w-full max-w-md bg-silver/10 border-2 border-dashed border-electric-orange/50 flex items-center justify-center`).
  - Add a visible dev-only label inside: `<span className="text-electric-orange font-mono text-sm">TODO: Mascot Asset</span>`.
  - Include the exact comment: `{/* TODO: Sports mascot asset goes here */}`
- **Right Side (Typography & CTA):**
  - Use `font-display` (Anton) for the main headline. It must be Anton, not Archivo Black for the Hero. E.g., `text-6xl md:text-8xl text-silver uppercase`.
  - Stack the words (e.g., "GAME ON" or "FALAK SPORTS").
  - Add the Falak 26 Electric Orange logo (`falak_transparent-7.png`).
  - Add a primary CTA button: "EXPLORE EVENTS ↓". Make it a blocky button with `bg-electric-orange text-midnight-indigo font-headline-sports-section uppercase`.

### 2. Update `src/pages/Sports.tsx`
- Replace the placeholder `<div className="pt-32...">...</div>` header with `<SportsHero />`.
- Ensure the rendering order in `Sports.tsx` is `<SportsHero />`, `<SportsEvents />`, `<SportsFooter />`.

## Global Constraints & Palette
- Palette: Electric Orange `#FF6A00`, Acid Lime `#C6FF00`, Cobalt Blue `#0057FF`, Midnight Indigo `#0B0F2B`, Silver `#C0C0C0`.
- Typography EXACT assignments:
  - Hero headlines: **Anton** (`font-display`)
  - Section headlines: **Archivo Black** (`font-headline-sports-section`)
  - Stats/labels/tags: **Archivo Condensed SemiBold** (`font-label-sports`)
- Zero regressions to existing routes.

## Verification
Run `npx vite build` to ensure it compiles without errors.

## Commit
```
git add src/components/sports src/pages/Sports.tsx
git commit -m "feat(sports): scaffold structural layout for Sports Hero"
```

## Files touched
- **Create:** `src/components/sports/SportsHero.tsx`
- **Modify:** `src/pages/Sports.tsx`
