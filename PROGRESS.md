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
| Token system | ✅ | LSM-foundation (ontario + SSM + sfb modes) | packages/tokens/index.css | Color vars per site, spacing + radius shared. primary-text added for text CTA colour; SSM value #1D8E1D. SSM tertiary updated 2026-05-11: #FF002A / hover #EB0027 / focused #DB0024. SFB (bingo) tokens updated 2026-05-13 from Figma sfb mode: primary #52DD00, tertiary #FF33FF / hover #E52EE5 / focused #DB2CDB, on-primary #121212, on-surface-dark #040A00. accent-red (#FF0000) + accent-orange (#FF9000) added 2026-05-14 — shared across all 6 sites. |
| Tailwind config | ✅ | — | packages/ui/src/globals.css (CSS-first @theme inline) | Migrated to Tailwind 4. tailwind.config.ts deleted. All tokens declared in @theme inline blocks in globals.css per package/app. @tailwindcss/postcss replaces autoprefixer. cn() utility added at packages/ui/src/lib/generic/cn.ts. Updated 2026-05-20. |
| Button | ✅ | node 544:5660 / node 962-5406 | packages/ui/src/components/button/button.tsx | 4 variants × 4 states, all token-bound, Storybook story included. Updated 2026-05-26: secondary variant text changed from text-on-primary to text-on-surface-light (white on blue). |
| TextField | ✅ | node 544:5725 | packages/ui/src/components/TextField/TextField.tsx | 4 states, swappable Lucide icon prop, error banner, clear button |
| SignupForm | ✅ | node 545:11649 | packages/ui/src/components/signup-form/signup-form.tsx | Uses Button + TextField; header/headline/form-body sections; checkbox consent; brandName + URL props; Storybook story included. Updated 2026-05-12: full client-side validation (email, phone, consent); consent error shown in bg-error container with text-on-surface-light text, mt-1 mb-2 spacing. Updated 2026-05-26 (node 410:7854): header bg → bg-on-surface-dark, headline text → text-on-surface-dark, form body → bg-outline, CTA button → variant="secondary". |
| Label | ✅ | node 708:20606 (component set) | packages/ui/src/components/Label/Label.tsx | 2 variants × 3 colors (blue/red/orange). mobile: rounded-t-lg; desktop: rounded-br-lg. Colors: blue=bg-secondary, red=bg-accent-red, orange=bg-accent-orange. Text always on-surface-light bold. color prop defaults to blue. Updated 2026-05-14. |
| OfferCard | ✅ | node 549:11989 | packages/ui/src/components/offer-card/offer-card.tsx | 2 responsive variants (mobile/desktop); uses Label + Button. Mobile: logo LEFT (144×72 container) and offer text RIGHT; desktop: logo LEFT (224×112 actual-logo container), offer+checkmarks MIDDLE, button group RIGHT (256px). Real logo fills available container height with proportional width. Both variants: PLAY NOW (primary) + optional underlined "How To Claim" text CTA uses Button variant="text" color="light". Props: secondaryCtaText + secondaryCtaHref. Updated 2026-05-12: mobile offer headline border changed to bottom-only (border-b outline-variant). Desktop T&Cs full border (outline-variant). Updated 2026-05-21: labelColor prop (LabelColor type) added — passes color to both mobile and desktop Label instances. SFB uses orange for first card, red for remaining cards. |
| WebsiteDirectory | ✅ | node 576:5727 | packages/ui/src/components/WebsiteDirectory/WebsiteDirectory.tsx | title prop + sites array (name + optional href); wrapping 4-col grid; tertiary title color; links activate on href, plain text without; Storybook story included |
| SsmFooter | ✅ | node 576:5828 | packages/ui/src/components/SsmFooter/SsmFooter.tsx | desktop + mobile responsive; nav links (optional hrefs) use 48px mobile rows with 8px top/bottom padding, 4 responsible gambling logos from assets/ssm/footer, legal text; Storybook story included. Figma frames also renamed (Frame 1000004522→nav-bar, Frame 1000004604→nav-inner, Frame 52→legal-text) |
| LogoSection | ✅ | node 583:12161, 583:12512 (desktop) | packages/ui/src/components/logo-section/logo-section.tsx | Responsive header bar. Both breakpoints: invisible spacer LEFT, SSMLogo CENTER, menu button RIGHT (no order swap needed). Mobile (40px): SSMLogo 45×45, tertiary Menu icon 24px. Desktop (72px): SSMLogo 84×84, button reads "Menu" label then icon 32px (text before icon). Background image updated to Lego_Deco2.png. onMenuClick + src props; Storybook story included. Updated 2026-05-12: inner content constrained to max-w-[1440px] mx-auto md:px-16 on desktop to align with offer card grid. Updated 2026-05-21: logoHref prop (optional) — wraps logo image in an <a> tag linking to logoHref. SSM and SFB navs both pass logoHref="/" so clicking the logo navigates home. Updated 2026-05-22: logoDesktopSrc prop (optional) — when provided, logoSrc is shown at mobile only (md:hidden) and logoDesktopSrc is shown at desktop only (hidden md:block). Sizes: mobile 44×44, desktop 204×84. SSM unaffected (no logoDesktopSrc). |
| USP | ✅ | node 579:10031 (SSM) / node 708:20799 (SFB) / node 962:6600 (SFSG) | packages/ui/src/components/usp/usp.tsx | variant prop added 2026-05-21. variant="ssm": Futura PT Heavy 900, tracking -0.019em, desktop leading-[28px]. variant="default" (all other sites): Helvetica Neue Bold 700, tracking 0.1px mobile / 0 desktop, desktop leading-8. All SSM pages pass variant="ssm". Updated 2026-05-26: text color changed to text-on-surface-dark on both variants (was text-on-surface-light). |
| WelcomeBanner | ✅ | node 708:20804 | packages/ui/src/components/welcome-banner/welcome-banner.tsx | Updated 2026-05-21. mobile: inline flex row (h-16), left image 83px, right image 92px, text fills center. desktop: inline flex row items-start, left image 204×157, right image 225×157 (fixed height — does not stretch), center content py-6 gap-6. textHighlight prop (optional) renders in text-tertiary before main text in text-on-surface-light. features prop renders as 24px Heavy row on desktop only. Layout uses items-start so images pin to top edge (no gap below USP). |
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
| SSM mobile page | ✅ | node 581:11385 | apps/ssm/src/app/page.tsx | 6-section layout: SsmNav (LogoSection + NavDrawer) → USP → WelcomeBanner → 4 offer cards + SignupForm → WebsiteDirectory → SsmFooter. Offer cards use 888logo.png placeholder. Casino directory names are placeholder — update when SSM content is ready. Updated 2026-05-21: WelcomeBanner uses textHighlight="TOP" text=" BINGO DEALS 2026", features updated to ⭐ Super Offers / ✅ Super Simple / 🛡️ Super Secure. New bingo ball images in /ssm/welcome/. Logo links to / via logoHref prop. |
| SSM desktop layout | ✅ | node 583:12511 | apps/ssm/src/app/page.tsx | Two-tier width system applied: full-bleed (USP, WelcomeBanner, TopTCs, SsmFooter) vs constrained max-w-[1440px] mx-auto (SsmNav, offer cards with px-16 py-4). Desktop: directory + signup form side-by-side 50/50 within 1440px. Mobile: signup form between cards, directory standalone. SsmFooter internal rows already at max-w-[1280px]. |
| How To Claim page | ✅ | node 584:4036 (mobile) + node 583:14784 (desktop) + node 665:9345 (HTC USP) + node 665:9359 (steps) | apps/ssm/src/app/how-to-claim/[slug]/page.tsx + packages/ui/src/components/htc-usp/htc-usp.tsx + packages/ui/src/components/how-to-claim-steps/how-to-claim-steps.tsx | Dynamic route per casino slug. Page now includes HtcUsp from Figma node 665:9345 above the HowToClaimSteps section. HowToClaimSteps from node 665:9359 uses surface-container background, mobile image-first layout, desktop max-w-[1440px] text + right-aligned CTA/image column, CTA full-width on mobile and fixed on desktop. New SSM image copied to public/ssm/howtoclaim/landingpageimage.png. Review body + directory/signup sections remain below. Casino data in apps/ssm/src/data/casinos.ts includes howToTermsText + howToImage fields, reviewIntro + reviewSections[] for desktop. Updated 2026-05-11. |
| Signup landing page | ✅ | node 593:4637 (mobile) + node 634:9331 (desktop) | apps/ssm/src/app/signup/page.tsx | Responsive. Route: /signup. Mobile: SsmNav → USP → mobile.png hero (h-48) → TopTCs instruction → form (Email + Phone TextFields, ConsentForm folded, Sign Me Up primary, Skip For Now text) → TopTCs legal → SsmFooter. Desktop (md+): nav+usp → max-w-[1440px] 2-col grid (desktop.png hero 800px left, instruction+form right 427px p-8) → TopTCs legal → SsmFooter. Images from public/ssm/LandingPage/. Form state shared across breakpoints (single DOM). |
| Signup landing page V2 | ✅ | node 665:5215 (mobile) + node 665:5228 (desktop) | apps/ssm/src/app/signup-v2/page.tsx | Responsive. Route: /signup-v2. SsmNav → USP → hero+form section (background image) → TopTCs → SsmFooter. Background image (landingpage-background.png, transparent PNG): min-width 1440px fixed — clips from sides on screens <1440px, scales up on screens ≥1440px. Hero: "Up to / 250 Free Spins / No Deposit & No Wagering" white centered text (green star badge removed 2026-05-12). Text sizes: mobile 22/45/22px, desktop 32/80/32px. Weights: "Up to" bold both; "250 Free Spins" bold mobile / semibold(600) desktop; "No Deposit & No Wagering" medium mobile / bold desktop. Hero text gap: 0 mobile / 8px desktop. Form: callout (14px regular mobile / 16px bold desktop) + Email + Phone + ConsentForm folded + Sign Me Up + Skip. Sticky CTA: "Sign Me Up" fixed at bottom of mobile screen (IntersectionObserver); disappears when natural button position scrolls into view, does not reappear if user scrolls past. Desktop: hero+form in max-w-[564px] centered column. Nav drawer: "Landing Page V1" (/signup) entry removed from drawer (code kept); V2 remains. Updated 2026-05-12. |
| Contact page | ✅ | node 641:10981 (desktop) | apps/ssm/src/app/kontakt/page.tsx | Route: /kontakt. SsmNav → USP → max-w-[1440px] 2-col grid (title + subtitle left, form right) → WebsiteDirectory → SsmFooter. Form: Navn (TextField), E-mail (TextField), Besked (custom textarea matching TextField style). Button changes to "Din besked er sendt!" + CheckCircle icon on submit (no disabled state — keeps primary green styling). Mobile: single column stacked layout. |
| About Us page | ✅ | node 641:12747 (mobile) + node 641:12740 (desktop) | apps/ssm/src/app/om-os/page.tsx | Route: /om-os. SsmNav → USP → About text section → SsmFooter. Mobile: px-4 py-8, full-width body, 32px title. Desktop: max-w-[1440px] mx-auto px-16 py-12, 45px title, body constrained to md:max-w-[948px]. Multi-paragraph Danish copy (whitespace-pre-line, tracking-[0.5px], on-surface-light). Uses shared legalText from site-content.ts. |

