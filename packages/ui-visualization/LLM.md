# @waysnx/ui-visualization — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see `@waysnx/ui-kit` LLM.md (shipped with that package).

---

## ⭐ What this package does

High-performance visualization engine for org charts, trees, and hierarchies. Supports virtualization (10,000+ nodes), zoom/pan, search, drag & drop, and full accessibility.

---

## Package info

- **npm:** `@waysnx/ui-visualization` v1.0.1 (companion package — NOT in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-visualization`
- **Peer deps:** `react >=18`, `react-dom >=18`
- **CSS (required):** `import '@waysnx/ui-visualization/dist/index.css'`

---

## Architecture

High-performance visualization engine with virtualization, zoom/pan, search, drag & drop, and full accessibility. Renders large hierarchies (10,000+ nodes) efficiently.

---

## Exported components

| Component | Purpose |
|-----------|---------|
| `OrgChart` | Organization chart with expand/collapse |
| `Hierarchy` | Generic hierarchy visualization |
| `Tree` | Tree structure display |
| `TreeNode` | Individual tree node |
| `Connector` | Connection lines between nodes |
| `MiniMap` | Overview minimap for large diagrams |
| `Toolbar` | Visualization toolbar (zoom, fit, etc.) |
| `SearchBox` | Search within the visualization |
| `ZoomControls` | Zoom in/out/reset controls |
| `Legend` | Color/shape legend |

## Hooks

Exported via `./hooks` barrel — engine interaction, zoom/pan state, selection, search.

## Utils & engines

- Engine utilities for layout calculation
- Constants for default configurations
- Re-exports `TranslationProvider`/`useTranslation` from `@waysnx/ui-i18n`
