# Task 3: Events Section

## Context
This builds the Events section for the `/sports` landing page. The primary interaction is an "expand-in-place" card that uses Framer Motion (`motion/react-client`) to smoothly grow and reveal event details. Only one event can be open at a time.

## What to do

### 1. Create `src/components/sports/sportsData.ts`
Create an array of 6 placeholder events. Each event needs:
- `id`: unique string (e.g., 'football')
- `title`: Event name (e.g., 'FOOTBALL')
- `iconName`: A string to map to a Lucide icon (e.g., 'Trophy', 'Dribbble', 'Goal', 'Crosshair', 'Flame', 'Zap')
- `teaser`: A one-line punchy description
- `description`: A full paragraph of placeholder text describing the event
- `date`: Placeholder date/time (e.g., 'Oct 15, 2026 | 10:00 AM')
- `venue`: Placeholder venue (e.g., 'Main Stadium')
- `format`: Placeholder format (e.g., '7-a-side Knockout')
- `rulesLink`: '#'

### 2. Create `src/components/sports/SportsEventCard.tsx`
Build the individual event card component.
Props:
- `event`: the event object from `sportsData`
- `isExpanded`: boolean
- `onToggle`: function to call when the card is clicked to toggle state

**Interaction (Expand-in-place):**
- Use `motion.div` with the `layout` prop for the outer card so it smoothly animates size changes.
- In the collapsed state, render a compact card with:
  - An icon (import the appropriate icon from `lucide-react` dynamically or via a mapping based on `event.iconName`).
  - The `event.title` styled with `font-headline-sports-section text-2xl uppercase`.
  - The `event.teaser` in `font-sans text-silver/60`.
  - A left border accent of `electric-orange`.
- In the expanded state, render the above PLUS a detailed panel (use `AnimatePresence` and a child `motion.div` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` for the inner content):
  - `event.description`
  - A grid or flex layout showing `date`, `venue`, `format` (using `font-label-sports text-silver` or similar).
  - A "REGISTER NOW" `<button>` styled as a blocky, bold CTA (bg-electric-orange text-midnight-indigo font-headline-sports-section). It does nothing on click (no-op).
- Use `spring` easing for layout transitions (e.g., `transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}`).

### 3. Create `src/components/sports/SportsEvents.tsx`
Build the parent component to manage the list and state.
- Render a section container with a headline: "THE EVENTS" in `font-headline-sports-section` (Archivo Black).
- Map over `sportsData`.
- Use React state `expandedId` to track which card is currently expanded.
- Pass `isExpanded={expandedId === event.id}` and `onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}` to each `<SportsEventCard>`.

### 4. Update `src/pages/Sports.tsx`
Import and render `<SportsEvents />` below the placeholder hero header.

## Global Constraints & Palette
- Backgrounds: `bg-midnight-indigo` or `bg-silver/5` for cards.
- Text: `text-silver`, `text-electric-orange`.
- Fonts: `font-headline-sports-section` (Archivo Black) for section headers and event titles. `font-label-sports` (Archivo Condensed) for small data labels (Date/Venue/Format). `font-sans` (Barlow) for standard body copy.

## Verification
Run `npx vite build` to ensure it compiles without type or lint errors.

## Commit
```
git add src/components/sports src/pages/Sports.tsx
git commit -m "feat(sports): add expand-in-place event cards and events section"
```

## Files touched
- **Create:** `src/components/sports/sportsData.ts`
- **Create:** `src/components/sports/SportsEventCard.tsx`
- **Create:** `src/components/sports/SportsEvents.tsx`
- **Modify:** `src/pages/Sports.tsx`