---

## Site 2 — SFB (Super Free Bingo)

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| SFB color tokens | ✅ | LSM-foundation sfb mode | packages/tokens/index.css (data-theme="bingo") | All 25 tokens set from Figma. Unique to SFB: primary #52DD00, tertiary #FF33FF / hover #E52EE5 / focused #DB2CDB. accent-red + accent-orange added 2026-05-14 (shared across all sites). |
| App scaffold | ✅ | — | apps/sfb — runs on localhost:3002 | Next.js 15, Tailwind, data-theme="bingo" wired. |
| SfbFooter | ✅ | node 708:20706 | packages/ui/src/components/sfb-footer/sfb-footer.tsx | 5 nav links (Privacy Policy /privacy-policy, Terms /terms, About Us /about, Disclaimer /disclaimer, Contact Us /contact). 6 responsible gambling logos in 2×3 grid desktop / single-col mobile (keepitfun, 18plus, gamcare, gamstop, gambleaware, gamblingtherapy SVGs from /sfb/footer/). Legal text from Figma. bg-surface, outline border, on-surface-light text. Storybook story included. SVGs to be placed in platform/apps/sfb/public/sfb/footer/ — updated 2026-05-18. |
| SFB logo | ✅ | node 708:20955 | apps/sfb/public/sfb/logo-mobile.svg + logo-desktop.svg | Updated 2026-05-22: two logos — logo-mobile.svg (44×44 square) for mobile, logo-desktop.svg (204×84 wide) for desktop. sfb-nav passes logoSrc="/sfb/logo-mobile.svg" logoDesktopSrc="/sfb/logo-desktop.svg". |
| SFB home page | ✅ | node 898:4984 | apps/sfb/src/app/page.tsx | SfbNav → USP → WelcomeBanner → TopTCs → offer cards + operator banner (after card 2) + signup form → directory → SfbFooter. OperatorBanner uses mobileSrc + desktopSrc props. Banner images to be placed at /sfb/banners/operator-banner-mobile.jpg and operator-banner-desktop.jpg. Updated 2026-05-21: WelcomeBanner uses textHighlight="TOP" text=" BINGO DEALS 2026" + new bingo ball images from /sfb/welcome-images/. OfferCard label colors: card 1 = orange, cards 2–4 = red. |
| OperatorBanner | ✅ | node 884:12877 | packages/ui/src/components/operator-banner/operator-banner.tsx | Full-width image ad between offer cards 2 and 3. Separate mobileSrc + desktopSrc props shown at their respective breakpoints. Optional href wraps in link. |
| SFB contact page | ✅ | node 885:13836 | apps/sfb/src/app/contact/page.tsx | Route /contact. SfbNav → USP → 2-col desktop (title left, form right) → Bingo Directory → SfbFooter. English fields: Name, Email, Message. Send button → "Message sent!" on submit. |
| SFB about page | ✅ | node 888:13919 | apps/sfb/src/app/about/page.tsx | Route /about. SfbNav → USP → tertiary title → body text (placeholder from Figma) → SfbFooter. User to update copy. |
| SFB privacy policy | ✅ | — | apps/sfb/src/app/privacy-policy/page.tsx | Route /privacy-policy. Same format as About Us. Placeholder content — user to update. |
| SFB terms | ✅ | — | apps/sfb/src/app/terms/page.tsx | Route /terms. Same format as About Us. Placeholder content — user to update. |
| SFB disclaimer | ✅ | — | apps/sfb/src/app/disclaimer/page.tsx | Route /disclaimer. Same format as About Us. Placeholder content — user to update. |
| SFB How To Claim | ✅ | node 888:13941 | apps/sfb/src/app/how-to-claim/[slug]/page.tsx | Dynamic route per bingo slug. Same structure as SSM: HtcUsp → HowToClaimSteps → review body (mobile) / 2-col review sections (desktop) → Bingo Directory + SignupForm → SfbFooter. Casino data in apps/sfb/src/data/casinos.ts with one placeholder entry (888ladies). Review section headings use text-tertiary (magenta for SFB). Updated 2026-05-21: howToImageSrc for 888ladies updated from placeholder to /sfb/howtoclaim/landingpageimage.png (copied from SSM image). |
| SFB landing page | ✅ | node 888:13920 | apps/sfb/src/app/signup/page.tsx | Fixed: was importing SsmFooter, now correctly uses SfbFooter. Hero: "500 Free Tickets / No Deposit & No Wagering". |
| SFB safer gambling | ✅ | — | apps/sfb/src/app/safer-gambling/page.tsx | Route /safer-gambling. Adapted from SFSG. SfbNav → USP → intro+3-item right column → RG logos → 10 tips → self-assessment → 4 block/unsubscribe panels → external support → SfbFooter. External support uses UK orgs (GamCare, BeGambleAware, GamStop, Gambling Therapy, National Helpline). 🛡️ Safer Gambling added to SfbNav drawer. Added 2026-05-26. |

