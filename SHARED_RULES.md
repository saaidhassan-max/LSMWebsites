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

## Deep Dive Mode (MANDATORY)

**Trigger:** When the user starts a message with "deep dive", run the full process below.
Do not ask clarifying questions first. Run all three rounds, then present the output.

### The three rounds

**Round 1 — Analysis**
Read all relevant files, screens, or context.
Examine the topic from every angle that applies:
security, architecture, UX, performance, scalability, growth, feasibility, risk.
Produce a raw list of everything you find — problems, opportunities, risks, gaps.

**Round 2 — Challenge**
Argue against your own Round 1 findings.
- What did you overstate?
- What is a false alarm or low risk in practice?
- What did you miss entirely?
- What assumes too much about the user, the data, or the system?
Be direct. Cut anything that does not hold up under scrutiny.

**Round 3 — Synthesis**
Produce a final position that survives the challenge.
Only include findings that are real, material, and actionable.
Order by impact — highest first.

### Output format

Title: **Here is what we should do**

Present a numbered list, maximum 7 items.
Each item:
- One clear action (what to do)
- One sentence reason (why it matters)
- Confidence: High / Medium / Low

End every deep dive with:
> "Review this plan. Reply with **approve** to start, tell me what to change, or ask me to go deeper on any item."

### Deep dive rules
- Never ask questions before running the three rounds
- Never produce more than 7 items — cut ruthlessly
- If something is genuinely uncertain, say so in one sentence, then give your best recommendation anyway
- No hedging, no padding — every sentence must earn its place

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

### Figma-to-code nesting (MANDATORY)

Only collapse a Figma wrapper frame if it has **no layout properties of its own** — no gap, no padding, no sizing mode that differs from its parent. The moment a frame has its own gap or padding it must become its own element in code.

**Example:** If elements 1 and 2 sit inside a frame with `gap: 4px`, and that frame sits inside a parent with `gap: 8px`, the code must preserve both levels:

```tsx
<div className="flex flex-col gap-2">   {/* 8px outer gap */}
  <div className="flex flex-col gap-1"> {/* 4px inner gap — never flatten this */}
    <Element1 />
    <Element2 />
  </div>
  <Element3 />
</div>
```

Flattening it to one wrapper with `gap-2` loses the spacing intent and breaks the design when content changes.

### Reviewing Figma changes against existing code (MANDATORY ORDER)
When a user asks you to review an updated Figma component and sync it to code, always check in this order — do not skip ahead:

1. **Structure first** — does the node hierarchy match? New wrapper frames, removed wrappers, added children, changed nesting. This is the most commonly missed class of change.
2. **Layout** — dimensions, sizing mode (fixed/hug/fill), max-width, min-width, padding, gap, alignment, direction.
3. **Tokens** — fill, stroke, text color, radius, spacing — all bound variable names.
4. **Typography** — font size, weight, line height, letter spacing.
5. **Visibility / opacity** — any node with `opacity: 0` or `visible: false` is an intentional invisible spacer; do not remove it.

Never report the sync as done after finding the first difference — work through all five layers.

### Instance component check (MANDATORY)
Before building any component that was shared from Figma:

1. Read the Figma node and identify every `INSTANCE` node inside it
2. For each instance, check whether a built version already exists in `packages/ui/src/components/`
3. If an instance is **missing from the codebase:**
   - Small / self-contained (icon wrapper, decorative element) — state you are building it as part of the same task, then do so
   - Substantial component (button variant, label, form element, card) — stop and ask the user to confirm before building it
4. Never stub, inline, or skip a missing sub-component silently
5. Only start building the parent component once every sub-component dependency is resolved

### Never
- Hardcode a color, spacing, or font value — always use a design token
- Push to GitHub unless the user explicitly says to
- Add, rename, or delete a design token without user confirmation
- Mark a task done without updating `PROGRESS.md`
- Build a new component that contains a Button, TextField, or other existing shared component without importing and using it from `@lsm/ui`

## CSS Layout — Constrained Sections (MANDATORY)

### The `w-full` rule
Whenever a section uses `max-w-[...] mx-auto` to centre itself inside a `flex` parent, it **must** also carry `w-full`. Without it the auto-margins collapse the element to its minimum content width, making `1fr` grid columns or `flex-1` children resolve to zero — images and content disappear.

