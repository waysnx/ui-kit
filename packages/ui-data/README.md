# @waysnx/ui-data

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — JSON, XML, code, and markdown editors/viewers.

Data editing and viewing components from WaysNX — JSON, XML, code, and markdown editors and viewers.

## Installation

```bash
npm install @waysnx/ui-data
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-data/dist/index.css";
```

## Overview

`@waysnx/ui-data` provides components for editing and displaying structured data and code — JSON, XML, source code, and markdown — with matching editor and viewer variants.

## Representative exports

- Editors: `JSONEditor`, `CodeEditor`, `MarkdownEditor`
- Viewers: `XMLViewer`, `CodeViewer`, `MarkdownViewer`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { MarkdownViewer } from "@waysnx/ui-data";

export function Example() {
  return <MarkdownViewer content="# Hello" />;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