---

## Site 3 — SFSG (Super Free Slot Games)

| Screen / Feature | Status | Figma | Code | Notes |
|---|---|---|---|---|
| SFSG color tokens | ✅ | LSM-foundation sfsg mode (Figma mode id 962:0) | packages/tokens/index.css (data-theme="slots") | 25 tokens. Unique to SFSG: tertiary #7CFF01 / hover #81EE35 / focused #6DDE0F. Primary #52DD00 (same as SSM/SFB). Updated 2026-05-26 from Figma — previous placeholder had ontario colors. |
| App scaffold | ✅ | — | apps/sfsg — runs on localhost:3003 | Next.js 15, Tailwind, data-theme="slots" wired. dev:sfsg + build:sfsg scripts in root package.json. |
| SfsgFooter | ✅ | node 962:6297 | packages/ui/src/components/sfsg-footer/sfsg-footer.tsx | 4 nav links (Privacy Policy, Terms, About Us, Contact Us — Disclaimer removed per Figma 2026-05-26). 6 responsible gambling logos (2×3 grid desktop / stacked mobile). bg-surface, outline border, on-surface-light text. legalText prop. SVGs from /sfsg/footer/. |
| SFSG home page | ✅ | — | apps/sfsg/src/app/page.tsx | SfsgNav → USP → WelcomeBanner → TopTCs → 8 offer cards + SignupForm → WebsiteDirectory + SignupForm (desktop) → SfsgFooter. |
| SFSG how-to-claim | ✅ | node 962:7730 | apps/sfsg/src/app/how-to-claim/[slug]/page.tsx | SfsgNav → USP → HtcUsp → HowToClaimSteps → review body (mobile) / 2-col review sections (desktop) → "Super Free Slot Games Directory" + SignupForm → SfsgFooter. |
| SFSG contact page | ✅ | node 962:7640 | apps/sfsg/src/app/contact/page.tsx | SfsgNav → USP → 2-col desktop form → "Super Free Slot Games Directory" → SfsgFooter. |
| SFSG about page | ✅ | node 962:7676 | apps/sfsg/src/app/about/page.tsx | SfsgNav → USP → tertiary h1 → on-surface-light body → SfsgFooter. Same pattern as SFB. |
| SFSG privacy policy | ✅ | node 962:7676 | apps/sfsg/src/app/privacy-policy/page.tsx | Same format as About Us. |
| SFSG terms | ✅ | node 962:7676 | apps/sfsg/src/app/terms/page.tsx | Same format as About Us. |
| SFSG disclaimer | ✅ | node 962:7676 | apps/sfsg/src/app/disclaimer/page.tsx | Same format as About Us. |
| SFSG signup page | ✅ | — | apps/sfsg/src/app/signup/page.tsx | Mirrors SFB signup. "500 Free Spins / No Deposit & No Wagering". SfsgNav + SfsgFooter. |
| SFSG safer gambling | ✅ | node 968:22338 (desktop) + 972:25597 (mobile) | apps/sfsg/src/app/safer-gambling/page.tsx | Full page: SfsgNav → USP → hero (h1 tertiary, intro text + 3-item link list 2-col desktop, RG logos 6-col desktop / 2-col mobile) → 10 tips (2-col cards, bg-on-surface-light, tertiary number bubbles) → self-assessment (tertiary button) → 2×2 grid of copy-blocks (Block Transactions | Limit Social Media / Unsubscribe | Block Access + 6 primary buttons) → external support 2-col cards → SfsgFooter. Reachable via 🛡️ Safer Gambling in nav drawer. Updated 2026-05-26: desktop intro row fixed — right column pinned to md:w-[303px] matching Figma HUG width; left column gains min-w-0 for correct flex wrapping. 3 right-column items numbered (1-, 2-, 3-). |

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
| Storybook Foundations — Spacing | ✅ | packages/ui/src/foundations/spacing.stories.tsx — Tailwind 4 built-in scale (1 unit = 4px). No custom tokens needed. Shows all values used in the project with usedIn context. |
| GitHub repo | ✅ | saaidhassan-max/LSMWebsites — code lives in platform/ |
| Vercel deployments | ✅ | lsmstorybook.vercel.app (Storybook) + lsm-websites.vercel.app (SSM live site). SSM app has its own Vercel project (root: platform/apps/ssm). Fixed 2026-05-12: next.config.ts outputFileTracingRoot corrected to path.join(__dirname, '../../..') (monorepo root, 3 levels up from platform/apps/ssm). |
| Production coding standards | ✅ | Applied 2026-05-08 per dev manager's rules (PUP-Phoenix-staging). Kebab-case folders/files, types in .types.ts files, deep imports (no barrel), explicit return types, import type React, 4-space indentation via Prettier, vitest + smoke tests, ESLint config, site-content.ts centralised data file. Multilayer token rule excluded by user instruction. |

---

## Decisions Log

| Date | Decision | Reason |
|---|---|---|
| 2026-04-30 | Single-layer color tokens (no semantic layer yet) | Agreed with dev team — upgrade in future version |
| 2026-04-30 | Vercel for both Storybook and live site previews | Simpler than adding Chromatic; can add visual regression later |
| 2026-05-26 | Spacing tokens not needed | Tailwind 4 built-in scale (1 unit = 4px) covers all project spacing. No custom tokens required. Storybook Foundations page added to document the scale. |
| 2026-05-08 | Foundations pages use custom story files, not storybook-design-token addon | Addon requires special comments on every CSS line; custom pages are simpler and keep token file clean |
| 2026-04-30 | SSM is the first site to build | Existing Figma page: "SSM design - dev" |
| 2026-04-30 | 6 sites total | Added SSM (superspillemaskiner.dk) — was missing from original brief |
