# @waysnx/ui-layout

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — layout components and responsive utilities.

Comprehensive layout components from WaysNX — page structure, layout utilities, and content organization.

## Installation

```bash
npm install @waysnx/ui-layout
```

Requires `react` (>=18) as a peer dependency.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-layout/dist/index.css";
```

## Overview

`@waysnx/ui-layout` provides the structural building blocks for composing application pages and content. It covers page shells, layout primitives, and content-organization components used across WaysNX applications.

## Representative exports

- Page structure: `PageLayout`, `PageHeader`, `PageContent`, `SidebarLayout`, `SplitLayout`, `PageTabs`
- Layout primitives: `Container`, `Section`, `Grid`, `Row`, `Column`, `Stack`, `Divider`, `Spacer`
- Content organization: `Card`, `Panel`, `Tabs`, `Accordion`, `Collapsible`, `Breadcrumb`, `Stepper`, `Wizard`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { Stack, Card } from "@waysnx/ui-layout";

export function Example() {
  return (
    <Stack>
      <Card>Panel one</Card>
      <Card>Panel two</Card>
    </Stack>
  );
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
