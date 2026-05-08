# Claude Code Instructions

This is Claude Code's entrypoint file for the Little Star Media multi-site project.

Before doing any project work, Claude Code must read:

1. `SHARED_RULES.md` — shared rules for all agents
2. `PROGRESS.md` — current build status and decisions

Follow `SHARED_RULES.md` for project rules, workflow, escalation rules, tech stack, design system rules, website list, and `PROGRESS.md` update requirements.

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

## Claude Session Start (MANDATORY — do this first, every session)

1. Read this file (CLAUDE.md)
2. Read `SHARED_RULES.md`
3. Read `PROGRESS.md` — understand what has already been built
4. Confirm with the user in plain English: what exists, what is still to do, and what you are ready to work on today

Do not start any task until these steps are complete.

---

## Production Coding Standards (MANDATORY — from dev manager)

These rules were applied on 2026-05-08 and must be followed for all future code. The full rule source is in `PUP-Phoenix-staging/docs/consolidated-code-rules.md`.

### File and folder naming
- Kebab-case for all component directories and filenames — `button/button.tsx`, not `Button/Button.tsx`
- Each component lives in its own folder and has: `<name>.tsx`, `<name>.types.ts`, `<name>.spec.tsx`, `<name>.stories.tsx`
- No generic filenames like `helpers.ts`, `utils.ts`, `common.ts`

### TypeScript
- Strict mode — no `any`, no `unknown` in production code
- Explicit return types on every function: `): React.ReactElement`, `): void`, `): string`, etc.
- `interface` for all data shapes (not `type` aliases)
- Export shared interfaces from dedicated `.types.ts` files, not from component `.tsx` files
- Use `import type` for type-only imports

### Imports
- No barrel files — never import from `@lsm/ui` directly
- Always use deep path imports: `import { Button } from '@lsm/ui/components/button/button'`
- Import types from the `.types.ts` file: `import type { ButtonProps } from '@lsm/ui/components/button/button.types'`
- Always add `import type React from 'react'` at the top of every component file

### Code style
- No code comments of any kind — no `//`, `/* */`, `{/* */}`, JSDoc, TODO, FIXME
- Use names, types, and small functions as documentation instead
- Single-expression arrow functions use implicit return (no braces, no `return`)
- Use `function` only when the body needs multiple statements or side effects
- 4-space indentation, single quotes, semicolons, no trailing commas, 100-char line width (Prettier config)

### Components and architecture
- Server Components by default — only add `'use client'` when interactivity or browser APIs are required
- Keep `page.tsx` and `layout.tsx` thin — no business logic in route files
- Use `generateMetadata` for page metadata (not hardcoded `<title>` tags)
- Shared static data lives in `apps/ssm/src/data/site-content.ts` — do not duplicate it in pages
- Use `next/image` (not `<img>`) for all images

### What NOT to apply
- **Multilayer token rule excluded** — the project uses a single-layer color token system by design. Do not add primitive/semantic/component token tiers.
