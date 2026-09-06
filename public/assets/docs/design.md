# Falak '26 — Full-Site Design Reference

> This document reflects the **actual, audited state of the codebase** as of Session 7. It supersedes previous planning documents and serves as the single source of truth for the implemented design system across all tracks.

## 1. Cross-Track Rules (Site-Wide)

- **Convergence Magenta is Reserved:** `#FF3D7F` is strictly reserved for merged/shared assets (like the main landing page or shared Navigation). It must never appear inside the isolated Sports or Culture tracks.
- **Track Colors Never Cross:** Sports colors (Electric Orange, Acid Lime) never appear in Culture. Culture colors (Aurora Violet, Soft Lilac, Deep Plum, etc.) never appear in Sports. Neither track's colors appear on the shared landing page / Navigation.
- **Commit Granularity:** One file per commit, project-wide, no exceptions.
- **Mobile Breakpoints Deferred:** The site is currently built and supported only for desktop (`1440px` and up). Responsive mobile passes are deferred site-wide.
- **Reference as Form Only:** Reference imagery is used strictly for layout, color, and structural guidance, not for literal content replication.

---

## 2. Sports Track (Complete & Locked)

> **Status: Complete/Locked.** This section documents a finished, frozen system. It is isolated in `src/components/sports/` and rendered outside the shared `MainLayout`.

### Palette
- **Midnight Indigo** (`#0B0F2B`): Base background, heavy borders, text in light surfaces, hard drop shadows.
- **Electric Orange** (`#FF6A00`): Primary pop — diagonal hero stripe, CTA buttons, highlighted text, top footer border, solid offset shadows.
- **Acid Lime** (`#C6FF00`): High-energy accent — hero "ON" text, offset shadow plates, badge backgrounds.
- **Silver** (`#C0C0C0`): Body text, mascot slot backing, overlay backgrounds.
- **Cobalt Blue** (`#0057FF`): Used dynamically in hover color-cycling arrays.

### Typography
- **Headlines:** `Anton` (400 weight condensed) — Massive hero display ("GAME ON").
- **Section/Component Titles:** `Archivo Black` (900 weight) — Marquees, event titles, CTAs, footer links.
- **Data/Labels:** `Archivo Condensed` (600 weight) — Badges, metadata headers, copyright.
- **Body:** `Barlow` (400/500 weight) — Intro paragraphs and event descriptions.

### Motif Vocabulary
- **Neobrutalism:** Hard 4px/8px solid borders (`border-midnight-indigo`), heavy solid offset drop shadows without blur (`shadow-[8px_8px_0_0_#FF6A00]`).
- **Textures:** Halftone dot overlays (SVG radial gradients), torn-paper/diagonal poster strips.
- **Typography:** Oversized, rotated/tilted text spans, background repeating marquees.
- **Accents:** Spinning 8-point and 14-point star-burst SVGs, masking tape graphic blocks.

### Events System
- **Grid:** Shortest-column-first Masonry layout engine (adapted from React Bits) handling absolute positioning.
- **Interaction:** Custom GSAP Flip implementation. Clicking a grid item captures its state, expands it to a fixed full-screen modal (`top: 5vh; left: 5vw; 90vw/90vh`), and morphs it smoothly. 
- **Hover Effects:** Dynamic color shift overlay (cycles Orange, Lime, Blue), halftone grunge overlay, and scaling.
- **Background Dimming:** When an event is expanded, the rest of the grid receives a `blur` and `brightness` filter.

### Mascot Placeholder (ZUUM)
- Located on the left side of `SportsHero.tsx`.
- Currently a designated fixed-aspect `aspect-[4/5]` box with masking tape accents and dev-only labels (`TODO: Mascot Asset`). It is strictly a structural placeholder waiting for the real ZUUM asset.

### Architecture
- Lives entirely in `src/components/sports/`.
- The `/sports` route is mounted outside `MainLayout` in `App.tsx`.
- Has its own `SportsHero`, `SportsEvents`, and a dedicated `SportsFooter` (which links back to other routes). It does **not** render the shared top Navigation.

---

## 3. Culture Track (In Progress)

> **Status: In Progress.** Documenting the currently built state. Like Sports, it is isolated in `src/components/culture/` and rendered outside the shared `MainLayout`.

