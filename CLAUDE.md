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
