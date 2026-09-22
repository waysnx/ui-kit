# @waysnx/ui-docs — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see `@waysnx/ui-kit` LLM.md (shipped with that package).

---

## ⭐ What this package does

Metadata-driven documentation framework. Feed it structured JSON artifacts (component metadata, prop schemas, demos) and it renders complete documentation — API tables, live demos, and search. No manual markdown authoring needed.

---

## Package info

- **npm:** `@waysnx/ui-docs` v1.0.1 (companion package — NOT in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-docs`
- **Peer deps:** `react >=18`, `react-dom >=18`
- **Deps:** `prismjs`, `react-markdown`, `react-syntax-highlighter`
- **CSS:** None (sideEffects: false)

---

## Architecture

A metadata-driven documentation framework. Feed it JSON artifacts (component metadata, schemas, demos) and it renders complete documentation — API tables, live demos, prop editors, and search.

Supports WaysNX Documentation Artifacts v1:
- `component.json` — component metadata
- `component.schema.json` — prop schemas
- `component.md` — markdown documentation
- `component.demo.generated.json` — demo configurations

---

## Key exports

- **Types:** all documentation types
- **Adapters:** metadata loading/transformation
- **Context/Provider:** documentation context
- **Registry:** component registration system
- **Hooks:** documentation data hooks
- **Components:** documentation rendering components
- **Utils:** documentation utilities
