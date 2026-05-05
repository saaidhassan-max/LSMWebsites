# Agent Rules

## Role
You are a single agent responsible for both design (Figma) and code for this project. You work directly with the user, who is a non-technical founder. Never show raw code unprompted, never use technical jargon without explanation, always report in plain English.

## Project
- **Company:** Little Star Media
- **Platform:** Web — 6 affiliate casino websites sharing a common structure and design system
- **Figma file key:** 6EnskRtI7e17rUOiZwdiBz (file name: Phoenix)
- **Figma URL:** https://www.figma.com/design/6EnskRtI7e17rUOiZwdiBz/Phoenix
- **GitHub:** TBD
- **Design system source of truth (code):** TBD

## Tech Stack
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React (`lucide-react`) — always use this, never Material icons
- **Component preview:** Storybook deployed on Vercel
- **Live site previews:** Vercel (one deployment per site)

## Figma Tool Order (MANDATORY)
1. Always use `mcp__figma-console__*` (desktop bridge) for ALL Figma read/write
2. If it fails → ask user to restart the bridge plugin first
3. Only fall back to other Figma MCP tools if it still fails after restart
- Bridge path: /Users/Saied.Hassan/Desktop/LSM-DS/figma-console-mcp-main/figma-desktop-bridge

## Figma Reading — Always Use Deep (MANDATORY)
- Always use `figma_get_component_for_development_deep` when reading any component, no exceptions
- Never use `figma_get_component_for_development` (non-deep) as a shortcut or while waiting for the bridge
- Why: the deep tool reads up to 20 levels of nesting AND resolves design token names (e.g. `secondary` instead of a raw hex). The non-deep tool stops at 4 levels and returns raw hex values, which means missed structure and potential token mismatches in code
- If the bridge is not running: ask the user to open it (Plugins → Development → Figma Desktop Bridge), then wait and retry deep — do not proceed with the non-deep fallback

---

## SESSION START (MANDATORY — do this first, every session)

1. Read this file (CLAUDE.md)
2. Read PROGRESS.md — understand what has already been built
3. Confirm with the user in plain English: what exists, what is still to do, and what you are ready to work on today

Do not start any task until these three steps are complete.

---

## Workflow

### For new screens or features (starting from Figma):
1. Read the relevant Figma nodes before writing a single line of code
2. Confirm you understand the design with the user before implementing
3. Implement in code using exact values from Figma — never estimate or round
4. After completing, update PROGRESS.md

### For small changes (design and code simultaneously):
1. Make the change in Figma first, then reflect it in code — or note in PROGRESS.md that Figma was updated to match code
2. Keep both in sync — never let one drift from the other without flagging it

### Never:
- Hardcode a color, spacing, or font value — always use a design token
- Push to GitHub unless the user explicitly says to
- Add, rename, or delete a design token without user confirmation
- Mark a task done without updating PROGRESS.md
- Build a new component that contains a Button, TextField, or other existing shared component without importing and using it from @lsm/ui

---

## Design System — Token Collections
The same token must be used in both Figma and code. No hardcoded values anywhere.

**Token strategy (agreed with dev team):** Single-layer color tokens for now. No semantic layer yet — upgrade in a future version.

| What | Figma Collection | Code |
|---|---|---|
| Colors | LSM Foundation (one column per site) | TBD — map to Tailwind config |
| Spacing | TBD | TBD |
| Border Radius | TBD | TBD |
| Typography | TBD | TBD |

**LSM Foundation columns:** Ontario (exists), SSM (to be added — first active site), others TBD

---

## Escalation Rules (stop and ask the user)
- A required design token is missing from the token file
- Figma and code conflict and it is not clear which is correct
- A task requires creating a new Figma component that does not exist
- A task requires adding, renaming, or deleting a token
- Any irreversible action (deleting a component, removing a page, pushing to GitHub)

---

## PROGRESS.md Rules
- Read it at the start of every session
- Update it immediately after completing any screen, component, or feature
- Never mark something as done in conversation without writing it to PROGRESS.md
- If a component is changed or updated, edit its existing entry — do not add a duplicate

---

## The 6 Websites

| Internal name | Full name | URL | Status |
|---|---|---|---|
| SSM | Superspillemaskiner | https://superspillemaskiner.dk/ | **Active — building first** |
| Slots | Super Free Slot Games | TBD | Not started |
| Bingo | Super Free Bingo | TBD | Not started |
| Bets | Super Free Bets | TBD | Not started |
| Sports | Good Choice Sports | TBD | Not started |
| Ontario | Good Choice Ontario | TBD | Has color tokens in Figma |

---

## Per-Site Differences
- **Shared across all 6:** component structure, spacing, typography, layout
- **Differs per site:** brand colors (one column per site in LSM Foundation), logo, potentially offer types
- SSM is Danish-language (superspillemaskiner = "super slot machines" in Danish)
