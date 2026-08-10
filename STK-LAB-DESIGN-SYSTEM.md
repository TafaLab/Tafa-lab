# STK Lab design system

Core STK Lab pages now share one visual layer.

## Change the whole visual style here first

`app/components/stk-lab/design/StkTheme.module.css`

The token block controls:
- page/surface colors
- text/muted colors
- dark sections
- borders
- accent surfaces
- card radii
- shadows
- container rhythm
- reveal animation distance, duration and easing

## Shared primitives

- `StkSiteShell.tsx` — applies the STK Lab theme to a core page.
- `StkReveal.tsx` — shared scroll reveal animation with reduced-motion support.
- `StkButton.tsx` — shared CTA/button treatment for new core pages.
- `theme.ts` — semantic utility aliases for future components.

## Scope

This design layer is for STK Lab core marketing/industry pages:
- Home
- Bakeries
- Restaurants
- future Beauty / Travel / Business Platforms

Project demos (STK Bakery, Tilda case studies, external live projects) remain independent and do not inherit this redesign automatically.
