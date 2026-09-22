# @waysnx/ui-grid-builder

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — dynamic grid layout builder with drag-drop.

Data grid component from WaysNX — sortable, filterable, paginated grid with column types and actions.

## Installation

```bash
npm install @waysnx/ui-grid-builder
```

Requires `react` and `react-dom` (>=18) and `@tanstack/react-table` (^8) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-grid-builder/dist/index.css";
```

## Overview

`@waysnx/ui-grid-builder` provides a configurable data grid with sorting, filtering, pagination, typed columns, and row actions. It can be driven directly through props or built from a grid schema.

## Exports

- `Grid` — the data grid component
- `schemaToGridConfig` — converts a grid schema into grid configuration
- Types: `GridProps`, `GridColumn`, `GridAction`, `GridColumnType`, `GridSchema`, `GridConfig`, and related configuration types

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { Grid } from "@waysnx/ui-grid-builder";

const columns = [
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
];

const data = [
  { name: "Ada", email: "ada@example.com" },
];

export function Example() {
  return <Grid columns={columns} data={data} />;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
