# Tafa Lab — master backlog

Updated: 2026-10-26. Repository: `TafaLab/Tafa-lab`. This is the studio website and its industry demos, **not** `Tafalab-travel`.

## Operating rules
- Preserve existing live pages, demos, CRM data, Supabase schemas and working routes.
- Verify current files and deployment before changes; never replace a production Supabase URL or keys without confirming their matching project.
- Keep RU/EN content and test both locales; deploy only after validation.
- Keep bakery demos/review branches and local copies until differences are reviewed.

## Prioritized tasks
- [ ] **Flowers & Florists — new industry category.** Add a standalone category to homepage industry navigation, industry landing page, services/portfolio and RU/EN metadata. Keep the visual language consistent with other industry pages.
  - [ ] Florist website and bouquet catalog: occasions, flower types, arrangements, sizes, delivery windows and care instructions.
  - [ ] Interactive **Bouquet Builder**: select flowers, palette, packaging, greeting card, budget, preview and live estimated price (based on actual catalog/pricing rules).
  - [ ] Orders and delivery workflow: address, delivery date/time, payment request, florist approval, status updates and substitutions with customer consent.
  - [ ] Florist CRM: customer requests, occasions, repeat orders, inventory, procurement, seasonal demand and staff operations.
  - [ ] **AI Florist** for Telegram, official WhatsApp Business API, website chat and optional standalone agent: recommend bouquets, ask budget/occasion, collect orders, suggest add-ons, send follow-ups; integrate with actual availability and human handoff.
  - [ ] Build an interactive florist demo and include it in the portfolio; don't label unbuilt features as live.
  - [ ] Check accessibility, mobile, SEO, TypeScript/build, RU/EN and demo-to-CRM request flow.
- [x] **Browser-language entry routing**: `next-intl` detects visitor locale at the unprefixed site root; support RU/EN, fallback EN, keep explicit `/ru` and `/en` URLs and user locale choice. Code committed; **production verification pending**.
- [ ] Test language negotiation on first visit with RU, EN and unsupported-language browser settings; check language cookie and language switcher. Verify production after approved deployment.
- [ ] Confirm `stkbakery` Vercel production environment references restored Supabase project `eplsyzzqgrxmgtsuimz`; never expose service-role keys.
- [ ] Rename Supabase display name `Milky Cake` to `Tafa Lab` in dashboard (do not change project ref or API keys).
- [ ] Review remaining legacy `stk-bakery` naming and unify public-facing Tafa Lab branding without renaming identifiers that existing integrations depend on.
- [ ] Validate recently added AI agent offerings on home and industry pages after build; add Flowers-specific offers once its page exists.

## Existing industry coverage
Bakeries, restaurants, beauty/wellness, travel/hospitality **within Tafa Lab**, business platforms, entertainment/events. Flowers & Florists is the next category. The separate `Tafalab-travel` repository remains independent.
