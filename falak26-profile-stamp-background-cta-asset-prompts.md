# Falak '26 — Profile Page Asset Prompts
**Scope:** Three standalone image-generation prompts for the `/profile` ("My Falak") page — (1) user-selectable Profile Stamp, 3 variations, (2) page background, (3) Events CTA + Passes CTA.
**Tools:** Midjourney / DALL·E / SDXL / Gemini (any — prompts are model-agnostic).
**Frozen/locked context this must respect:** `HeroCircles.tsx` untouchable, Sports hero locked, Cultural hero locked, ZUUM/SWIRLA mascot slots pending real assets (do not reference or duplicate mascot geometry here — this is a separate character).

---

## Standing rule applied throughout
Every reference image below (dog in bucket hat, DJ woman screen-print, folk musician poster) is **form-only**. Their maroon/red/mustard/blue colorways are explicitly excluded. Nothing here uses saree-red, mustard-yellow, or poster-blue. All color must resolve to the palette table in each section.

---

## Asset 1 — Profile Stamp (3 user-selectable variations)

### What this is
A circular/badge "stamp" bearing a stylized human bust-portrait, representing the attendee. This is **not** ZUUM or SWIRLA — it's a separate, simpler character system, closer to a postage-stamp/seal treatment than a full mascot illustration. **All three variations render live in the product; the end user picks one as their profile identity.** They must feel like distinct personalities while remaining unmistakably part of the same system (same linework weight, same perforated stamp edge, same construction logic) — a user should be able to tell all three came from Falak '26 even before knowing which one is "theirs."

### Shared construction (applies to all 3 variations — do not vary this)
- **Silhouette:** circular stamp, ~1:1 ratio, with a die-cut **perforated edge** (small circular scallops), rendered in Silver `#C0C0C0` linework — this is the one element that must read identically across all three so they feel like a set.
- **Character build:** flat-illustration bust portrait (shoulders-up), geometric faceting consistent with the premium flat-illustration language already established for ZUUM/SWIRLA — but simpler, fewer facets, since this sits small on a profile page, not as a hero mascot.
- **Grain:** a light halftone/screen-print texture overlay (pulled from the DJ-poster and musician-poster refs) at low opacity — this is what gives it the "stamp" feel, not a smooth vector fill.
- **No literal Devanagari or Hindi text.** The refs use real Hindi typography; we don't have translation/proofing in scope, so skip language marks entirely rather than risk a wrong or garbled rendering. If a wordmark is wanted later, that's a separate, deliberate localization task.
- **Convergence Magenta `#FF3D7F` appears in exactly one place across all three, identically**: a single small sunburst/starburst pop-shape (pulled from the musician-poster ref) tucked at one edge of the stamp, ~8–10% of the stamp's area max. This is the one shared "this is a Falak stamp" signal — not a per-variation color, a constant.
- Aspect ratio: square, minimum 1024×1024 for downstream cropping.

### Variation A — "Editorial Cool"
Pulled from the dog reference's *attitude only* (confident, deadpan, oversized-accessory energy) — not the dog itself, not the animal, not literal sunglasses-on-a-hat framing.
- Pose: three-quarter turn, chin slightly down, calm/confident expression — not smiling, not stern, just assured.
- One oversized accessory as the personality anchor (e.g., an oversized collar, an asymmetric draped garment edge) rendered in **Soft Lilac `#E6DFF6`** against a **Deep Plum `#1C0B46`** ground.
- Accent linework in **Silver `#C0C0C0`**.
- No sunglasses, no hat — those read as literal copies of the reference; the "cool" has to come from pose and proportion, not props.

### Variation B — "Retro Performer"
Pulled from the DJ-woman poster's *energy and print texture* — mid-motion, hands-in-frame gesture, screen-print grain — not her saree, not her jewelry set, not the red/black colorway.
- Pose: slight motion blur suggestion at the shoulders/hands (implying movement, like mid-gesture), energetic tilt.
- Halftone grain pushed slightly heavier here than the other two variations (this is the one place grain density can vary, since "performer energy" reads through print texture).
- Ground: **Aurora Violet `#8A5CFF`**, character rendered in **Champagne Pearl `#EDE4D3`** with **Deep Plum** shadow facets.
- No turntables, no DJ equipment, no headphones — the performer energy is in the pose and grain, not in literal instruments.

### Variation C — "Heritage Artist"
Pulled from the folk-musician poster's *quiet, composed dignity and collage-layering* — not his turban, not his instrument, not the blue/mustard colorway.
- Pose: eyes softly downcast or focused (as if absorbed in a craft), stiller and more composed than Variations A and B.
- One collage-style layered edge (a torn-paper or overlapping-plane effect at the stamp's inner border, echoing the poster's collage construction) in **Deep Plum** over **Soft Lilac**.
- No turban, no instrument — the "artist" quality comes from the composed expression and the collage-edge treatment, not literal folk-costume props.

