# SFBets Casino-Bonus Home — Concept & Prototype

**Status:** Working front-end prototype (self-contained HTML). NOT yet built in the real app.
**Owner of concept:** founder (non-technical). **Next builder:** Claude / Codex.
**Last updated:** 2026-07-15.

This document is a full handoff. Read it top to bottom before touching the prototype. It captures the concept, every feature and the UX reasoning behind it, the current build, what is real vs placeholder, the full decision history (so you don't re-open settled questions), and how to take it to production.

**Claude continuation note:** this is the canonical handoff for the current SFBets casino-bonus concept. The founder has been iterating live in the browser and wants future work to continue from this exact state, not restart from earlier comparison-table or generic-list ideas.

---

## 1. What this is

A redesigned **home page concept for the SFBets site** (Super Free Bets MI), reimagined as a clean, mobile-first **casino-bonus offers catalogue**. It was built as a fast, throwaway-quality-but-polished prototype to pressure-test a set of UX ideas with the founder and, later, leadership. It is a single self-contained HTML file (vanilla JS, no framework, no build step).

The prototype is the source of truth for the *concept*. The eventual goal is to rebuild the validated parts in the real Next.js app using `@lsm/ui` components (see §11).

### Files & links
- **Prototype source (in repo):** `platform/docs/concepts/sfbets-casino-bonus-home/prototype.html`
  - This is the authoring copy. It is written as an Artifact-style fragment: it starts with `<title>` + `<style>` (no `<!doctype>`/`<html>`/`<head>`/`<body>`). To host it standalone you must wrap it — see §12.
- **Live public demo (Vercel):** https://sfbets-deploy.vercel.app
  - Stable production alias — always points to the latest deploy. Publicly reachable (deployment protection disabled). Works on any device/account, no login.
  - Latest verified cache-busted review URL from this session: https://sfbets-deploy.vercel.app/?verify=1784133300
- **Reference framework:** "UX Strategy System — Complete Reference.html" — a UX methodology doc the founder supplied (lives in their local Downloads, not in the repo). The concept leans on its Relationship Arc, UX Laws (Peak-End, Zeigarnik, Von Restorff, Hick's), and flow friction rules. You don't need the file to continue, but the annotations in the prototype cite these laws.

---

## 1A. Current live state for Claude

This is what the founder currently expects to see on the live demo:

- Mobile-first casino-bonus home with Material 3 vibrant colour roles from `hyposysthis site/m3-tokens.json`; gold accents are intentionally retained for ratings, New labels, and rationale/demo affordances.
- Green hierarchy rule: solid primary is reserved for high-emphasis actions and true selection badges. Tonal/supporting green surfaces use transparent primary overlays plus primary-tonal strokes so they stay visibly below the main CTA.
- Manual light/dark toggle in the sticky trust bar. It persists to `localStorage` and falls back to system preference, then light if system preference is unavailable.
- Sticky trust bar with brand, MGCB/licensed signals, 21+, compact search icon, and the light/dark toggle. On mobile, secondary trust text collapses and the theme toggle becomes icon-only to avoid horizontal overflow.
- Search expands from the header and searches casino names, offer mechanics, bonus text, and terms. It has a visible UX rationale callout when "Show UX rationale" is on.
- Intro is intentionally short. Do not turn it into a large hero.
- Quick match row replaces old filter chips + sort controls.
- Offer cards show a large bonus headline, operator monogram tile, smaller rating, comparison facts, CTA, and always-visible T&Cs. Cards can use an optional small `valuePrefix` line above the main value for lower-importance setup copy like "Win up to" or "Play $5, get"; the large type is reserved for the actual offer value.
- Best-choice card is dynamic: it is always the first card in the active filtered/searched/sorted list.
- Best-choice reason is hidden behind the small "Why?" control. Do not make it permanently visible unless the founder asks.
- "Compare shortlisted offers" is subtle and collapsed by default. It is a feature, not the homepage's main model.
- Beginner sticky pick appears only after the third rendered card has passed. It sits above the "Show UX rationale" button in the demo and includes full visible terms, not a terms toggle.
- "Show UX rationale" is a pitch/demo feature only. It should not ship to production.

Latest live alias target after the last deploy in this session:

```text
sfbets-deploy.vercel.app -> sfbets-deploy-build-rcrbnenmn-saaidhassan-maxs-projects.vercel.app
```

Important local state:

- The latest prototype/docs edits are local and deployed to Vercel, but not necessarily committed/pushed to GitHub.
- `platform/apps/cms/tsconfig.tsbuildinfo` and `platform/apps/sfb/tsconfig.tsbuildinfo` are unrelated modified build-cache files. Do not include them in a concept commit unless the founder explicitly asks for all changes.
- Earlier GitHub push failed because credentials/token were invalid. The live Vercel link is current; GitHub may not be.

---

## 2. Business context & primary user

**Business model (critical to every design decision):** SFBets is an **affiliate** site. Revenue = **CPA per operator** when a *new player* signs up at a casino through our link. "New player" **resets per casino**, so one visitor can generate a fresh payout at casino after casino. Therefore the money is in **repeat claiming across many casinos** and **returning** for newly-added ones.

**Site scope correction (important):** despite the "Bets" name, **SFBets MI is a casino-bonus site — house money, free spins, deposit matches. NO sports betting.** Do not add sportsbook framing.

**Market:** Michigan, USA. Regulated → 21+, MGCB licensing, 1-800-GAMBLER responsible-gambling messaging are mandatory trust elements.

**Primary user (the concept commits to ONE):** the **bonus hunter / value-seeker** — someone who deliberately claims no-deposit/free-spin/match offers across as many casinos as possible. Every layout and sort choice optimises for them. (Secondary users — nervous first-timers, returning deal-checkers — are served but never win a conflict.)

### User modes this design now supports

The founder's working model is that a user who keeps scrolling is usually in one of two modes:

1. **Specific seeker** — knows what they want and is trying to find it.
   - Examples: "BetMGM", "no wagering", "no deposit", "free spins", "lowest deposit", "compare these."
   - Served by: top-bar search, quick match, comparison section, visible wagering/min-deposit/expiry facts.
2. **Uncertain beginner** — interested but not confident enough to claim yet.
   - Questions: "Which one is safe?", "Do I need to deposit?", "What does wagering mean?", "What happens when I click claim?"
   - Served by: Best-choice card, hidden "Why?" explanation, how-to section, and the beginner sticky pick after card three.

Do **not** solve the beginner mode by adding more controls. Add reassurance, plain-language explanation, or one safe next step.

### Comparison-site pressure

The Head of Product/Product Owner is interested in changing the experience from a list-oriented offer page into a full comparison site with filters, checkboxes, sliders, and comparison grids as the core journey. The founder's counter-proposal is:

- Improve the offer-list experience first.
- Keep comparison available but secondary and subtle.
- Measure whether users actually open/use comparison.
- If comparison engagement is strong, then expand it into a fuller comparison product.

Expected directional outcome (not a guarantee): the new approach may improve qualified engagement/conversion metrics by roughly **10-30%** depending on traffic quality and downstream tracking, but should be validated with a mobile-first A/B test. Do not present this estimate as proven.

---

## 3. The concept — page structure (top to bottom)

1. **Slim sticky trust bar** — brand wordmark + MGCB licensed / Michigan only / 21+ + compact expandable search.
2. **Compact intro** — one headline ("Claim casino bonuses — house money & free spins") + a "How claiming works ↓" link that smooth-scrolls to the how-to section. Deliberately small — the offers are the centrepiece, not a hero.
3. **Inline freshness / trust proof** — "Offers checked today" lives in the sticky trust bar on wider screens, with quiet per-card "Terms checked" metadata in the terms area. No separate top block, so offers stay high on the page.
4. **Sticky quick match toolbar** — one intent row that combines filter + sort behavior into plain-language choices.
5. **Offer cards grid** — 1 column mobile, 2 columns ≥720px. The #1 card is the dynamic "Best choice".
6. **Subtle comparison utility** — secondary link + collapsed section after the offer cards. Mobile shows stacked comparison cards first; desktop can show a matrix. It compares the current filtered/sorted shortlist rather than becoming the homepage.
7. **Beginner sticky pick** — after the user passes the third card, a compact bottom mini-card recommends the safest beginner offer with full terms available in-place.
8. **"How claiming works" section** — one 3-step explainer the whole page shares (scroll target).
9. **"Get new bonuses first" notify** — single email field (the retention/return hook).
10. **Footer** — legal / RG.
11. **Floating "Show UX rationale" button** — toggles contextual annotations beside each element (pitch/demo aid; would be removed or feature-flagged in production).

### Important placement details

- Search is in the top sticky trust bar, not in the main toolbar, so it supports brand lookup without making the page feel like a form.
- The search rationale callout appears next to the search button when UX rationale mode is on. It hides when the search panel opens.
- The beginner sticky pick is intentionally **below the content hierarchy but above the UX-rationale button** in the demo so leadership can see it.
- The beginner sticky pick terms are **always visible**, not hidden behind a click.
- The comparison section sits after the cards, not above them. This protects the main mobile conversion path.

---

## 4. Feature inventory + UX rationale

Every feature and *why* it exists. The prototype shows these rationales inline when "Show UX rationale" is on (annotations are placed **beside the element they describe**, not stacked).

| Feature | What it does | UX rationale (law) | Serves |
|---|---|---|---|
| **Quick match control** | Replaces separate filter + sort controls with one intent row: Best overall / No deposit / Free spins / Easiest terms / Biggest bonus. Each option maps to the existing filter/sort logic underneath. | Lower-confidence users choose what they want in plain language instead of understanding two control systems. This is an active experiment: clearer, but visually taller than the old chip + sort row. | Hunters / first-timers |
| **Top-bar search** | Compact search icon in the sticky trust bar. Expands into "Search casinos or offers" and filters the current list/comparison by operator name, offer mechanics, bonus copy, and terms text. | With ~20-30 offers, some users arrive looking for a known casino or phrase like "no wagering." Search supports brand lookup without replacing quick match as the main guided path or permanently pushing cards down on mobile. | Brand-aware hunters |
| **Dynamic "Best choice" card** | The **#1 card in the current view** is always pinned on top and styled (green border + "★ Best choice" pill). It **changes** as you filter/sort. | Hick's Law — one confident pick removes choice paralysis for the undecided. | First-timers |
| **Inline freshness / trust proof** | "Offers checked today" appears in the existing sticky trust bar on wider screens. Each card has a quiet "Terms checked Jul 15" line in its terms area. | Trust is a system, not a repeating badge. A separate top block pushed offers down, so freshness moved into existing surfaces. If every card has a "Verified" badge, it becomes invisible; if only some have one, the others look unsafe. | All |
| **Editorial rating** | Per-casino score (e.g. 4.8) + half-star rendering, top-right of each card. | Honest, consistent authority signal + the axis "Top rated" sorts by. Ratings **vary** on purpose (an all-5★ affiliate site reads as fake). | All |
| **Claim-count social proof** | On the Best-choice card only: "N people claimed this offer this month". | Social proof — makes the top pick feel popular/safe; nudges undecided users. | First-timers |
| **Comparison boxes** | Per card: **Wagering · Min deposit · Expires** as a 3-cell strip. "None"/low = green, high wagering = gold. | The **real decision variables** hunters compare, surfaced instead of buried in T&Cs. Also power the sorts. | Hunters |
| **Subtle comparison utility** | A secondary "Compare shortlisted offers" link opens a collapsed compare section after the cards. Mobile renders stacked compare cards; desktop renders a side-by-side matrix. It uses the current filter/sort's top offers. | Satisfies the comparison-site request without turning the homepage into a spreadsheet. Uses progressive disclosure: available to everyone, but only users actively looking for side-by-side detail will open it. | Hunters / detail-checkers |
| **Beginner sticky pick** | Compact bottom mini-card appears after the user scrolls past the third card. Recommends the safest beginner offer, with claim CTA, dismiss button, and full terms visible in the card. | A user still scrolling after the first few offers may be unsure, not just researching. This gives one low-friction next step without changing the primary card list. Terms stay visible for compliance. | Beginners / unsure users |
| **Attribute pills** | Green pills echoing the offer's mechanics (No deposit, Free spins…). | Fast scannability / reinforce the active filter. | All |
| **Always-visible T&Cs** | Full terms shown in every card, **below the Claim Now CTA**. Never hidden behind a click. | Trust + regulatory clarity. Explicit founder requirement. | All |
| **Claim Now CTA** | Primary green button per card. (Demo: not wired to a real destination.) | The single primary action per card. | All |
| **"How claiming works" section** | One shared 3-step explainer, steps named by user intent ("Your bonus lands"). Scroll target from the intro link. | Guided explainer converts first-timers; keeping it in ONE place keeps cards clean (replaced the old per-card "How to claim" button). | First-timers |
| **Notify (email capture)** | Single email field + confirmation. | The "Return" layer of the relationship arc — turns a passive checker into a re-engageable subscriber → repeat CPAs. Kept to 1 field (friction cap). | Deal-checkers |
| **"New" badge** | Casinos added ≤3 days (`days<=3`) get a gold "★ New" pill (unless they're the Best choice, which wins the top slot). | Von Restorff (isolation) — freshness is what pulls hunters back. | Hunters |
| **Show UX rationale toggle** | Reveals the annotations. | Demo/pitch aid only. Not a production feature. | (internal) |

---

## 5. Design system used in the prototype

All values are CSS custom properties on `:root`. **This is a bespoke dark "casino floor" palette for the prototype — it is NOT the real SFBets `data-theme="bets"` token set.** When porting, map these intents onto the real tokens (see §11), don't copy the hexes.

**Color (intent → prototype hex):**
- ground `#0A0D12`, panel `#121722`, panel-2 `#1A2130`, panel-3 `#212A3A`
- line `#232C3B`, line-2 `#2E3A4D`
- **green (primary/accent/CTA)** `#3DDC84`, green-deep `#1F9E56`, green-ink (text on green) `#052012`
- **gold (rating stars, annotations, "New")** `#FFC24B`
- red (low-score meter, unused now) `#FF6B57`
- text `#EEF2F7`, muted `#9AA7B8`, muted-2 `#6B7889`

Semantic color (green = good / gold = caution on the comparison boxes) is intentionally separate from decorative use.

**Typography:** `--font-display` = `"Arial Black", "Helvetica Neue", system-ui` (uppercase, heavy, tight tracking — bingo-hall/casino punch); `--font-body` = system sans. No web fonts (kept the file self-contained / no CDN). `font-variant-numeric: tabular-nums` on all counts/ratings/values.

**Layout:** mobile-first. Base styles target narrow screens; `@media (min-width: …)` blocks *enhance* (cards 1→2 col at 720px; toolbar stacks→row at 760px; how-to steps 1→3 col at 700px). Max content width 1080px. Radii 11–18px. Sticky trust bar (top:0) + sticky toolbar (top:50px).

---

## 6. Data model (prototype `OFFERS` array)

9 hardcoded casinos. Each object:

```
{
  id, name, tag, mono, monobg,          // identity + monogram tile colour
  value (HTML), plus,                    // bonus headline + subline
  rating,                                // editorial score (number, e.g. 4.8)
  attrs: [ "nodeposit"|"freespins"|"nowagering"|"match" ],  // drives filters + pills
  days,                                  // "added N days ago" → New badge + Newest sort
  best,                                  // legacy/unused (Best choice is now dynamic = list[0])
  bonusVal,                              // approx $ value → "Highest bonus" sort
  wagerTxt, wagerNum,                    // display + numeric (0 = none) → box + "Lowest wagering" sort
  depTxt, depNum,                        // display + numeric → box
  expTxt,                                // expiry display → box
  terms                                  // full T&Cs string
}
```

Separate `CLAIMERS` map (id → number) feeds the social-proof label. `ATTR_LABEL` maps attr keys → display strings.

---

## 7. Interactions (all vanilla JS, no deps)

- `filtered()` — applies the active mechanic filter, applies the top-bar search query when present, then sorts by the active mode (`rating` desc / `bonus` desc / `wager` asc then rating / `new` = days asc). `list[0]` is always the Best choice.
- `render()` — rebuilds the cards grid. Injects contextual annotations **only on the Best-choice card** (so the other 8 stay clean) via a per-render `A()` helper.
- `counts()` — fills the live offer/match count.
- Quick match updates `filter` + `sortMode` together and re-renders.
- Search icon expands a compact top-bar search field; input updates `searchQuery`, cards, result count, and comparison shortlist.
- Comparison utility opens from the intro link or section button, then compares the current filtered/sorted top 4. Mobile uses stacked cards; desktop uses a matrix.
- Beginner sticky pick appears after the third rendered card has fully scrolled past the viewport; dismiss hides it for the current page session; full terms are visible in-place.
- Notify form → inline success message (no backend).
- "Show UX rationale" → toggles `body.show-anno`.
- `prefers-reduced-motion` respected; smooth scroll for the how-to anchor.

Note: an earlier "return visit" banner and a claim-tracking / "bonus run" retention panel were **removed** (see §9). There is currently no `localStorage` usage left.

### Current JS state variables / functions

- `filter` — current offer mechanic filter (`all`, `nodeposit`, `freespins`, etc.).
- `sortMode` — current sort mode (`rating`, `bonus`, `wager`; legacy `new` path still exists through the final `else` branch but is not exposed in quick match now).
- `searchQuery` — free text from top-bar search.
- `beginnerDismissed` — in-memory only; resets on page reload.
- `normalizeText(value)` — lowercases and compresses whitespace for search.
- `searchableText(o)` — concatenates offer name, tag, cleaned value, plus copy, wagering/deposit/expiry, terms, and attribute labels.
- `filtered()` — the single source for cards and comparison. Any new filtering must go here or the cards/comparison will diverge.
- `renderComparison()` — always compares `filtered().slice(0, 4)`.
- `updateBeginnerPick()` — checks `.card:nth-child(3)` and shows the sticky pick only after that card's bottom is above the viewport.
- `toggleComparison()` — opens/closes comparison and keeps button text/ARIA in sync.
- `setSearchOpen(open)` — opens/closes the search panel and focuses the input.

### Current DOM/CSS hooks to preserve

- `#quickMatch`, `.quick`, `data-filter`, `data-sort`
- `#offerCards`, `.card`
- `#comparison`, `#comparisonShell`, `#comparisonMobile`, `#comparisonHead`, `#comparisonBody`
- `#siteSearch`, `#searchToggle`, `#offerSearch`, `#searchClear`
- `.search-anno` — visible only in UX-rationale mode and hidden while the search panel is open.
- `#beginnerPick`, `#beginnerClose`, `.beginner-terms`
- `#annoToggle`, `body.show-anno`, `.anno`

If you rename these, update both CSS and JS in the same pass.

---

## 8. ⚠️ Placeholder vs real data (READ BEFORE ANY CLIENT/CEO USE)

The following are **fabricated demo values** and MUST be replaced with real, sourced data before this goes in front of leadership or the public — a wrong claim count or rating is a trust/liability risk in a regulated market:
- **Ratings** (`rating`, and the star fills) — need real editorial criteria + scores.
- **Claim counts** (`CLAIMERS`) — need a real data source or must be removed/reframed.
- **Bonus terms / values / wagering / expiry** — modelled on real MI casinos but not verified current; treat as illustrative.
- **Operator logos** — the prototype uses coloured monogram tiles (e.g. "MGM"), not real logos.

---

## 9. Decision log (settled — do not re-open without the founder)

Chronological, so you don't rebuild things that were deliberately cut:

1. **Started** as a generic multi-user home (bingo demo) → **refocused to SFBets casino-bonus**, primary user = bonus hunter.
2. **Dropped a replica of the live-site card UI** (brand header band + coloured ribbon) — founder disliked it. Chose a cleaner custom card.
3. **"Best for beginners" → "Best choice."**
4. **Header intentionally shrunk** — focus is the offers, not a big hero.
5. **Three feature ideas evaluated:** (a) search — **rejected** (catalogue too small; hunters browse, not search); (b) mechanic filter chips — **adopted** (highest value); (c) casino ratings — **adopted but editorial only** (no user reviews — low volume, moderation, commercial conflict).
6. **Retention "bonus run" panel + claim-tracking + "mark as claimed"** — built, then **removed** ("doing too much").
7. **Rating "why" breakdown bars** (Payout/Wagering/Deposit/Support meters) — built, then **removed** at founder's request. Kept only the overall score + stars.
8. **Comparison boxes** (Wagering/Min deposit/Expires) — kept, and drive the sorts.
9. **T&Cs moved below the Claim Now CTA**, always visible (never behind a click).
10. **Best choice is dynamic** = the #1 card of the current filtered/sorted view, always pinned on top. Badges moved out of the top-right corner (were overlapping the rating) into a top-left in-flow pill.
11. **Claim-count social-proof label** added to the Best-choice card.
12. **Removed** the "Welcome back" return banner and the "Michigan online casinos · new-player bonuses" eyebrow.
13. **UX rationale annotations** moved from two big top/bottom blocks to **contextual callouts beside each element**, and expanded to cover rating, comparison boxes, claim count, best-choice tag, filters, sort, and how-to-claim.
14. **Comparison-site pressure handled as a subtle feature, not the page model** — boss wants to see side-by-side comparison, but UX strategy argues against making it the main thing. Added a collapsed compare section reachable from the intro and placed after the cards. It is available to every user, but visually quiet; mobile gets stacked comparison cards first, desktop gets the matrix.
15. **Verified/updated handled inline, not as card badges or a top block** — added "Offers checked today" to the existing trust bar and quiet per-card terms timestamps. A separate top trust strip was rejected because it pushed offers down. Do not add identical "Verified" badges to every card; they become meaningless. Do not verify only selected cards; it implies other cards are not trustworthy.
16. **Filter + sort combined into Quick match experiment** — separate mechanic chips and sort segmented control were replaced with one guided intent row. The underlying model still uses `filter` + `sortMode`, but the visible UI says "Best overall", "No deposit", "Free spins", "Easiest terms", and "Biggest bonus". This may be easier for new users, but it is taller on mobile; compare against the old compact controls before committing.
17. **Search added as compact brand lookup, not the primary control** — because production may have 20-30 offers. Keep it in the sticky top bar as an expandable icon so users can search for a known casino or term like "no wagering" without replacing the quick-match journey or permanently pushing cards down.
18. **Search UX rationale made visible beside the search button** — the first version only showed rationale inside the opened search panel, which was too easy to miss in a leadership demo. Keep the callout visible when UX rationale is on, and hide it when the search panel opens.
19. **Beginner sticky pick added after card three** — supports the second scroll intent: users who are not searching for something specific but are unsure what to do. It must remain dismissible.
20. **Beginner sticky pick terms changed from hidden toggle to always visible** — founder corrected this for compliance. Do not hide sticky-card terms behind a click.
21. **Beginner sticky pick moved above the UX rationale button** — so the boss can clearly see it in the demo when rationale mode is on.

Open/soft question the founder is aware of: Best choice currently = whatever ranks #1 in the active sort, so sorting by "Newest" crowns the newest casino. Alternative (not chosen): always pin the highest-rated as Best choice regardless of sort. Confirm before changing.

### Do not rebuild these cut ideas unless founder explicitly reopens them

- Full comparison grid as the homepage/core experience.
- Heavy checkbox/slider/filter dashboard above the cards.
- Bonus-run tracker / claim-tracking / "mark as claimed".
- Rating meter breakdown bars.
- Per-card "How to claim" buttons.
- Big hero section.
- Separate top trust/verified strip above the offers.
- Repeated "Verified" badges on every card.
- Selective verification badges on only some cards.
- Visible best-choice explanation on every load; keep it behind "Why?".
- Hidden terms on offer cards or sticky beginner card.

---

## 10. Known gaps / next candidates

- No real data (see §8). No backend for the notify form.
- No real Claim Now / How-to-claim destinations.
- Not validated with real users yet (the founder deliberately deferred validation).
- Single dark theme by design (committed "casino floor" look) — no light mode.
- Accessibility pass not done (focus states are basic; star ratings need aria labels; annotations need to be reachable/announced).
- Sticky beginner pick currently recommends a hardcoded DraftKings-style offer. In production, choose this from real offer data using "no deposit" + "no wagering" / easiest terms.
- Search is simple substring matching. Production may need tokenized search, synonyms, or highlighting once the catalogue has 20-30 offers.
- Comparison CTA buttons and sticky beginner CTA are demo buttons only; wire them to real tracking/affiliate URLs in production.
- Mobile visual QA is manual so far; before production, test iPhone narrow widths around 360-390px and ensure the sticky card does not cover critical CTAs.

## 10A. If Claude continues from here

1. Read `AGENTS.md`, `SHARED_RULES.md`, `PROGRESS.md`, and this README first.
2. Open the live URL with a fresh cache-buster, for example:

```text
https://sfbets-deploy.vercel.app/?verify=<timestamp>
```

3. Confirm the current live page has:
   - search icon in the trust bar;
   - quick match row;
   - hidden "Why?" explanation;
   - subtle comparison section;
   - beginner sticky pick after card three;
   - full visible sticky-card terms;
   - visible search rationale when UX rationale is on.
4. Make edits only in `platform/docs/concepts/sfbets-casino-bonus-home/prototype.html` unless explicitly porting to production.
5. Update this README and `PROGRESS.md` after any concept/feature decision.
6. Deploy to Vercel only if the founder wants to review on phone / share externally.
7. Do not stage unrelated `tsconfig.tsbuildinfo` files.

Suggested commit scope when founder asks to commit:

```text
platform/docs/concepts/sfbets-casino-bonus-home/README.md
platform/docs/concepts/sfbets-casino-bonus-home/prototype.html
PROGRESS.md
```

Do not include:

```text
platform/apps/cms/tsconfig.tsbuildinfo
platform/apps/sfb/tsconfig.tsbuildinfo
```

---

## 11. Porting to production (the real goal)

When rebuilding in the app (`platform/apps/sfbets`, `data-theme="bets"`) with `@lsm/ui`:

- **Map palette intents → real tokens**, don't copy prototype hexes. SFBets tokens are the `bets` mode in `packages/tokens/index.css` (primary `#52DD00`, tertiary `#7CFF01`, etc.). The prototype's "green" ≈ primary/tertiary; "gold" is a rating accent not currently a token (flag if you need one added — **do not add tokens without founder confirmation**, per SHARED_RULES).
- **Reuse existing components** where they fit rather than reinventing: `OfferCard`, `Label`, `Button`, `SignupForm`/notify, `SfbetsNav`, `SfbetsFooter`. The concept's card is richer than the current `OfferCard` (rating, comparison boxes, claim count) — decide whether to extend `OfferCard` with new props or make an SFBets-specific variant. **This is a substantial component change → confirm with the founder before building** (Instance Component Check + Ask-Before-Building rules).
- **Filters/sort/rating/comparison need a real data model.** These map naturally onto the **CMS** offer model (operators + offers already exist there). Ratings, wagering/min-deposit/expiry, and claim counts would be new fields on the offer. Coordinate with the CMS work before inventing a parallel schema.
- **Search should use real fields**, not scraped text blobs. At minimum search operator name, offer headline, offer type/mechanics, wagering text, min deposit, and terms. Keep search secondary to quick match unless analytics proves otherwise.
- **Beginner sticky pick should be data-driven.** Default selection rule should favor no-deposit + no-wagering / lowest-wagering offers, then editorial rating. The selected offer must show full terms visibly in the sticky unit.
- **Comparison should be measured.** Track comparison opens, comparison claim clicks, which quick match/search state was active, and whether users claim from comparison vs cards.
- **Sticky beginner pick should be measured.** Track impressions after card three, dismissals, claim clicks, and whether it cannibalizes normal card clicks.
- **Terms/compliance:** offer cards and sticky beginner pick must keep terms visible. Do not hide terms behind accordions/clicks unless legal/compliance explicitly approves.
- **Responsible gambling/legal footer:** real production site will include required footer logos/legal elements. Still keep small top-of-page trust/age context because many mobile users never reach the footer.
- Follow the production coding standards in `SHARED_RULES.md` (kebab-case, `.types.ts`, deep imports, explicit return types, no comments, Server Components by default, `next/image`, etc.). The prototype ignores all of these deliberately — it is a throwaway HTML sketch, not a style reference.

### Suggested production measurement plan

Primary metrics:

- Outbound operator click-through rate.
- Downstream registration/deposit/CPA where available.
- Mobile bounce rate.
- Scroll depth to card three, comparison, how-to, notify.
- Quick match usage.
- Search open and search query usage.
- Comparison open and claim usage.
- Beginner sticky impression/dismiss/claim rate.

Interpretation warning:

- Raw CTA clicks can reward a worse UX if users click impulsively and fail downstream.
- Qualified clicks and downstream CPA are more important than total clicks.
- If comparison engagement is low, keep it subtle.
- If comparison engagement and downstream conversion are high, consider expanding comparison into a fuller product.

---

## 12. Run & deploy

**View locally:** open `prototype.html` in a browser (it renders as-is in most browsers even without the doc wrapper, but for a correct standalone/mobile render use the wrapped build below).

**Build a standalone `index.html`** (adds `<!doctype>`, `<html>`, `<head>` with **viewport meta** — required for correct mobile rendering — and `<body>`):

Command used in the latest Codex deploys:

```bash
mkdir -p /private/tmp/sfbets-deploy-build
node -e "const fs=require('fs');const src=fs.readFileSync('platform/docs/concepts/sfbets-casino-bonus-home/prototype.html','utf8');const html='<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n'+src+'\n</html>\n';fs.writeFileSync('/private/tmp/sfbets-deploy-build/index.html',html);"
```

Older equivalent wrapper, if working from a copied `prototype.html` in a standalone folder:

```bash
python3 -c "
src = open('prototype.html', encoding='utf-8').read()
head, _, body = src.partition('</style>')
doc = '<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n' + head + '</style>\n</head>\n<body>\n' + body + '\n</body>\n</html>\n'
open('index.html','w',encoding='utf-8').write(doc)
"
```

**Deploy (Vercel):** the currently used Vercel project is **`sfbets-deploy-build`** (scope `saaidhassan-maxs-projects`), with the stable custom alias **`sfbets-deploy.vercel.app`**. From `/private/tmp/sfbets-deploy-build` or whichever folder contains the built `index.html`:

```bash
vercel deploy --prod --yes
```

Then point the stable alias at the generated production URL:

```bash
vercel alias set <generated-production-url> sfbets-deploy.vercel.app
```

Stable alias **https://sfbets-deploy.vercel.app** should always serve the latest approved prototype deploy. **Deployment Protection is OFF** for this project (so the link is public); if a new project is ever created, that toggle must be disabled again in Vercel → Project → Settings → Deployment Protection, or the link 302-redirects to an SSO login.

Current temp build folder used by Codex in this session:

```text
/private/tmp/sfbets-deploy-build
```

Current last-known live alias target:

```text
sfbets-deploy-build-rcrbnenmn-saaidhassan-maxs-projects.vercel.app
```

After deploy, always verify the stable URL with a cache-buster:

```bash
curl -I "https://sfbets-deploy.vercel.app/?verify=$(date +%s)"
```

---

## 13. TL;DR for Claude / Codex

- It's a **casino-bonus offers home** for **SFBets MI** (no sports betting), built for the **bonus hunter**.
- Prototype = one self-contained HTML file, live at **sfbets-deploy.vercel.app**.
- Core validated ideas: **quick match intent control** (experimental replacement for separate filters/sort), **compact top-bar search for brand lookup**, **inline freshness / trust proof**, **editorial ratings + sorts**, **dynamic Best-choice card with social proof**, **comparison boxes (wagering/deposit/expiry)**, **subtle current-shortlist comparison utility**, **beginner sticky pick after card three with terms**, **always-visible T&Cs below the CTA**, **one shared how-to-claim section**, **single-field notify**.
- **All ratings/claim-counts/terms are placeholders** — replace before any real use.
- Read the **decision log (§9)** so you don't rebuild the cut features (bonus-run tracker, rating meter bars, per-card how-to button, return banner).
- Production build = rebuild in `apps/sfbets` with `@lsm/ui` + real tokens + a real offer data model (likely via the CMS); **confirm component changes with the founder first**.