```
✅  w-full max-w-[1440px] mx-auto px-16
❌  max-w-[1440px] mx-auto px-16   ← collapses in flex context
```

### Why this happens
In a `flex-col` container, `mx-auto` absorbs available horizontal space instead of letting the item stretch. The element shrinks to min-content. Any child grid column sized with `1fr` then gets `(collapsed_width − fixed_columns − gap) = 0px`.

### Project-wide pattern for constrained sections
```tsx
{/* Full-bleed wrapper (USP, WelcomeBanner, Footer, etc.) — no constraint needed */}
<div className="w-full">…</div>

{/* Constrained section (nav, offer cards, hero+form, etc.) */}
<div className="w-full max-w-[1440px] mx-auto px-16">…</div>
```

Apply this to every section that uses `max-w-[...]` — no exceptions.

## Figma Tools — When to Use Which

| Situation | Tool | Why |
|---|---|---|
| Reading an existing component or screen | `mcp__figma-console__*` (console bridge) | Resolves token names, reads 20 levels deep, pixel-accurate |
| Creating something that doesn't exist in Figma yet | `figma-ds-cli` (CLI via Bash) | Fast creation with LSM token binding via `var:token-name` |
| Verifying after CLI creation | `mcp__figma-console__*` | Confirm tokens resolved correctly and structure is right |

**The one-line rule:** already in Figma → bridge. New from scratch → CLI first, then bridge to verify.

**figma-cli token binding:** use `var:primary`, `var:secondary`, `var:tertiary`, `var:surface`, `var:on-surface-light`, `var:on-surface-dark`, `var:outline`, `var:outline-variant` etc. — these map directly to the LSM Foundation collection already in the Figma file.

**figma-cli JSX render syntax (key props):**
- Layout: `flex="row"` / `flex="col"`, `gap={8}`, `px={16}`, `py={8}`, `justify="center"`, `items="center"`
- Size: `w={320}`, `h={48}`, `w="fill"`, `h="fill"`
- Appearance: `bg="var:primary"`, `rounded={8}`, `stroke="var:outline"`
- Text: `<Text size={16} weight="bold" color="var:on-surface-light" w="fill">Label</Text>`
- Icons: `<Icon name="lucide:check" size={20} color="var:on-primary" />`

---

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

---

## Production Coding Standards (MANDATORY — from dev manager, applied 2026-05-08)

Full rule source: `PUP-Phoenix-staging/docs/consolidated-code-rules.md`

### File and folder naming
- Kebab-case for all component directories and filenames — `button/button.tsx`, not `Button/Button.tsx`
- Each component folder must contain: `<name>.tsx`, `<name>.types.ts`, `<name>.spec.tsx`, `<name>.stories.tsx`
- No generic filenames (`helpers.ts`, `utils.ts`, `common.ts`)

### TypeScript
- Strict mode — no `any`, no `unknown` in production code
- Explicit return types on every function: `): React.ReactElement`, `): void`, `): string`, etc.
- `interface` for all data shapes (not `type` aliases for objects)
- Export shared interfaces from `.types.ts` files, not from component `.tsx` files
- Use `import type` for type-only imports

### Imports
- No barrel files — never `import { X } from '@lsm/ui'`
- Always use deep path imports: `import { Button } from '@lsm/ui/components/button/button'`
- Import types from the `.types.ts` file: `import type { ButtonProps } from '@lsm/ui/components/button/button.types'`
- Always add `import type React from 'react'` at the top of every component file

### Code style
- No comments of any kind — no `//`, `/* */`, `{/* */}`, JSDoc, TODO, FIXME
- Use names, types, and small functions as documentation
- Single-expression arrow functions use implicit return
- 4-space indentation, single quotes, semicolons, no trailing commas, 100-char line width

### Components and architecture
- Server Components by default — `'use client'` only when interactivity or browser APIs are required
- Keep `page.tsx` and `layout.tsx` thin — no business logic in route files
- Use `generateMetadata` for page metadata
- Shared static data lives in `apps/ssm/src/data/site-content.ts` — do not duplicate in pages
- Use `next/image` (not `<img>`) for all images

### What NOT to apply
- **Multilayer token rule excluded** — single-layer color tokens by design. Do not add primitive/semantic/component token tiers.
