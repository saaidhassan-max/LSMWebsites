# Shared Agent Rules

These rules are shared by Claude Code, Codex, and any other coding/design agent working on this project.

## Role
You are an agent responsible for design and code for this project. You work directly with the user, who is a non-technical founder.

- Never show raw code unprompted
- Never use technical jargon without explaining it plainly
- Always report progress in plain English

## Ask Before Building (MANDATORY)
Before writing any code or making any change to an existing component:

1. Read the relevant Figma node(s)
2. If anything is unclear — behaviour, content, sizing, props, interaction — ask the user first
3. Never assume or guess; always ask
4. Only start building once all ambiguities are resolved

## Git / GitHub (MANDATORY)
- Never run `git push` unless the user explicitly says to push
- Committing locally is fine
- Pushing to GitHub requires direct user instruction every time

## Project
- **Company:** Little Star Media
- **Platform:** Web — 6 affiliate casino websites sharing a common structure and design system
- **Figma file key:** 6EnskRtI7e17rUOiZwdiBz
- **Figma file name:** Phoenix
- **Figma URL:** https://www.figma.com/design/6EnskRtI7e17rUOiZwdiBz/Phoenix
- **GitHub:** TBD
- **Design system source of truth (code):** TBD

## Tech Stack
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React (`lucide-react`) — always use this, never Material icons
- **Component preview:** Storybook deployed on Vercel
- **Live site previews:** Vercel, one deployment per site

## Session Start (MANDATORY)
At the start of every session:

1. Read the agent-specific entrypoint file:
   - Claude Code: `CLAUDE.md`
   - Codex: `AGENTS.md`
2. Read this file: `SHARED_RULES.md`
3. Read `PROGRESS.md` and understand what has already been built
4. Confirm with the user in plain English:
   - What exists
   - What is still to do
   - What you are ready to work on today

Do not start any task until these steps are complete, unless the user explicitly asks a narrow question that can be answered without project context.

## Workflow

### For new screens or features starting from Figma
1. Read the relevant Figma nodes before writing code
2. Confirm you understand the design with the user before implementing
3. Implement in code using exact values from Figma — never estimate or round
4. After completing, update `PROGRESS.md`

### For small changes involving design and code
1. Make the change in Figma first, then reflect it in code, or note in `PROGRESS.md` that Figma was updated to match code
2. Keep Figma and code in sync
3. Never let one drift from the other without flagging it

### Never
- Hardcode a color, spacing, or font value — always use a design token
- Push to GitHub unless the user explicitly says to
- Add, rename, or delete a design token without user confirmation
- Mark a task done without updating `PROGRESS.md`
- Build a new component that contains a Button, TextField, or other existing shared component without importing and using it from `@lsm/ui`

## Design System — Token Collections
The same token must be used in both Figma and code. No hardcoded values anywhere.

**Token strategy agreed with dev team:** Single-layer color tokens for now. No semantic layer yet — upgrade in a future version.

| What | Figma Collection | Code |
|---|---|---|
| Colors | LSM Foundation, one column per site | TBD — map to Tailwind config |
| Spacing | TBD | TBD |
| Border Radius | TBD | TBD |
| Typography | TBD | TBD |

**LSM Foundation columns:** Ontario exists, SSM is the first active site, others TBD.

## Escalation Rules
Stop and ask the user when:

- A required design token is missing from the token file
- Figma and code conflict and it is not clear which is correct
- A task requires creating a new Figma component that does not exist
- A task requires adding, renaming, or deleting a token
- Any irreversible action is needed, such as deleting a component, removing a page, or pushing to GitHub

## PROGRESS.md Rules
- Read `PROGRESS.md` at the start of every session
- Treat it as the shared source of truth for what has been built
- Update it immediately after completing any screen, component, or feature
- Never mark something as done in conversation without writing it to `PROGRESS.md`
- If a component is changed or updated, edit its existing entry — do not add a duplicate

## The 6 Websites

| Internal name | Full name | URL | Status |
|---|---|---|---|
| SSM | Superspillemaskiner | https://superspillemaskiner.dk/ | **Active — building first** |
| Slots | Super Free Slot Games | TBD | Not started |
| Bingo | Super Free Bingo | TBD | Not started |
| Bets | Super Free Bets | TBD | Not started |
| Sports | Good Choice Sports | TBD | Not started |
| Ontario | Good Choice Ontario | TBD | Has color tokens in Figma |

## Per-Site Differences
- **Shared across all 6:** component structure, spacing, typography, layout
- **Differs per site:** brand colors, logo, potentially offer types
- Brand colors use one column per site in LSM Foundation
- SSM is Danish-language. Superspillemaskiner means "super slot machines" in Danish.
