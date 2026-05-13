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
| Token system | ✅ | LSM-foundation (ontario + SSM modes) | packages/tokens/index.css | Color vars per site, spacing + radius shared. primary-text added for text CTA colour; SSM value #1D8E1D. SSM tertiary updated 2026-05-11: #FF002A / hover #EB0027 / focused #DB0024. |
| Tailwind config | ✅ | — | packages/ui/tailwind.config.ts | All colors mapped to CSS variables |
| Button | ✅ | node 544:5660 | packages/ui/src/components/Button/Button.tsx | 4 variants × 4 states, all token-bound, Storybook story included |
| TextField | ✅ | node 544:5725 | packages/ui/src/components/TextField/TextField.tsx | 4 states, swappable Lucide icon prop, error banner, clear button |
| SignupForm | ✅ | node 545:11649 | packages/ui/src/components/signup-form/signup-form.tsx | Uses Button + TextField; header/headline/form-body sections; checkbox consent; brandName + URL props; Storybook story included. Updated 2026-05-12: full client-side validation (email, phone, consent); consent error shown in bg-error container with text-on-surface-light text, mt-1 mb-2 spacing. |
| Label | ✅ | node 549:11983 (component set) | packages/ui/src/components/Label/Label.tsx | 2 variants: mobile (rounded-t-lg, full width) and desktop (rounded-br-lg tab shape, fixed width); bg-secondary; bold on-surface-light text |
| OfferCard | ✅ | node 549:11989 | packages/ui/src/components/offer-card/offer-card.tsx | 2 responsive variants (mobile/desktop); uses Label + Button. Mobile: logo LEFT (144×72 container) and offer text RIGHT; desktop: logo LEFT (224×112 actual-logo container), offer+checkmarks MIDDLE, button group RIGHT (256px). Real logo fills available container height with proportional width. Both variants: PLAY NOW (primary) + optional underlined "How To Claim" text CTA uses Button variant="text" color="light". Props: secondaryCtaText + secondaryCtaHref. Updated 2026-05-12: mobile offer headline border changed to bottom-only (border-b outline-variant). Desktop T&Cs full border (outline-variant). |
| WebsiteDirectory | ✅ | node 576:5727 | packages/ui/src/components/WebsiteDirectory/WebsiteDirectory.tsx | title prop + sites array (name + optional href); wrapping 4-col grid; tertiary title color; links activate on href, plain text without; Storybook story included |
| SsmFooter | ✅ | node 576:5828 | packages/ui/src/components/SsmFooter/SsmFooter.tsx | desktop + mobile responsive; nav links (optional hrefs) use 48px mobile rows with 8px top/bottom padding, 4 responsible gambling logos from assets/ssm/footer, legal text; Storybook story included. Figma frames also renamed (Frame 1000004522→nav-bar, Frame 1000004604→nav-inner, Frame 52→legal-text) |
| LogoSection | ✅ | node 583:12161, 583:12512 (desktop) | packages/ui/src/components/logo-section/logo-section.tsx | Responsive header bar. Both breakpoints: invisible spacer LEFT, SSMLogo CENTER, menu button RIGHT (no order swap needed). Mobile (40px): SSMLogo 45×45, tertiary Menu icon 24px. Desktop (72px): SSMLogo 84×84, button reads "Menu" label then icon 32px (text before icon). Background image updated to Lego_Deco2.png. onMenuClick + src props; Storybook story included. Updated 2026-05-12: inner content constrained to max-w-[1440px] mx-auto md:px-16 on desktop to align with offer card grid. |
| USP | ✅ | node 579:10031 | packages/ui/src/components/USP/USP.tsx | responsive: mobile 14px Bold py-1, desktop 24px Heavy py-2; bg-tertiary; tracking -0.019em; Futura PT; updated from Figma 2026-05-05 |
| WelcomeBanner | ✅ | node 579:8164 | packages/ui/src/components/WelcomeBanner/WelcomeBanner.tsx | mobile: images absolutely positioned behind text (83×64, pinned top-left/right, overflow-hidden clips), text in centred frame with py-1, height driven by text; desktop: 57px Heavy title + features row (3 items 24px), coin images 204px absolutely positioned; features prop added |
| TopTCs | ✅ | node 583:12506 | packages/ui/src/components/TopTCs/TopTCs.tsx | surface bg; mobile: py-1 px-4, 11px/13px; desktop: py-2 px-4, 12px/16px; centred white text, tracking 0.4px; text prop; placed in SSM page below WelcomeBanner |
| NavCapsule | ✅ | node 583:12009 | packages/ui/src/components/NavCapsule/NavCapsule.tsx | Pill-shaped nav item; emoji icon left + label right; 3 states: default (no bg, on-surface-light text), hover (surface-container-highest bg, on-surface-dark text), active (tertiary bg, on-surface-dark text); 2 sizes: mobile 272px/16px text, desktop 336px/22px text; emoji + label + href + isActive + fluid props; fluid=true makes capsule fill parent width on desktop (used in NavDrawer); Storybook story included |
| NavDrawer | ✅ | node 583:12034 | packages/ui/src/components/NavDrawer/NavDrawer.tsx | Slide-in navigation drawer from right; mobile=full screen, desktop=422px wide with semi-transparent backdrop; surface bg, 24px padding, 47px bottom; header row with X close button and bottom divider only; 7 NavCapsule items with gap-2; active state auto-determined from passed isActive per item; isOpen + onClose + items props; Storybook story included |
| Checkbox | ✅ | node 593:4761 | packages/ui/src/components/Checkbox/Checkbox.tsx | 4 states: unselected, selected, indeterminate, error; 40×40px touch target, 20×20px inner box (border-2 rounded-[2px]); tokens: tertiary fill + on-surface-light border when checked/indeterminate, surface-container-low + on-surface-light border when unselected, error fill + border in error state; Lucide Check/Minus icons (text-on-surface-light); optional label prop; Storybook story included |
| ConsentForm | ✅ | node 593:4761 + node 593:4948 | packages/ui/src/components/ConsentForm/ConsentForm.tsx | Marketing consent form with expand/collapse chevron; "Keep me informed" main checkbox drives all sub-checkboxes (select-all toggle); indeterminate when some selected; two groups when expanded: "I'm interested in" (Casino, Bingo, Sports Betting, Retail) + "Contact me by" (Email, SMS, Social Messaging); shorter legal text, company = "It's A Good Choice Ltd"; real-time validation from first interaction; 3 error messages: "Please accept our terms" / "Please select what you're interested in" / "Please select how you wish to be contacted"; onChange callback returns interests + contactMethods + isValid; defaultExpanded prop (default true); all text uses on-surface-light (designed for dark backgrounds); Storybook story included |
| HtcUsp | ✅ | node 665:9345 | packages/ui/src/components/htc-usp/htc-usp.tsx | 2 responsive variants (mobile/desktop); navy-to-blue gradient background (hardcoded — no token yet); mobile: vertical stack centered (logo 144×77, 45px bold headline centered, pill row gap-2); desktop: horizontal space-between max-w-[1440px] (logo+headline left, pills stacked right items-end); pills: bg-surface-container-low rounded-full text-on-surface-dark; desktop pills px-6 py-5 text-[22px] font-medium; mobile pills px-6 py-4 text-sm tracking-[0.25px]; props: logoSrc + logoAlt + headline + badges[]; Storybook story included |

