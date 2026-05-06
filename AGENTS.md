# Codex Instructions

This is Codex's entrypoint file for the Little Star Media multi-site project.

Before doing any project work, Codex must read:

1. `SHARED_RULES.md` — shared rules for all agents
2. `PROGRESS.md` — current build status and decisions

Follow `SHARED_RULES.md` for project rules, workflow, escalation rules, tech stack, design system rules, website list, and `PROGRESS.md` update requirements.

## Codex-Specific Rules

- Use the repository's existing patterns before introducing new structure
- Keep edits scoped to the user's request
- Do not push to GitHub unless the user explicitly asks
- Use `rg` for searching when available
- Use `apply_patch` for manual file edits
- When changing a completed screen, component, or feature, update the relevant existing entry in `PROGRESS.md`
- Explain work in plain English for a non-technical founder

## Codex Session Start

1. Read this file (`AGENTS.md`)
2. Read `SHARED_RULES.md`
3. Read `PROGRESS.md`
4. Confirm with the user in plain English:
   - What exists
   - What is still to do
   - What you are ready to work on today

Do not start any task until these steps are complete, unless the user explicitly asks a narrow question that can be answered without full project context.
