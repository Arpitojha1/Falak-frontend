# Falak '26

Falak '26 is the official MIT Bengaluru festival website, a React SPA featuring separate, distinct Sports and Culture track identities.

## Stack

React 19, Vite, React Router v7, Tailwind CSS v4, Framer Motion v12, GSAP.

## Route Status

| Route | Status | What's built |
|---|---|---|
| `/sports` | Complete | Asymmetric Hero, Masonry event grid with GSAP Flip expand, neobrutalist styling, isolated footer. Mascot slot is a placeholder (ZUUM pending). |
| `/cultural` | In progress | Hero (jaali/carpet background, SWIRLA placeholder), event card system (ticket-stub cards, Framer Motion layout expand, Register CTA with particle burst). Real mascot and event photography pending. |
| `/` (main landing) | Baseline / pre-integration | Shared track-agnostic Navigation and Footer, Kite motif hero, and WebGL flashback slider. Convergence split-track hero not yet built. |

## Design System

Full design system, motif rationale, and decision history documented in `public/assets/docs/design.md`.

## Setup

```bash
npm install && npm run dev
```