### Palette
- **Deep Plum** (`#1C0B46`) to **Midnight Indigo** (`#0B0F2B`): Base gradient backgrounds.
- **Aurora Violet** (`#8A5CFF`): Main pop — SVG strokes, Devanagari text, hover washes, category labels, CTA backgrounds.
- **Soft Lilac** (`#E6DFF6`): Accents, mascot slot borders, hover washes.
- **Champagne Pearl** (`#EDE4D3`): Warm neutral — typography, photo borders, ticket perforations.
- **Silver** (`#C0C0C0`): Utility text, chevron borders.

### Typography
- **Hero & Primary Titles:** `Baloo 2` (800 weight) — Poppy, rounded festival feel.
- **Hindi / Devanagari:** `Baloo Devanagari 2` (700 weight) — Used for event translations (e.g. "संस्कृति", "सुर संगम").
- **Accents:** `Fraunces` (Italic) — Premium moments like the hero tagline and vertical ticket-stub branding.
- **Data/Labels & Body:** `Barlow` (400/500/600 weight) — Body copy, metadata labels, copyright.

### Motif Vocabulary
- **Darbar Carpet & Jaali:** Multi-layered background incorporating micro-weave patterns, truck-art finials, and a dense 24x16 jaali screen arch.
- **Mandala Medallion:** A central hero backdrop featuring concentric rings, a 16-point star, and a duotone collage inlay.
- **Dusk Gradient:** Soft vertical gradients evoking festival evening light.
- **Duotone & Halftone Photography:** Images use heavy CSS filters (`grayscale(1) sepia(0.5) hue-rotate(220deg) contrast(1.4) brightness`) combined with multiply halftone overlays.

### Events System (Ticket-Stubs)
- **Grid:** Standard CSS Grid (3x2 collapsed, morphing to a full-width active row + 5-column dimmed row).
- **Cards (`EventCard.tsx`):** Built using a high-res `stamp-card.png` background. 
- **Interaction:** Uses Framer Motion (`layoutId`) for FLIP animation. Clicking expands the ticket frame smoothly while staggering the entrance of the expanded content to prevent visual popping.
- **Hover Effects:** Lifts on hover (`-translate-y-1`), raises photo contrast, and fades in an Aurora Violet halftone dot pattern over the image slot.

### CTA & StampBurst
- **StampCTA:** Aurora Violet button with a perforated SVG border and postmark cancellation overlay.
- **StampBurst:** Custom HTML5 `<canvas>` particle physics engine. Clicking the CTA spawns 30 scalloped/petal-shaped hexagon particles that explode outward and fade.

### Mascot Placeholder (SWIRLA)
- Located on the right side of `CultureHero.tsx`.
- Currently an arched container with a `soft-lilac` gradient wash and dashed border, labeled "SWIRLA".

### Architecture
- Lives entirely in `src/components/culture/`.
- The `/cultural` route is mounted outside `MainLayout` in `App.tsx`.
- Features its own `CultureHero`, `CultureEvents`, and `CultureFooter`. It does **not** render the shared top Navigation.

---

## 4. Main Landing Page (`/`)

> **Status: Pre-Integration / Baseline.** The convergence design is not yet built. The page currently serves as a structural baseline.

### Shared Navigation & Footer
- **Track-Agnostic:** Both `Navigation.tsx` and `Footer.tsx` strictly adhere to the convergence palette (`Midnight Indigo`, `Silver`, `Convergence Magenta`). They contain zero track-specific colors (no Sports orange, no Culture violet).
- **Navigation:** Features a desktop top-bar and a mobile bottom tab-bar. Links only to `/`, `/schedule`, and `/profile`. It does **not** link to the `/sports` or `/cultural` routes.
- **Footer:** Features a Jaali-style dotted radial grid background and placeholder links.

### Home Page (`Home.tsx`) Current State
- The page currently renders only two components: `<Hero />` and `<RecapSection />`.
- **Hero:** A track-agnostic setup with a dual-layer logo (Silver fading to Magenta on hover), 6 animated floating kite assets (`motion/react` infinite loops), and SVG noise grain.
- **RecapSection:** A "Last Falak" flashback block utilizing a WebGL `MorphSlider` (OGL + GSAP) running a 'melt' shader inside a Ganjifa-card frame.
- **Missing Elements:** The page currently has no CTAs to enter Sports/Culture, no split-track UI, and no convergence wave/hourglass animations.