---

## Site 1 — SSM (superspillemaskiner.dk)

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| App scaffold | ✅ | — | apps/ssm — runs on localhost:3001 | Next.js 15, Tailwind, data-theme="ssm" wired |
| SSM color tokens | ✅ | LSM-foundation SSM mode — 24 tokens | packages/tokens/index.css (data-theme="ssm") | All 24 tokens verified in sync with Figma. surface-inverse-new added 2026-05-06. |
| SSM mobile page | ✅ | node 581:11385 | apps/ssm/src/app/page.tsx | 6-section layout: SsmNav (LogoSection + NavDrawer) → USP → WelcomeBanner → 4 offer cards + SignupForm → WebsiteDirectory → SsmFooter. Offer cards use 888logo.png placeholder. Casino directory names are placeholder — update when SSM content is ready. |
| SSM desktop layout | ✅ | node 583:12511 | apps/ssm/src/app/page.tsx | Two-tier width system applied: full-bleed (USP, WelcomeBanner, TopTCs, SsmFooter) vs constrained max-w-[1440px] mx-auto (SsmNav, offer cards with px-16 py-4). Desktop: directory + signup form side-by-side 50/50 within 1440px. Mobile: signup form between cards, directory standalone. SsmFooter internal rows already at max-w-[1280px]. |
| How To Claim page | ✅ | node 584:4036 (mobile) + node 583:14784 (desktop) + node 665:9345 (HTC USP) + node 665:9359 (steps) | apps/ssm/src/app/how-to-claim/[slug]/page.tsx + packages/ui/src/components/htc-usp/htc-usp.tsx + packages/ui/src/components/how-to-claim-steps/how-to-claim-steps.tsx | Dynamic route per casino slug. Page now includes HtcUsp from Figma node 665:9345 above the HowToClaimSteps section. HowToClaimSteps from node 665:9359 uses surface-container background, mobile image-first layout, desktop max-w-[1440px] text + right-aligned CTA/image column, CTA full-width on mobile and fixed on desktop. New SSM image copied to public/ssm/howtoclaim/landingpageimage.png. Review body + directory/signup sections remain below. Casino data in apps/ssm/src/data/casinos.ts includes howToTermsText + howToImage fields, reviewIntro + reviewSections[] for desktop. Updated 2026-05-11. |
| Signup landing page | ✅ | node 593:4637 (mobile) + node 634:9331 (desktop) | apps/ssm/src/app/signup/page.tsx | Responsive. Route: /signup. Mobile: SsmNav → USP → mobile.png hero (h-48) → TopTCs instruction → form (Email + Phone TextFields, ConsentForm folded, Sign Me Up primary, Skip For Now text) → TopTCs legal → SsmFooter. Desktop (md+): nav+usp → max-w-[1440px] 2-col grid (desktop.png hero 800px left, instruction+form right 427px p-8) → TopTCs legal → SsmFooter. Images from public/ssm/LandingPage/. Form state shared across breakpoints (single DOM). |
| Signup landing page V2 | ✅ | node 665:5215 (mobile) + node 665:5228 (desktop) | apps/ssm/src/app/signup-v2/page.tsx | Responsive. Route: /signup-v2. SsmNav → USP → hero+form section (background image) → TopTCs → SsmFooter. Background image (landingpage-background.png, transparent PNG): min-width 1440px fixed — clips from sides on screens <1440px, scales up on screens ≥1440px. Hero: "Up to / 250 Free Spins / No Deposit & No Wagering" white centered text (green star badge removed 2026-05-12). Text sizes: mobile 22/45/22px, desktop 32/80/32px. Weights: "Up to" bold both; "250 Free Spins" bold mobile / semibold(600) desktop; "No Deposit & No Wagering" medium mobile / bold desktop. Hero text gap: 0 mobile / 8px desktop. Form: callout (14px regular mobile / 16px bold desktop) + Email + Phone + ConsentForm folded + Sign Me Up + Skip. Sticky CTA: "Sign Me Up" fixed at bottom of mobile screen (IntersectionObserver); disappears when natural button position scrolls into view, does not reappear if user scrolls past. Desktop: hero+form in max-w-[564px] centered column. Nav drawer: "Landing Page V1" (/signup) entry removed from drawer (code kept); V2 remains. Updated 2026-05-12. |
| Contact page | ✅ | node 641:10981 (desktop) | apps/ssm/src/app/kontakt/page.tsx | Route: /kontakt. SsmNav → USP → max-w-[1440px] 2-col grid (title + subtitle left, form right) → WebsiteDirectory → SsmFooter. Form: Navn (TextField), E-mail (TextField), Besked (custom textarea matching TextField style). Button changes to "Din besked er sendt!" + CheckCircle icon on submit (no disabled state — keeps primary green styling). Mobile: single column stacked layout. |
| About Us page | ✅ | node 641:12747 (mobile) + node 641:12740 (desktop) | apps/ssm/src/app/om-os/page.tsx | Route: /om-os. SsmNav → USP → About text section → SsmFooter. Mobile: px-4 py-8, full-width body, 32px title. Desktop: max-w-[1440px] mx-auto px-16 py-12, 45px title, body constrained to md:max-w-[948px]. Multi-paragraph Danish copy (whitespace-pre-line, tracking-[0.5px], on-surface-light). Uses shared legalText from site-content.ts. |

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
| Storybook on Vercel | ✅ | Deployed at lsmstorybook.vercel.app — auto-rebuilds on every push to main. Theme switcher in toolbar lets dev team preview all 6 site themes live. Fixed 2026-05-12: esbuild automatic JSX runtime configured in .storybook/main.ts viteFinal to fix "React is not defined" error caused by import type React. |
| Storybook addon-storysource | ✅ | "Code" tab on every story shows the raw .stories.tsx source so dev team can copy import paths and usage without leaving Storybook. |
| Storybook Foundations — Colors | ✅ | packages/ui/src/foundations/colors.stories.tsx — all 24 color tokens grouped by category (Primary, Secondary, Tertiary, Surface, On Surface, Outline, State). CSS variable name + Tailwind class shown per swatch. Updates live with theme switcher. |
| Storybook Foundations — Typography | ✅ | packages/ui/src/foundations/typography.stories.tsx — full type scale (11px–57px) + 4 font weights. Notes where each style is used in the codebase. |
| Storybook Foundations — Spacing | ⏳ | Not started. Spacing is not yet tokenised — values are Tailwind utilities used directly in components. Needs spacing token definition (with dev manager) before a token page can be built. |
| GitHub repo | ✅ | saaidhassan-max/LSMWebsites — code lives in platform/ |
| Vercel deployments | ✅ | lsmstorybook.vercel.app (Storybook) + lsm-websites.vercel.app (SSM live site). SSM app has its own Vercel project (root: platform/apps/ssm). Fixed 2026-05-12: next.config.ts outputFileTracingRoot corrected to path.join(__dirname, '../../..') (monorepo root, 3 levels up from platform/apps/ssm). |
| Production coding standards | ✅ | Applied 2026-05-08 per dev manager's rules (PUP-Phoenix-staging). Kebab-case folders/files, types in .types.ts files, deep imports (no barrel), explicit return types, import type React, 4-space indentation via Prettier, vitest + smoke tests, ESLint config, site-content.ts centralised data file. Multilayer token rule excluded by user instruction. |

---

## Decisions Log

| Date | Decision | Reason |
|---|---|---|
| 2026-04-30 | Single-layer color tokens (no semantic layer yet) | Agreed with dev team — upgrade in future version |
| 2026-04-30 | Vercel for both Storybook and live site previews | Simpler than adding Chromatic; can add visual regression later |
| 2026-05-08 | Spacing tokens not defined yet | Values are Tailwind utilities in components — needs agreement with dev manager on spacing scale before tokenising |
| 2026-05-08 | Foundations pages use custom story files, not storybook-design-token addon | Addon requires special comments on every CSS line; custom pages are simpler and keep token file clean |
| 2026-04-30 | SSM is the first site to build | Existing Figma page: "SSM design - dev" |
| 2026-04-30 | 6 sites total | Added SSM (superspillemaskiner.dk) — was missing from original brief |
