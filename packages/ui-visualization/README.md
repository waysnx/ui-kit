# @waysnx/ui-visualization

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — charts, graphs, and data visualization components.

Enterprise-grade visualization components for React — OrgChart, Tree, Hierarchy, and more.

## Installation

```bash
npm install @waysnx/ui-visualization
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-visualization/dist/index.css";
```

## Overview

`@waysnx/ui-visualization` renders structured, hierarchical visualizations built on a high-performance engine with virtualization and zoom/pan. It provides diagram components along with supporting controls for navigation and search.

## Representative exports

- Diagrams: `OrgChart`, `Hierarchy`, `Tree`, `TreeNode`, `Connector`
- Controls & overlays: `Toolbar`, `SearchBox`, `ZoomControls`, `MiniMap`, `Legend`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { OrgChart } from "@waysnx/ui-visualization";

const nodes = [
  { id: "1", label: "CEO" },
  { id: "2", label: "CTO", parentId: "1" },
];

export function Example() {
  return <OrgChart nodes={nodes} />;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
