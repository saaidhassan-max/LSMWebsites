# SFBets Casino-Bonus Home — Concept & Prototype

**Status:** Working front-end prototype (self-contained HTML). NOT yet built in the real app.
**Owner of concept:** founder (non-technical). **Next builder:** Codex.
**Last updated:** 2026-07-15.

This document is a full handoff. Read it top to bottom before touching the prototype. It captures the concept, every feature and the UX reasoning behind it, the current build, what is real vs placeholder, the full decision history (so you don't re-open settled questions), and how to take it to production.

---

## 1. What this is

A redesigned **home page concept for the SFBets site** (Super Free Bets MI), reimagined as a clean, mobile-first **casino-bonus offers catalogue**. It was built as a fast, throwaway-quality-but-polished prototype to pressure-test a set of UX ideas with the founder and, later, leadership. It is a single self-contained HTML file (vanilla JS, no framework, no build step).

The prototype is the source of truth for the *concept*. The eventual goal is to rebuild the validated parts in the real Next.js app using `@lsm/ui` components (see §12).

### Files & links
- **Prototype source (in repo):** `platform/docs/concepts/sfbets-casino-bonus-home/prototype.html`
  - This is the authoring copy. It is written as an Artifact-style fragment: it starts with `<title>` + `<style>` (no `<!doctype>`/`<html>`/`<head>`/`<body>`). To host it standalone you must wrap it — see §13.
- **Live public demo (Vercel):** https://sfbets-deploy.vercel.app
  - Stable production alias — always points to the latest deploy. Publicly reachable (deployment protection disabled). Works on any device/account, no login.
- **Reference framework:** "UX Strategy System — Complete Reference.html" — a UX methodology doc the founder supplied (lives in their local Downloads, not in the repo). The concept leans on its Relationship Arc, UX Laws (Peak-End, Zeigarnik, Von Restorff, Hick's), and flow friction rules. You don't need the file to continue, but the annotations in the prototype cite these laws.

---

## 2. Business context & primary user

**Business model (critical to every design decision):** SFBets is an **affiliate** site. Revenue = **CPA per operator** when a *new player* signs up at a casino through our link. "New player" **resets per casino**, so one visitor can generate a fresh payout at casino after casino. Therefore the money is in **repeat claiming across many casinos** and **returning** for newly-added ones.

**Site scope correction (important):** despite the "Bets" name, **SFBets MI is a casino-bonus site — house money, free spins, deposit matches. NO sports betting.** Do not add sportsbook framing.

**Market:** Michigan, USA. Regulated → 21+, MGCB licensing, 1-800-GAMBLER responsible-gambling messaging are mandatory trust elements.

**Primary user (the concept commits to ONE):** the **bonus hunter / value-seeker** — someone who deliberately claims no-deposit/free-spin/match offers across as many casinos as possible. Every layout and sort choice optimises for them. (Secondary users — nervous first-timers, returning deal-checkers — are served but never win a conflict.)

---

## 3. The concept — page structure (top to bottom)

1. **Slim sticky trust bar** — brand wordmark + MGCB licensed / Michigan only / 21+.
2. **Compact intro** — one headline ("Claim casino bonuses — house money & free spins") + a "How claiming works ↓" link that smooth-scrolls to the how-to section. Deliberately small — the offers are the centrepiece, not a hero.
3. **Inline freshness / trust proof** — "Offers checked today" lives in the sticky trust bar on wider screens, with quiet per-card "Terms checked" metadata in the terms area. No separate top block, so offers stay high on the page.
4. **Sticky filter + sort toolbar** — mechanic filter chips (left, horizontally scrollable) + sort segmented control (right).
5. **Offer cards grid** — 1 column mobile, 2 columns ≥720px. The #1 card is the dynamic "Best choice".
6. **Subtle comparison utility** — secondary link + collapsed section after the offer cards. Mobile shows stacked comparison cards first; desktop can show a matrix. It compares the current filtered/sorted shortlist rather than becoming the homepage.
7. **"How claiming works" section** — one 3-step explainer the whole page shares (scroll target).
8. **"Get new bonuses first" notify** — single email field (the retention/return hook).
9. **Footer** — legal / RG.
10. **Floating "Show UX rationale" button** — toggles contextual annotations beside each element (pitch/demo aid; would be removed or feature-flagged in production).

---

## 4. Feature inventory + UX rationale

Every feature and *why* it exists. The prototype shows these rationales inline when "Show UX rationale" is on (annotations are placed **beside the element they describe**, not stacked).

| Feature | What it does | UX rationale (law) | Serves |
|---|---|---|---|
| **Quick match control** | Replaces separate filter + sort controls with one intent row: Best overall / No deposit / Free spins / Easiest terms / Biggest bonus. Each option maps to the existing filter/sort logic underneath. | Lower-confidence users choose what they want in plain language instead of understanding two control systems. This is an active experiment: clearer, but visually taller than the old chip + sort row. | Hunters / first-timers |
| **Dynamic "Best choice" card** | The **#1 card in the current view** is always pinned on top and styled (green border + "★ Best choice" pill). It **changes** as you filter/sort. | Hick's Law — one confident pick removes choice paralysis for the undecided. | First-timers |
| **Inline freshness / trust proof** | "Offers checked today" appears in the existing sticky trust bar on wider screens. Each card has a quiet "Terms checked Jul 15" line in its terms area. | Trust is a system, not a repeating badge. A separate top block pushed offers down, so freshness moved into existing surfaces. If every card has a "Verified" badge, it becomes invisible; if only some have one, the others look unsafe. | All |
| **Editorial rating** | Per-casino score (e.g. 4.8) + half-star rendering, top-right of each card. | Honest, consistent authority signal + the axis "Top rated" sorts by. Ratings **vary** on purpose (an all-5★ affiliate site reads as fake). | All |
| **Claim-count social proof** | On the Best-choice card only: "N people claimed this offer this month". | Social proof — makes the top pick feel popular/safe; nudges undecided users. | First-timers |
| **Comparison boxes** | Per card: **Wagering · Min deposit · Expires** as a 3-cell strip. "None"/low = green, high wagering = gold. | The **real decision variables** hunters compare, surfaced instead of buried in T&Cs. Also power the sorts. | Hunters |
| **Subtle comparison utility** | A secondary "Compare shortlisted offers" link opens a collapsed compare section after the cards. Mobile renders stacked compare cards; desktop renders a side-by-side matrix. It uses the current filter/sort's top offers. | Satisfies the comparison-site request without turning the homepage into a spreadsheet. Uses progressive disclosure: available to everyone, but only users actively looking for side-by-side detail will open it. | Hunters / detail-checkers |
| **Attribute pills** | Green pills echoing the offer's mechanics (No deposit, Free spins…). | Fast scannability / reinforce the active filter. | All |
| **Always-visible T&Cs** | Full terms shown in every card, **below the Claim Now CTA**. Never hidden behind a click. | Trust + regulatory clarity. Explicit founder requirement. | All |
| **Claim Now CTA** | Primary green button per card. (Demo: not wired to a real destination.) | The single primary action per card. | All |
| **"How claiming works" section** | One shared 3-step explainer, steps named by user intent ("Your bonus lands"). Scroll target from the intro link. | Guided explainer converts first-timers; keeping it in ONE place keeps cards clean (replaced the old per-card "How to claim" button). | First-timers |
| **Notify (email capture)** | Single email field + confirmation. | The "Return" layer of the relationship arc — turns a passive checker into a re-engageable subscriber → repeat CPAs. Kept to 1 field (friction cap). | Deal-checkers |
| **"New" badge** | Casinos added ≤3 days (`days<=3`) get a gold "★ New" pill (unless they're the Best choice, which wins the top slot). | Von Restorff (isolation) — freshness is what pulls hunters back. | Hunters |
| **Show UX rationale toggle** | Reveals the annotations. | Demo/pitch aid only. Not a production feature. | (internal) |

---

## 5. Design system used in the prototype

All values are CSS custom properties on `:root`. **This is a bespoke dark "casino floor" palette for the prototype — it is NOT the real SFBets `data-theme="bets"` token set.** When porting, map these intents onto the real tokens (see §12), don't copy the hexes.

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

- `filtered()` — applies the active mechanic filter, then sorts by the active mode (`rating` desc / `bonus` desc / `wager` asc then rating / `new` = days asc). `list[0]` is always the Best choice.
- `render()` — rebuilds the cards grid. Injects contextual annotations **only on the Best-choice card** (so the other 8 stay clean) via a per-render `A()` helper.
- `counts()` — fills the live per-chip counts.
- Filter chips + sort segmented control update state and re-render.
- Comparison utility opens from the intro link or section button, then compares the current filtered/sorted top 4. Mobile uses stacked cards; desktop uses a matrix.
- Notify form → inline success message (no backend).
- "Show UX rationale" → toggles `body.show-anno`.
- `prefers-reduced-motion` respected; smooth scroll for the how-to anchor.

Note: an earlier "return visit" banner and a claim-tracking / "bonus run" retention panel were **removed** (see §9). There is currently no `localStorage` usage left.

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

Open/soft question the founder is aware of: Best choice currently = whatever ranks #1 in the active sort, so sorting by "Newest" crowns the newest casino. Alternative (not chosen): always pin the highest-rated as Best choice regardless of sort. Confirm before changing.

---

## 10. Known gaps / next candidates

- No real data (see §8). No backend for the notify form.
- No real Claim Now / How-to-claim destinations.
- Not validated with real users yet (the founder deliberately deferred validation).
- Single dark theme by design (committed "casino floor" look) — no light mode.
- Accessibility pass not done (focus states are basic; star ratings need aria labels; annotations need to be reachable/announced).

---

## 11. Porting to production (the real goal)

When rebuilding in the app (`platform/apps/sfbets`, `data-theme="bets"`) with `@lsm/ui`:

- **Map palette intents → real tokens**, don't copy prototype hexes. SFBets tokens are the `bets` mode in `packages/tokens/index.css` (primary `#52DD00`, tertiary `#7CFF01`, etc.). The prototype's "green" ≈ primary/tertiary; "gold" is a rating accent not currently a token (flag if you need one added — **do not add tokens without founder confirmation**, per SHARED_RULES).
- **Reuse existing components** where they fit rather than reinventing: `OfferCard`, `Label`, `Button`, `SignupForm`/notify, `SfbetsNav`, `SfbetsFooter`. The concept's card is richer than the current `OfferCard` (rating, comparison boxes, claim count) — decide whether to extend `OfferCard` with new props or make an SFBets-specific variant. **This is a substantial component change → confirm with the founder before building** (Instance Component Check + Ask-Before-Building rules).
- **Filters/sort/rating/comparison need a real data model.** These map naturally onto the **CMS** offer model (operators + offers already exist there). Ratings, wagering/min-deposit/expiry, and claim counts would be new fields on the offer. Coordinate with the CMS work before inventing a parallel schema.
- Follow the production coding standards in `SHARED_RULES.md` (kebab-case, `.types.ts`, deep imports, explicit return types, no comments, Server Components by default, `next/image`, etc.). The prototype ignores all of these deliberately — it is a throwaway HTML sketch, not a style reference.

---

## 12. Run & deploy

**View locally:** open `prototype.html` in a browser (it renders as-is in most browsers even without the doc wrapper, but for a correct standalone/mobile render use the wrapped build below).

**Build a standalone `index.html`** (adds `<!doctype>`, `<html>`, `<head>` with **viewport meta** — required for correct mobile rendering — and `<body>`):

```bash
python3 -c "
src = open('prototype.html', encoding='utf-8').read()
head, _, body = src.partition('</style>')
doc = '<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n' + head + '</style>\n</head>\n<body>\n' + body + '\n</body>\n</html>\n'
open('index.html','w',encoding='utf-8').write(doc)
"
```

**Deploy (Vercel):** project **`sfbets-deploy`** (scope `saaidhassan-maxs-projects`). From the folder containing the built `index.html`:

```bash
vercel deploy --prod --yes
```

Stable alias **https://sfbets-deploy.vercel.app** always serves the latest production deploy. **Deployment Protection is OFF** for this project (so the link is public); if a new project is ever created, that toggle must be disabled again in Vercel → Project → Settings → Deployment Protection, or the link 302-redirects to an SSO login.

---

## 13. TL;DR for Codex

- It's a **casino-bonus offers home** for **SFBets MI** (no sports betting), built for the **bonus hunter**.
- Prototype = one self-contained HTML file, live at **sfbets-deploy.vercel.app**.
- Core validated ideas: **quick match intent control** (experimental replacement for separate filters/sort), **inline freshness / trust proof**, **editorial ratings + sorts**, **dynamic Best-choice card with social proof**, **comparison boxes (wagering/deposit/expiry)**, **subtle current-shortlist comparison utility**, **always-visible T&Cs below the CTA**, **one shared how-to-claim section**, **single-field notify**.
- **All ratings/claim-counts/terms are placeholders** — replace before any real use.
- Read the **decision log (§9)** so you don't rebuild the cut features (bonus-run tracker, rating meter bars, per-card how-to button, return banner).
- Production build = rebuild in `apps/sfbets` with `@lsm/ui` + real tokens + a real offer data model (likely via the CMS); **confirm component changes with the founder first**.
