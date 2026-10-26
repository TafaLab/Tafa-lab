# Tafa Lab — master backlog

Updated: 2026-10-26. Repository: `TafaLab/Tafa-lab`. This is the studio website and its industry demos, **not** `Tafalab-travel`.

## Operating rules
- Preserve existing live pages, demos, CRM data, Supabase schemas and working routes.
- Verify current files and deployment before changes; never replace a production Supabase URL or keys without confirming their matching project.
- Keep RU/EN content and test both locales; deploy only after validation.
- Keep bakery demos/review branches and local copies until differences are reviewed.

## AI agents and commercial offers — requested in this conversation
- [x] Add a general **AI Agents & Automation** section on the Tafa Lab homepage, describing Telegram, WhatsApp Business, embedded website chat, standalone agents, voice AI and workflow automation. Code committed; **build, visual QA and production verification pending**.
- [x] Add tailored AI solution blocks to existing industry pages: **bakeries, restaurants, beauty, travel (within Tafa Lab), business platforms and entertainment/events**. Code committed; **visual and functional QA pending**.
- [ ] Review section placement, typography, mobile responsiveness and calls to action on every industry page; ensure new blocks fit existing design and do not displace screenshot-verified content.
- [ ] Expand the offer from short AI feature cards into **industry-specific commercial proposal blocks/packages** with concrete deliverables, benefits and a working **Discuss Your Project** lead flow; do not invent fixed prices or promise integrations without scoping.
- [ ] Bakery packages: AI Order Assistant; Smart Cake Builder + AI; Bakery Operations AI; complete website + ordering + CRM + AI solution.
- [ ] Restaurant packages: AI host/reservations, menu/allergen assistant, takeaway/customer-service workflow, POS/CRM integration where available.
- [ ] Travel & hospitality packages **inside Tafa Lab**: AI trip advisor, itinerary builder, booking enquiry handoff, guest concierge and travel CRM; keep separate from the TafaLab Travel product repository.
- [ ] Beauty & wellness packages: AI receptionist, appointments/reminders, client retention and service consultation with human handoff.
- [ ] Business platform packages: internal knowledge agent, document/workflow automation, lead qualification, reporting/analytics and role-based access.
- [ ] Entertainment/events packages: booking enquiries, ticket/event FAQ, guest concierge, upsells and CRM routing.
- [ ] Flowers & Florists packages: AI florist, bouquet configurator, order/delivery assistant and florist CRM; add to the new Flowers page and main AI offering.
- [ ] Document channel capabilities and requirements: Telegram bots, official WhatsApp Business API, website widget, independent web app/agent, voice AI where supported, CRM/calendar/orders/inventory integrations; include consent, privacy, permissions, monitoring and human escalation.
- [ ] Check that all RU/EN descriptions are accurate and distinguish **custom development services** from already deployed AI products.

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
- [ ] **Regional language fallback:** if the browser does not express RU or EN and there is no explicit locale/cookie, prefer RU for KZ, KG, UZ, TJ, TM, RU, BY using hosting country header; otherwise EN. Browser and manual choices take priority. Code committed; production QA pending.\n- [ ] Test first visits with RU, EN, unsupported browser languages and geo country headers; check locale cookie, language switcher, direct /ru and /en routes, and hosting header availability. Verify production after approved deployment.
- [ ] Confirm `stkbakery` Vercel production environment references restored Supabase project `eplsyzzqgrxmgtsuimz`; never expose service-role keys.
- [ ] Rename Supabase display name `Milky Cake` to `Tafa Lab` in dashboard (do not change project ref or API keys).
- [ ] Review remaining legacy `stk-bakery` naming and unify public-facing Tafa Lab branding without renaming identifiers that existing integrations depend on.
- [ ] Validate recently added AI agent offerings on home and industry pages after build; add Flowers-specific offers once its page exists.

## Existing industry coverage
Bakeries, restaurants, beauty/wellness, travel/hospitality **within Tafa Lab**, business platforms, entertainment/events. Flowers & Florists is the next category. The separate `Tafalab-travel` repository remains independent.
