# Project Progress

This file is read at the start of every session. It is the single source of truth for what has been built.
Update it immediately after completing any screen, component, or feature.

---

## Status Key
- ✅ Done
- 🔄 In progress
- ⏳ Not started

---

## Shared Components (across all 6 sites)

| Component | Status | Figma | Code | Notes |
|---|---|---|---|---|
| Token system | ✅ | LSM-foundation (ontario + SSM modes) | packages/tokens/index.css | 24 color vars per site, spacing + radius shared |
| Tailwind config | ✅ | — | packages/ui/tailwind.config.ts | All colors mapped to CSS variables |
| Button | ✅ | node 544:5660 | packages/ui/src/components/Button/Button.tsx | 4 variants × 4 states, all token-bound, Storybook story included |
| TextField | ✅ | node 544:5725 | packages/ui/src/components/TextField/TextField.tsx | 4 states, swappable Lucide icon prop, error banner, clear button |
| SignupForm | ✅ | node 545:11649 | packages/ui/src/components/SignupForm/SignupForm.tsx | Uses Button + TextField; header/headline/form-body sections; checkbox consent; brandName + URL props; Storybook story included |
| Label | ✅ | node 549:11983 (component set) | packages/ui/src/components/Label/Label.tsx | 2 variants: mobile (rounded-t-lg, full width) and desktop (rounded-br-lg tab shape, fixed width); bg-secondary; bold on-surface-light text |
| OfferCard | ✅ | node 549:11989 | packages/ui/src/components/OfferCard/OfferCard.tsx | 2 responsive variants (mobile/desktop); uses Label + Button. Mobile: offer text LEFT (1fr), logo RIGHT (144px). Desktop: logo LEFT (224px), title+checkmarks MIDDLE (flex-1), button RIGHT (253px); py-6 px-5 padding. Logo at /ssm/brands/888logo.png. |
| WebsiteDirectory | ✅ | node 576:5727 | packages/ui/src/components/WebsiteDirectory/WebsiteDirectory.tsx | title prop + sites array (name + optional href); wrapping 4-col grid; tertiary title color; links activate on href, plain text without; Storybook story included |
| SsmFooter | ✅ | node 576:5828 | packages/ui/src/components/SsmFooter/SsmFooter.tsx | desktop + mobile responsive; nav links (optional hrefs), 4 responsible gambling logos from assets/ssm/footer, legal text; Storybook story included. Figma frames also renamed (Frame 1000004522→nav-bar, Frame 1000004604→nav-inner, Frame 52→legal-text) |
| LogoSection | ✅ | node 578:6976 | packages/ui/src/components/LogoSection/LogoSection.tsx | mobile header bar; SSMLogo.svg centred, Lego_Deco.png background, tertiary-coloured hamburger menu button right, invisible spacer left for centering; onMenuClick + src props; Storybook story included |
| USP | ✅ | node 579:10031 | packages/ui/src/components/USP/USP.tsx | responsive: mobile 14px Bold py-1, desktop 24px Heavy py-2; bg-tertiary; tracking -0.019em; Futura PT; updated from Figma 2026-05-05 |
| WelcomeBanner | ✅ | node 579:10218 | packages/ui/src/components/WelcomeBanner/WelcomeBanner.tsx | mobile: h-16 flex justify-between, 24px Heavy, coin images 83×64; desktop: 57px Heavy title + features row (3 items 24px), coin images 204×157 absolutely positioned; features prop added; updated from Figma 2026-05-05 |
| TopTCs | ✅ | node 579:9738 | packages/ui/src/components/TopTCs/TopTCs.tsx | surface bg, 11px/13px centred white text, tracking 0.4px, py-1 px-4; text prop; Storybook story included |

---

## Site 1 — SSM (superspillemaskiner.dk)

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| App scaffold | ✅ | — | apps/ssm — runs on localhost:3001 | Next.js 15, Tailwind, data-theme="ssm" wired |
| SSM color tokens | ✅ | LSM-foundation SSM mode — 24 tokens | packages/tokens/index.css (data-theme="ssm") | All 24 tokens verified in sync with Figma |
| SSM mobile page | ✅ | node 581:11385 | apps/ssm/src/app/page.tsx | 6-section layout: LogoSection → USP → WelcomeBanner → 4 offer cards + SignupForm → WebsiteDirectory → SsmFooter. Offer cards use 888logo.png placeholder. Casino directory names are placeholder — update when SSM content is ready. |

---

## Site 2 — [Name TBD]

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| — | ⏳ | — | — | — |

---

## Site 3 — [Name TBD]

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| — | ⏳ | — | — | — |

---

## Site 4 — [Name TBD]

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| — | ⏳ | — | — | — |

---

## Site 5 — [Name TBD]

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| — | ⏳ | — | — | — |

---

## Site 6 — [Name TBD]

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| — | ⏳ | — | — | — |

---

## Infrastructure Setup

| Item | Status | Notes |
|---|---|---|
| Tech stack confirmed | ✅ | Next.js + Tailwind CSS + TypeScript |
| Figma file identified | ✅ | Phoenix — key: 6EnskRtI7e17rUOiZwdiBz |
| Token strategy agreed | ✅ | Single-layer colors in LSM Foundation collection, one Figma column per site |
| Preview/sharing setup | ✅ | Storybook + live sites both on Vercel |
| SSM color column in Figma | ✅ | SSM mode exists in LSM-foundation — all 24 colors set and verified |
| Codebase scaffold | ✅ | platform/ — monorepo with npm workspaces + Turborepo |
| Storybook setup | ✅ | packages/ui — runs with `npm run storybook` from root |
| Vercel deployments | ⏳ | Pending GitHub repo |
| GitHub repo | ⏳ | Not created yet — code lives in platform/ locally |

---

## Decisions Log

| Date | Decision | Reason |
|---|---|---|
| 2026-04-30 | Single-layer color tokens (no semantic layer yet) | Agreed with dev team — upgrade in future version |
| 2026-04-30 | Vercel for both Storybook and live site previews | Simpler than adding Chromatic; can add visual regression later |
| 2026-04-30 | SSM is the first site to build | Existing Figma page: "SSM design - dev" |
| 2026-04-30 | 6 sites total | Added SSM (superspillemaskiner.dk) — was missing from original brief |
