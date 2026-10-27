# Tafa Lab — master backlog

Updated: 2026-10-26. Repository: `TafaLab/Tafa-lab`. This is the studio website and its industry demos, **not** `Tafalab-travel`.

## Operating rules
- Preserve existing live pages, demos, CRM data, Supabase schemas and working routes.
- Verify current files and deployment before changes; never replace a production Supabase URL or keys without confirming their matching project.
- Keep RU/EN content and test both locales; deploy only after validation.
- Keep bakery demos/review branches and local copies until differences are reviewed.

## New top priorities (2026-10-26)
1. **P0 — AI Agents & Automation**: dedicated RU/EN service page and homepage link committed; strengthen the existing AI section and develop a working demo. Page includes channels, implementation process, privacy/human escalation and contact CTA. Original plan: create a dedicated RU/EN service page with channels, business outcomes, human handoff, security/privacy, integrations, industry offers and lead CTA. Do not imply live agents where only services are proposed. Next: design and implement working demos, scoped by channel.
2. **P0 — Learning Platforms / EdTech**: initial RU/EN landing, homepage link and tailored AI offers committed; full demo, integrations and QA still pending. Separate Tafa Lab industry vertical (not a Git branch). RU/EN industry landing, course catalogs, lessons, student accounts, progress, quizzes, assignments, certificates, payments/subscriptions, educator/admin dashboards, cohort management, integrations and AI tutor (grounded in course materials). Build an interactive demo in phases; do not mislabel mock functionality as production.
3. **P0 — Conferences & Professional Events**: initial RU/EN landing and homepage link committed; full demo, integrations and QA still pending. Separate vertical from general entertainment/events. RU/EN industry landing, event website, agenda and speaker profiles, ticketing/registration, QR check-in, online/hybrid sessions, attendee networking, sponsors/exhibitors, lead capture, organizer dashboard and AI event concierge. Build interactive demo in phases.
4. **P1 — Flowers & Florists**: existing scope below; category, bouquet builder, ordering/delivery, CRM, AI florist.
5. **P1 — Commercial service taxonomy**: Web Development, App Development, AI Agents, Automation & Integrations, Business Systems (CRM/ERP/analytics), Interactive & 3D; secondary services: e-commerce, booking, UI/UX and brand identity, SEO/performance/CRO, cloud/API integrations, maintenance and support, white-label industry platforms.
6. **P1 — Reusable industry solutions**: CRM/ERP, booking, commerce, BI dashboards, API/payment/messaging integration, 3D configurators, white-label licensing and maintenance plans. Describe availability accurately and scope implementation individually.
7. **P1 — QA / operations**: production build and responsive RU/EN review; validate Supabase/Vercel mapping and language fallback, then deploy only after approval.

## Acceptance criteria for P0 verticals
- Visible from homepage industries/navigation and accessible at distinct RU/EN URLs.
- Dedicated, differentiated industry landing page with features, demo status, related AI services and functional contact CTA.
- Correct metadata, canonical/hreflang, responsive/mobile and keyboard accessibility.
- Preserve all existing sectors, demos and CRM functionality.
- TypeScript/build and visual QA before any production release.

## P0 — Industry AI agents, bots and editorial content (2026-10-26)
- [x] Existing industry-specific AI offer cards: bakeries, restaurants, beauty, travel, business platforms, entertainment, learning platforms, conferences. Flowers is pending its industry page.
- [x] Add three bilingual commercial AI development package cards to each of eight industry pages (scope and pricing remain bespoke; build QA pending).\n- [ ] Upgrade **every industry** to a substantial **AI Agents & Bots for Your Industry** sales section: concrete business outcomes, three sector-specific agent/bot packages, customer conversation examples, supported channels (Telegram, official WhatsApp Business, website chat, optional voice), CRM/booking/payment integration boundaries, human handoff, and a contact CTA.
- [x] Add bilingual **planned blog/article preview cards** for eight industries (not published articles); actual article writing and publication remain pending.\n- [ ] Add industry-specific **blog/article previews** distinct from sales blocks. Each article needs RU/EN copy, unique slug, author/editorial review, metadata, and links to relevant services. Do not present article ideas as published articles.
- [x] Build reusable bilingual **AI industry showcase** component to avoid duplicated UI and inconsistent service promises.
- [x] Add clearly labeled static example conversations on eight industry pages (not connected bots).\n- [x] Add interactive **scripted** bot scenario buttons for all eight current sectors (not connected to AI or backend); code committed, QA pending.\n- [ ] Provide **working AI-backed bot demos** as a separate implementation milestone; label scripted examples as demonstrations, not deployed agents. Never claim active API integrations before verified.
- [ ] Include Flowers after the new sector is implemented; maintain all eight existing industry AI blocks.
- [ ] Test links, mobile layout, keyboard access, RU/EN, SEO, TypeScript/build and lead capture. No deployment before approval.

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
