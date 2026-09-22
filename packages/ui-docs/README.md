# @waysnx/ui-docs

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — API documentation components and viewers.

Enterprise-grade documentation framework from WaysNX — renders documentation from structured, JSON-driven metadata.

## Installation

```bash
npm install @waysnx/ui-docs
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

## Overview

`@waysnx/ui-docs` renders documentation entirely from structured metadata. It is component-based and generic — suitable for UI libraries, design systems, APIs, and enterprise applications — and provides rendering components, adapters, a registry, a provider, and supporting hooks.

## Representative exports

- Rendering components: `MarkdownRenderer`, `PropsTable`, `ComponentHero`, `LiveComponentRenderer`, `DocumentationDemoViewer`
- Infrastructure: adapters, registry, context/provider, and hooks

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { MarkdownRenderer } from "@waysnx/ui-docs";

export function Example() {
  return <MarkdownRenderer content="# Hello" />;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