---

## 5. Implementation Gaps & Deviations

This section documents where the live code differs from previous planning or handoff documents:

- **Missing Landing Page CTAs:** The Handoff Doc specified "Enter Sports" and "Enter Culture" CTAs mapping to the left/right of the hero. These do not exist in the current `Home.tsx`.
- **Hero Animations Divergence:** The Handoff Doc detailed a transition to Google Flow (Veo) videos for background waves and hourglass scrubbers. The codebase instead implements CSS/Framer Motion floating kites and a WebGL `MorphSlider` for the flashback. The Flow videos are not integrated.
- **Sports `EventCard.tsx` is an Orphan:** `src/components/sports/SportsEventCard.tsx` contains a complete Framer Motion accordion implementation, but it is entirely unused. The live site uses `Masonry.tsx` to handle the grid, GSAP Flip, and detail rendering internally.
- **Navigation Links:** The shared `<Navigation />` was documented to handle top-level routing, but it currently has no links to `/sports` or `/cultural`. Users must manually navigate to those URLs or reach them via the standalone footers.
- **Culture Route Naming:** The file is `Culture.tsx` and component is `CulturePage`, but the route is defined as `/cultural` in `App.tsx`.

---

## 6. Outstanding / Not Yet Done (Site-Wide)

- **Main Landing Convergence Build:** The split-track hero design, swipe/click zone transitions, and unified entry point to the festival are pending.
- **Real Mascot Assets:** Both ZUUM (Sports) and SWIRLA (Culture) require final graphics to replace the structural placeholders.
- **Culture Event Photography:** `cultureData.ts` currently references fallback/placeholder duotone images. Real event photography needs to be slotted in.
- **Culture Footer Confirmation:** Determine if the isolated `CultureFooter` should remain independent or share structural similarities with the global footer.
- **Mobile Breakpoints:** The site remains locked to desktop layout (`1440px`). A comprehensive mobile responsive pass is required across all tracks.
- **Schedule/Profile/Passes Sections:** Currently implemented as bare-minimum structural stubs with "Coming Soon" messaging to prevent 404s. These need full implementations.

---

## 7. Full-Site Changelog

**Session 1–5: Sports Track Build**
- Setup isolated routing and scaffolded page shell for `/sports`.
- Added Archivo font families and Sports color tokens.
- Scaffolded Sports Hero with asymmetric layout and mascot placeholder.
- Created `SportsFooter` with neobrutalist styling, tilted logo, and halftone texture.
- Implemented `SportsEvents` with React Bits Masonry and GSAP Flip for expand-in-place interactions, including color cycling and grunge hover overlays.

**Session 6: Culture Track Build**
- Created `/cultural` route and isolated `CulturePage` structure.
- Added Aurora Violet, Soft Lilac, Champagne Pearl, and Devanagari fonts to theme.
- Built `CultureHero` featuring Darbar carpet/Jaali background, Mandala medallion, SWIRLA placeholder, and asymmetric layout.
- Developed `CultureFooter` with carpet-weave texture and spinning rosette.
- Implemented `CultureEvents` grid.
- Developed `EventCard` using `stamp-card.png` ticket-stubs, Framer Motion FLIP layout animations, and duotone photo slots.
- Added custom HTML5 `<canvas>` particle physics (`StampBurst`) and scalloped `StampCTA` for registration buttons.
- Applied massive anti-slop pass to Culture background textures (micro-weave, finials, noise).

**Session 7: Full-Site Documentation**
- Audited the entire codebase (Sports, Culture, Main Landing Page).
- Consolidated site-wide rules, verified implementations against previous planning docs, and produced this unified `design.md` reference.
- Created status-only `README.md`.
**Session 8: Profile Page Build**
> **Profile page (/profile):** Culture-leaning base palette (Violet/Plum/Lilac/Pearl/Silver) + single-instance Convergence Magenta accent rule, applied because cross-track data display (a page showing both Sports and Cultural registrations together) was ruled a legitimate convergence context. First on-button use of the ticket-stub motif (previously card-tile only on Cultural route) � logged as an intentional extension, not scope drift. Profile Stamp introduced as a new, separate character system from ZUUM/SWIRLA: 3 user-selectable variations (Editorial Cool / Retro Performer / Heritage Artist), all shipping live, selectable by the attendee � not a design-review pick.
