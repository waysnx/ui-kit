# @waysnx/ui-files

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — file management components and utilities.

File and document viewing components from WaysNX — PDF viewer and document preview.

## Installation

```bash
npm install @waysnx/ui-files
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-files/dist/index.css";
```

## Overview

`@waysnx/ui-files` provides components for viewing files and documents in the browser, including a PDF viewer and a general document preview.

## Representative exports

- `PDFViewer` — render and view PDF documents
- `DocumentPreview` — preview documents in the UI

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { PDFViewer } from "@waysnx/ui-files";

export function Example() {
  return <PDFViewer src="/document.pdf" />;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
