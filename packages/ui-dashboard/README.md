# @waysnx/ui-dashboard

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — widgets, KPI cards, chart-agnostic layout, and persistence utilities.

Enterprise-grade dashboard framework from WaysNX — widgets, layout system, and dashboard infrastructure without opinion on chart libraries.

## Installation

```bash
npm install @waysnx/ui-dashboard
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-dashboard/dist/index.css";
```

## Overview

`@waysnx/ui-dashboard` provides the structure and infrastructure for building dashboards — widget containers, layout, and dashboard chrome — without prescribing a specific chart library. A `DashboardProvider` and hooks support shared dashboard state.

## Representative exports

- Structure: `Dashboard`, `DashboardHeader`, `DashboardToolbar`, `DashboardSidebar`, `DashboardFooter`
- Widgets & layout: `Widget`, specialized widgets (`ChartWidget`, `MarkdownWidget`, `HtmlWidget`), the layout system, and dashboard filters
- Provider & context: `DashboardProvider`, `DashboardContext`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { DashboardProvider, Dashboard } from "@waysnx/ui-dashboard";

export function Example() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