### Explicit exclusions (all 3 variations)
- No literal animals, no clothing items copied from Ref 1, no jewelry/instruments copied from Refs 2–3, no red/maroon/mustard/blue from any reference, no Sports-track colors (Electric Orange, Acid Lime, Cobalt Blue) anywhere on this asset — the stamp is Culture-leaning + Convergence-accent only, never Sports-coded.

---

## Asset 2 — Profile Page Background

### What this is
Full-bleed background for `/profile`. Extends the Cultural route's established **Darbar Carpet + Jaali Screen hybrid** motif (texture reuse, not a new invention) but dialed down in density since this is a data-dense utility page (event lists, passes, QR codes need to stay legible), not a hero.

### Construction
- Base: **Deep Plum `#1C0B46`** solid ground.
- Jaali (lattice) screen pattern in **Aurora Violet `#8A5CFF`** at low opacity (12–18%), repeating geometric lattice — same construction logic as the Cultural hero's Jaali Screen, scaled down and lightened so it reads as texture, not foreground pattern.
- **One soft radial glow in Convergence Magenta `#FF3D7F`**, low opacity (10–15% max), centered behind where the profile stamp will sit — this is the only Magenta in the entire background, signaling "this is where your identity lives" without tinting the whole page.
- No carpet-border motif (that's the Cultural hero's signature framing device — reusing it here would blur the hero/utility-page hierarchy). Lattice only, no ornate corner medallions.
- Vertical gradient fade: slightly darker Deep Plum at top (behind navbar) fading a touch lighter toward the lower third (behind the events/passes list), so list content has more contrast to sit on.

### Explicit exclusions
- No Champagne Pearl or Soft Lilac as background base (those are reserved for card/foreground surfaces, not the page ground — keeps contrast hierarchy intact).
- No paisley motif from Ref 4 territory reused here — that belongs to the Cultural hero specifically.
- No red/maroon.

---

## Asset 3 — CTA Buttons: Events vs. Passes

### What this is
Two CTA button assets that must be **distinguishable at a glance** even before reading the label — one routes to a user's registered events, one to their purchased passes.

### Shared base (both buttons)
- Pill-shaped button, Archivo (variable) label type, Silver `#C0C0C0` 1px border as the resting state.
- Hover/active state: border brightens to full-opacity Silver + subtle Magenta `#FF3D7F` glow at 8% opacity — this is the *only* Magenta touch on either button, and identical on both, so it doesn't become a differentiator (it shouldn't — both are equally "yours").

### Events CTA — ticket-stub language
Reuses the **ticket-stub motif already established on Cultural event card tiles** (documented correction on record: ticket-stub lives on the card tile, not the Register button — so this is the *first* legitimate use of ticket-stub language on an actual button).
- Left edge of the pill has a small perforated/torn-stub notch (matching the tile treatment).
- Fill: **Aurora Violet `#8A5CFF`**, label in **Champagne Pearl `#EDE4D3`**.
- Icon: a simple stub/ticket glyph, Silver linework.

### Passes CTA — boarding-pass language
Deliberately a *different* silhouette family so the two are never confused, even in peripheral vision.
- Right edge of the pill has a small QR-corner-bracket notch (three small corner brackets suggesting a scannable code, not a full QR render) — visually opposite the Events button's left-edge stub notch.
- Fill: **Deep Plum `#1C0B46`** outline-only (transparent center) with **Soft Lilac `#E6DFF6`** label — inverted weight from the Events button (solid vs. outline) so they read as opposites even in grayscale.
- Icon: a simple corner-bracket/scan glyph, Silver linework.

### Explicit exclusions
- No shared icon family between the two — a shared glyph style would undercut the "distinct at a glance" requirement.
- No Sports-track colors on either button (this page is Culture-leaning + Convergence-accent only, per the locked palette decision for `/profile`).
- Do not reuse the exact ticket-stub asset file from the Cultural event card tile — regenerate at CTA scale so stroke weight matches button proportions rather than card proportions.

---

## Open items for `design.md` changelog once these are approved
- Profile page palette ruling: Culture-leaning base + single-instance Convergence Magenta accent (stamp starburst, background glow, button hover) — first documented use of Magenta outside a track-merge moment; log the reasoning (cross-track data display = legitimate convergence context) so it isn't mistaken for scope creep later.
- Confirm whether the ticket-stub notch on the Events CTA should be added to the Cultural route's asset-reuse log (same visual family, new context).
