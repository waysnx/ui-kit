# @waysnx/ui-navigation

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — navigation components (menus, breadcrumbs, tabs).

Enterprise-grade navigation framework from WaysNX — menus, sidebars, breadcrumbs, and advanced navigation patterns.

## Installation

```bash
npm install @waysnx/ui-navigation
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-navigation/dist/index.css";
```

## Overview

`@waysnx/ui-navigation` provides application-shell and navigation components, from primary menus and sidebars to command palettes and breadcrumbs. A `NavigationProvider` and a set of hooks support shared navigation state.

## Representative exports

- Menus & bars: `Menu`, `Navbar`, `Header`, `Sidebar`, `MegaMenu`, `TreeMenu`, `ContextMenu`, `UserMenu`
- Navigation patterns: `Breadcrumb`, `Tabs`, `Drawer`, `CommandPalette`, `SearchNavigation`, `StepNavigation`, `WorkspaceSwitcher`, `QuickActions`, `FavoritesMenu`, `RecentItems`, `NotificationCenter`
- Provider & hooks: `NavigationProvider`, `useNavigation`, `useSidebar`, `useMenu`, `useTabs`, `useDrawer`, `useBreadcrumb`, `useWorkspace`, `useCommandPalette`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { NavigationProvider, Breadcrumb } from "@waysnx/ui-navigation";

const items = [
  { id: "home", label: "Home", href: "/" },
  { id: "settings", label: "Settings" },
];

export function Example() {
  return (
    <NavigationProvider>
      <Breadcrumb items={items} />
    </NavigationProvider>
  );
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
