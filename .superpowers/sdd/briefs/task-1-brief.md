# Task 1: Fonts & Theme

## Context
This is part of building the `/sports` landing page for the Falak 26 fest site. The existing site uses Vite + React + Tailwind CSS v4 (with `@theme` blocks). This task adds Sports-specific fonts and colour tokens. These are **additive-only** changes to two shared files — they must not alter any existing definitions.

## What to do

### 1. Add Archivo fonts to `index.html`

In the existing Google Fonts `<link>` tag on line 11, **append** these families to the `family=` parameter list (do NOT replace the existing families, add to them):
- `Archivo+Black` (weight 400 — it's a single-weight family)
- `Archivo:wght@600` (Archivo Condensed SemiBold is not on Google Fonts as a separate family — use `Archivo` at weight 600 as the condensed-style substitute)

The updated `href` should look like the existing one with `&family=Archivo+Black&family=Archivo:wght@600` appended before the `&display=swap` at the end.

### 2. Register Sports colours in `src/index.css`

Inside the existing `@theme { ... }` block (lines 3–23), **add** these colour tokens after the existing `--color-deep-plum` line (line 9):

```css
  --color-electric-orange: #FF6A00;
  --color-acid-lime: #C6FF00;
```

These enable Tailwind utilities like `bg-electric-orange`, `text-acid-lime`, etc.

### 3. Register font families in `src/index.css`

Inside the same `@theme { ... }` block, in the "New Tailwind font utilities" section (after line 22), **add**:

```css
  --font-archivo-black: "Archivo Black", sans-serif;
  --font-archivo:       "Archivo", sans-serif;
```

These enable Tailwind utilities like `font-archivo-black`, `font-archivo`.

### 4. Add CSS custom properties in `:root`

Inside the existing `:root { ... }` block (lines 31–41), **add**:

```css
  --font-headline-sports-section: "Archivo Black", sans-serif;
  --font-label-sports:            "Archivo", sans-serif;
```

## Verification

Run: `npx vite build`
Expected: Build succeeds with no errors.

## Commit

```
git add index.html src/index.css
git commit -m "feat(sports): add Archivo fonts and Sports colour tokens to theme"
```

## Files touched
- **Modify:** `index.html` (line 11 — Google Fonts link)
- **Modify:** `src/index.css` (lines 3–41 — `@theme` block and `:root` block)
